import React from "react";

const Number = (props) => {
  const { personsToShow } = props;
  return (
    <div>
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

export default Number;
