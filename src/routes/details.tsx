import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

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
  //use effect and call the api route :O
  const location = useLocation();

  //{state} means ur retrieving the STATE FIELD IN LOCATION U DINGUS
  const { state } = location;

  const [edit, setEdit] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>();
  const [newDueDate, setNewDueDate] = useState<string>();
  const [newNotes, setNewNotes] = useState<string>();

  console.log(state);

  const handleClick = () => {
    setEdit(true);
    return <div> hello</div>;
  };

  const editForm = () => {};

  if (edit === true) {
    return (
      <div className="block">
        <h1>Edit Details</h1>

        <label>
          <h2>Name of Task: </h2>
          <input
            name="query"
            id="name"
            value={state.name}
            onChange={(e) => setNewName(e.target.value)}
          />
          <h2>Due Date of Task:</h2>
          <input
            type="date"
            id="name"
            value={state.dueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />

          {dateExists(state.dueDate)}
          {notesExists(state.notes)}
          <button onClick={handleClick}> Edit Task </button>
        </label>
      </div>
    );
  } else {
    return (
      <div className="block">
        <h1>DETAILS</h1>
        <h2>{state.name}</h2>
        {dateExists(state.dueDate)}
        {notesExists(state.notes)}
        <button onClick={handleClick}> Edit Task </button>
      </div>
    );
  }
}
