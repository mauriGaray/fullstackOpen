import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === nameObject.name)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div>
      <h1>Phonebook</h1>
      <label htmlFor="filter">
        Filter shown with:{" "}
        <input type="text" id="filter" value={filter} onChange={handleFilter} />
      </label>

      <h2> add a new</h2>
      <form onSubmit={addName}>
        <label htmlFor="newName">
          name:{" "}
          <input value={newName} onChange={handleNameChange} id="newName" />
        </label>
        <label htmlFor="newNumber">
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberChange}
            id="newNumber"
          />
        </label>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default App;
