import React from "react";

const Number = (props) => {
  const { personsToShow, deletePerson } = props;

  return (
    <div className="phonebook-list">
      {personsToShow.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            <button className="deleteBtn" onClick={() => deletePerson(person)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Number;
