import React from "react";
import personsServices from "./services/personsServices";

const Number = (props) => {
  const { personsToShow } = props;
  const deletePerson = (id) => {
    const req = personsServices.deletePerson(id);
    req.then((res) => res.data);
  };
  return (
    <div>
      {personsToShow.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson("00ee")}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Number;
