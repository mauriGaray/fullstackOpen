import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Buttons";
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} name="good" />
      <Button onClick={handleNeutral} name="neutral" />
      <Button onClick={handleBad} name="bad" />
      {total === 0 ? (
        <p> No feedback given </p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      )}
    </>
  );
}

export default App;
