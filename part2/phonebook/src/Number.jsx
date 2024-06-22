import React from "react";
import personsServices from "./services/personsServices";

const Number = (props) => {
  const { personsToShow, deletePerson } = props;

  return (
    <div>
      {personsToShow.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Number;
