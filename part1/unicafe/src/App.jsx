import { useState } from "react";
import Statistics from "./Components/Statistics";
import Button from "./Components/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodCountHandler = () => {
    setGood(good + 1);
  };

  const neutralCountHandler = () => {
    setNeutral(neutral + 1);
  };

  const badCountHandler = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
        <Button feedBackHandler={goodCountHandler} text={'good'}></Button>
        <Button feedBackHandler={neutralCountHandler} text={'neutral'}></Button>
        <Button feedBackHandler={badCountHandler} text={'bad'}></Button>
      <h1>statistics</h1>
      {(good + neutral + bad) === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
        </div> 
      )}
    </div>
  );
};

export default App;
