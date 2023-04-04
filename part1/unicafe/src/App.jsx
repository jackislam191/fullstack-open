import { useState } from 'react'


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
   return (
     <div>
        <h1>Give feedback</h1>
        <button onClick={goodCountHandler}>good</button>
        <button onClick={neutralCountHandler}>netural</button>
        <button onClick={badCountHandler}>bad</button>

        <h1>statistics</h1>
        <p>good {good}</p>
        <p>netural {neutral}</p>
        <p>bad {bad}</p>
     </div>
   )
}

export default App
