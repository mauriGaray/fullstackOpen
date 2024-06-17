import React from "react";

const Total = (props) => {
  const exercises1 = props.course[0].exercises;
  const exercises2 = props.course[1].exercises;
  const exercises3 = props.course[2].exercises;
  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  );
};

export default Total;
