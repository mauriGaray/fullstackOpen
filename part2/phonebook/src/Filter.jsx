import React from "react";

const Filter = (props) => {
  const { value, onChange } = props;
  return (
    <label htmlFor="filter">
      Filter shown with:{" "}
      <input type="text" id="filter" value={value} onChange={onChange} />
    </label>
  );
};

export default Filter;
