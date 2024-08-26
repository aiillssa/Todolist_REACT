import "../index.css";
import { IStackStyles, IStackTokens, Stack } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { myTheme } from "../assets/theme";
import { task } from "../assets/task";
import axios from "axios";
import { Task } from "./task_comp";

//Styling things for stack
const containerStack: IStackTokens = { childrenGap: 10, padding: 7 };
const stackStyles: IStackStyles = {
  root: {
    background: myTheme.palette.themeTertiary,
  },
};

//Props for Main component
interface MainProps {
  isChecked: boolean;
  deleteID;
}

//Main: functional component
//State: todo (an array of tasks)
const Main: React.FC<MainProps> = ({}) => {
  const [todo, setTodo] = useState<task[]>([]);

  //Updates Main's todo list to keep track of which items are checked
  const getTaskChecked = (checked: boolean, deleteID) => {
    let newVal: task[] = [];
    todo.forEach((item) => {
      newVal.push({
        ...item,
        isChecked: item._id == deleteID ? checked : item.isChecked,
      });
    });
    setTodo(newVal);
    console.log("Is it checked? " + checked);
    console.log("DeleteID is: " + deleteID);
  };

  //Retrieves all tasks from API and sets the todo state
  const getTasks = async () => {
    const response = await axios.get("http://localhost:3000/api/loadAll");
    response.data.forEach((element) => {
      element.isChecked = false;
    });
    setTodo(response.data);
    console.log(response.data);
  };

  //Calls getTasks() upon starting application
  useEffect(() => {
    getTasks();
  }, []);

  //Checks todo array and deletes all items that are marked as checked
  //Calls API
  //!HAVE TO EDIT: for deleting multiple items
  //* Should also add a completed tasks feature
  const deleteTask = async () => {
    const deletedTasks = todo.filter((item) => item.isChecked);

    //modify this for multiple deletions with for loop, not for each
    //await doesnt work with for each
    const response = await axios.delete(
      "http://localhost:3000/api/delete/" + deletedTasks[0]._id //deleteID
    );
    //Note: after deletion u have to update the isChecked WITHIN the array to trigger re-rendering
    let newVal: task[] = [];

    //We reset todo after deletion with a list of tasks that were not deleted and reset all their checked values
    todo.forEach((item) => {
      if (item._id != deletedTasks[0]._id)
        newVal.push({
          ...item,
          isChecked: false,
        });
    });
    // Basically after deleting, we set the state to be everything that wasn't deleted
    setTodo(newVal);
  };

  //Checks to see if any item is selected
  const _hasItemSelected = () => {
    const result = todo.filter((item) => item.isChecked);
    return result.length > 0;
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
            dueDate={task.dueDate}
            isChecked={task.isChecked}
            sendToParent={getTaskChecked}
          />
        ))}
        {/* aka if/else */}
        {_hasItemSelected() && (
          <button onClick={deleteTask}> Delete Task?</button>
        )}
      </Stack>
    </div>
  );
};
export default Main;
