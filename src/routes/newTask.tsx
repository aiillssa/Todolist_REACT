import React, { useState } from "react";
import MyCommandBar from "../Header";
import { TextField, ThemeProvider } from "@fluentui/react";
import { myTheme } from "../assets/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NewTask = ({}) => {
  const [name, setName] = useState("");
  const [duedate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const nav = useNavigate();

  const handleFormChange = async (event) => {
    // const taskName = name;
    // const taskDate = data.get("dueDate");
    event.preventDefault();

    const newTask = { name: name, dueDate: duedate };
    if (name === "") {
      alert("Please enter a name!");
      return;
    }

    console.log(newTask);

    const response = await axios.post("http://localhost:3000/api/create", {
      name: name,
      dueDate: duedate,
      notes: notes,
      isChecked: false,
    });
    console.log("form submitted");

    nav("/");
  };

  const handleNotesChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setNotes(newValue || "");
  };

  return (
    <ThemeProvider theme={myTheme}>
      <div className="block">
        <h1> Create a new task!</h1>
        <form onSubmit={handleFormChange}>
          {" "}
          <label>
            {" "}
            Enter the name of the task:
            <input
              name="query"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <p>
              Enter the due date:
              <input
                type="date"
                id="dueDate"
                onChange={(e) => setDueDate(e.target.value)}
              />
            </p>
            <p>Enter any notes!</p>
            <TextField
              multiline
              resizable={false}
              id="notes"
              onChange={handleNotesChange}
            ></TextField>
            <button type="submit"> Submit form!</button>
          </label>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default NewTask;
