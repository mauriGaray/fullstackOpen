import React from "react";
import StatiticsLine from "./StatiticsLine";

const Statistics = (props) => {
  const { bad, good, neutral, total } = props;
  const totalValue = `${good / (total != 0 ? total : 1)} %`;
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>statistics</th>
          </tr>
          <tr>
            <td>
              <StatiticsLine text="good" value={good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatiticsLine text="bad" value={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatiticsLine text="all" value={total} />
            </td>
          </tr>
          <tr>
            <td>
              <StatiticsLine
                text="average"
                value={(good - bad) / (total != 0 ? total : 1)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <StatiticsLine text="positive" value={totalValue} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
