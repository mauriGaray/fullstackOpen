import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      content: newName,
      important: Math.random() < 0.5,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => {
        return <div key={person.content}>{person.content}</div>;
      })}
    </div>
  );
};

export default App;
