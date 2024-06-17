import React from "react";

const Buttons = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.name}</button>
    </>
  );
};

export default Buttons;
