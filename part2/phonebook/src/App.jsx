import { useState, useEffect } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Number from "./Number";
import personsService from "./services/personsServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  useEffect(() => {
    personsService.getAll().then((res) => setPersons(res));
  }, [persons]);

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

  const deletePerson = (person) => {
    const confirmDeletion = window.confirm(
      `Would you like to proceed with the deletion of ${person.name}?`
    );

    if (confirmDeletion) {
      personsService
        .deletePerson(person.id)
        .then(() => {
          alert(
            `${person.name} has been successfully deleted from the phone book`,
            "successful"
          );
          setPersons(
            persons.filter((entry) => {
              return entry.id !== person.id;
            })
          );
        })
        .catch((err) => {
          alert(
            `${person.name} has already been removed from the server`,
            "unsuccessful"
          );

          setPersons(
            persons.filter((entry) => {
              return entry.id !== person.id;
            })
          );
        });
    }
  };
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
      <Number personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
