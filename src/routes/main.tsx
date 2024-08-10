import "../App.css";
import { Checkbox, IStackStyles, IStackTokens, Stack } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { myTheme } from "../assets/theme";
import { task, taskUI } from "../assets/task";
import { Router, useNavigate } from "react-router-dom";
import axios from "axios";

const containerStack: IStackTokens = { childrenGap: 10, padding: 7 };
const stackStyles: IStackStyles = {
  root: {
    background: myTheme.palette.themeTertiary,
  },
};

interface TaskProps {
  todoName: string;
  todoID;
  index: number;
  isChecked: boolean;
  sendToParent: (data: boolean, deleteID) => void;
}

//Represents one singular task
const Task = (props: TaskProps) => {
  const [isChecked, setChecked] = useState(props.isChecked);
  const nav = useNavigate();

  const onChange = (ev, checked) => {
    setChecked(checked);
    props.sendToParent(checked, props.todoID);

    console.log("checked: " + checked);
  };

  const reroute = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/find/" + props.todoID
    );

    const re = response.data;

    console.log(re);

    nav("/details/" + 1, {
      state: { name: re.name, dueDate: re.dueDate, notes: re.notes },
    });
  };

  return (
    <Stack horizontal>
      <Checkbox checked={isChecked} onChange={onChange} />
      <span className="clickable" onClick={reroute}>
        {props.todoName}
      </span>
    </Stack>
  );
};

interface MainProps {
  isChecked: boolean;
  deleteID;
}

const Main: React.FC<MainProps> = ({}) => {
  const [todo, setTodo] = useState([]);
  const [del, setDelete] = useState<boolean>();
  const [deleteID, setDeleteID] = useState();

  const getTaskChecked = (checked: boolean, deleteID) => {
    setDelete(checked);
    setDeleteID(deleteID);
    console.log("Is it checked? " + checked);
    console.log("DeleteID is: " + deleteID);
  };

  const getTasks = async () => {
    const response = await axios.get("http://localhost:3000/api/loadAll");
    setTodo(response.data);
  };

  useEffect(() => {
    //console.log("running get tasks");
    getTasks();
  }, []);

  const deleteTask = async () => {
    const response = await axios.delete(
      "http://localhost:3000/api/delete/" + deleteID
    );
    await getTasks();
    setDelete(false);
  };

  return (
    <div className="block">
      <h1>Home Page</h1>
      <h2> Tasks</h2>
      <Stack
        enableScopedSelectors
        tokens={containerStack}
        styles={stackStyles}
        id="todos"
      >
        {todo.map((task: task, index) => (
          <Task
            todoName={task.name}
            todoID={task._id}
            index={index}
            isChecked={false}
            sendToParent={getTaskChecked}
          />
        ))}
        {/* This is how to do if/else */}
        {del && <button onClick={deleteTask}> Delete Task?</button>}
      </Stack>
    </div>
  );
};
export default Main;
