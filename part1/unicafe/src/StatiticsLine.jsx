import React from "react";

const StatiticsLine = (props) => {
  const { text, value } = props;
  return (
    <>
      <p>
        {text} {value}
      </p>
    </>
  );
};

export default StatiticsLine;
