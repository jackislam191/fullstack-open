import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState(new Array(anecdotes.length).fill(0));


  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  const nextAnecdoteHandler = () => {
    setSelected(getRandomInt(0, anecdotes.length - 1)); 
  }

  const voteHandler = () => {
    const copyPoint = [...point];
    copyPoint[selected] += 1;
    setPoint(copyPoint);
  }

  // const nextAnecdoteHandler = () => {
  //   if (selected < anecdotes.length - 1 ) {
  //     setSelected(selected + 1);
  //   } else {
  //     setSelected(0);
  //   }
    
  // }
  const max = Math.max(...point);
  const maxIndex = point.indexOf(max);
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {point[selected]} votes</p>
      <button onClick={voteHandler}>Vote</button>
      <button onClick={nextAnecdoteHandler}>next anecdote</button>
      
      {max !== 0 && 
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[maxIndex]}</p>
        <p>has {max} votes</p>
      </div>}
    </>
  );
}

export default App
