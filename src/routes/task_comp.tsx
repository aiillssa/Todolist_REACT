import { Stack, Checkbox } from "@fluentui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Task props
interface TaskProps {
  todoName: string;
  todoID;
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
      <div>{`state: ${isChecked}; props: ${props.isChecked}`}</div>
    </Stack>
  );
};
