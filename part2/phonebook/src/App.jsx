import { useState } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Number from "./Number";
import personsService from "./services/personsServices";
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
    //if (persons.find((person) => person.name === nameObject.name)) {
    // return alert(`${newName} is already added to phonebook`);
    //}
    personsService.create(nameObject).then((res) => {
      console.log(res);
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    });
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

      <Filter value={filter} onChange={handleFilter} />
      <h2> add a new</h2>
      <Form
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Number personsToShow={personsToShow} />
    </div>
  );
};

export default App;
