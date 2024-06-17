import React from "react";
import Part from "./Part";

const Content = (props) => {
  const part1 = props.course[0];
  const part2 = props.course[1];
  const part3 = props.course[2];
  return (
    <>
      <Part part={part1.name} exercises={part1.exercises1} />
      <Part part={part2.name} exercises={part2.exercises2} />
      <Part part={part3.name} exercises={part3.exercises3} />
    </>
  );
};

export default Content;
