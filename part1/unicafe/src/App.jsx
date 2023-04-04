import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <p>{props.statTitle} {props.statItem}</p>
    </div>
  )
}

const App = () => {
   // save clicks of each button to its own state
   const [good, setGood] = useState(0)
   const [neutral, setNeutral] = useState(0)
   const [bad, setBad] = useState(0)
   
   const goodCountHandler = () => {
    setGood(good + 1);
   }

   const neutralCountHandler = () => {
    setNeutral(neutral + 1);
   }

   const badCountHandler = () => {
    setBad(bad + 1);
   }

  let all = (good + neutral + bad);
  let average = (all === 0) ? 0 : (good - bad)/ all;
  let postive = (all === 0) ? 0 : (good) / all * 100 + '%';
   return (
     <div>
        <h1>Give feedback</h1>
        <button onClick={goodCountHandler}>good</button>
        <button onClick={neutralCountHandler}>netural</button>
        <button onClick={badCountHandler}>bad</button>

        <h1>statistics</h1>
        <Statistics statTitle={'good'} statItem={good}></Statistics>
        <Statistics statTitle={'netural'} statItem={neutral}></Statistics>
        <Statistics statTitle={'bad'} statItem={bad}></Statistics>
        <Statistics statTitle={'All'} statItem={all}></Statistics>
        <Statistics statTitle={'average'} statItem={average}></Statistics>
        <Statistics statTitle={'positive'} statItem={postive}></Statistics>

     </div>
   )
}

export default App
