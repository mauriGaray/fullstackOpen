import React from "react";

const Form = (props) => {
  const { addName, handleNameChange, handleNumberChange, newName, newNumber } =
    props;
  return (
    <form onSubmit={addName}>
      <label htmlFor="newName">
        name: <input value={newName} onChange={handleNameChange} id="newName" />
      </label>
      <label htmlFor="newNumber">
        number:{" "}
        <input value={newNumber} onChange={handleNumberChange} id="newNumber" />
      </label>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
