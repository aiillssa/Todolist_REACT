import { TextField } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

function dateExists(date) {
  if (date !== undefined) {
    return (
      <div>
        <h3> DUE DATE: </h3>
        <p>{date.toString()}</p>
      </div>
    );
  }
}

function notesExists(note: string) {
  if (note !== undefined) {
    return (
      <div>
        <h3> NOTES for task: </h3>
        <p>{note}</p>
      </div>
    );
  }
}

export function Details() {
  //use effect and call the api route (?)
  const location = useLocation();
  const nav = useNavigate();

  //{state} means ur retrieving the STATE FIELD IN LOCATION
  const { state } = location;

  const [edit, setEdit] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>();
  const [newDueDate, setNewDueDate] = useState<string>();
  const [newNotes, setNewNotes] = useState<string>();

  console.log(state);

  const handleEditClick = () => {
    setEdit(true);
    setNewName(state.name);
    setNewDueDate(state.dueDate);
    setNewNotes(state.notes);
  };

  const handleSaveClick = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/update/" + state.id,
      {
        name: newName,
        dueDate: newDueDate,
        notes: newNotes,
      }
    );

    setEdit(false);
    nav("/");
  };

  const handleNotesChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setNewNotes(newValue || "");
  };

  if (edit === true) {
    return (
      <div className="block">
        <h1>Edit Details</h1>

        <label>
          <h2>Name of Task: </h2>
          <input
            name="query"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <h2>Due Date of Task:</h2>
          <input
            type="date"
            id="name"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <h2> Notes for this Task:</h2>
          <TextField
            multiline
            resizable={false}
            id="notes"
            value={newNotes}
            onChange={handleNotesChange}
          ></TextField>
          <button onClick={handleSaveClick}> Save Task </button>
        </label>
      </div>
    );
  } else {
    console.log("newName state: ", newName);
    return (
      <div className="block">
        <h1>DETAILS</h1>
        <h2>{state.name}</h2>
        {dateExists(state.dueDate)}
        {notesExists(state.notes)}
        <button onClick={handleEditClick}> Edit Task </button>
      </div>
    );
  }
}
