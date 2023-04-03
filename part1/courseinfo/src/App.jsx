import React from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Total from './Components/Total';

function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const contentCollection = [
    {part:part1, exercise:exercises1},
    {part:part2, exercise:exercises2},
    {part:part3, exercise:exercises3},
];
  return (
    <div>
      <Header course={course}></Header>
      <Content contentCollection={contentCollection}></Content>
      <Total execriseArr={[exercises1, exercises2, exercises3]}></Total>
    </div>
  )
}

export default App
