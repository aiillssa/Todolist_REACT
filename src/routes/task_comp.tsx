import { Stack, Checkbox } from "@fluentui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Task props
interface TaskProps {
  todoName: string;
  todoID;
  dueDate;
  index: number;
  isChecked: boolean;
  //Method to send checked data back to main component
  sendToParent: (data: boolean, deleteID) => void;
}

//Represents one singular task
export const Task = (props: TaskProps) => {
  const [isChecked, setChecked] = useState(props.isChecked);
  const nav = useNavigate();

  useEffect(() => {
    setChecked(props.isChecked);
  }, [props.isChecked]);

  const onChange = (ev, checked) => {
    setChecked(checked);

    console.log(`Id: ${props.todoID}; checked: ${checked}`);
    props.sendToParent(checked, props.todoID);
  };

  const reroute = async () => {
    const response = await axios.get(
      "https://todolist-react-srv.onrender.com/api/find/" + props.todoID
    );

    const re = response.data;

    console.log(re);

    nav("/details/" + 1, {
      state: {
        id: props.todoID,
        name: re.name,
        dueDate: re.dueDate,
        notes: re.notes,
      },
    });
  };

  const hasDueDate = () => {
    if (props.dueDate === undefined || props.dueDate.length === 0) {
      return false;
    }
    return true;
  };

  return (
    <Stack horizontal>
      <Checkbox checked={isChecked} onChange={onChange} />
      <span className="clickable" onClick={reroute}>
        {props.todoName}
      </span>

      {hasDueDate() && (
        <div className="due-date">&nbsp;Due Date: {props.dueDate}</div>
      )}
    </Stack>
  );
};
