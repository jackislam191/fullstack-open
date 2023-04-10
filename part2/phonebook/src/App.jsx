import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';
import Persons from './Components/Persons';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(()=> {
    // console.log('effect');
    axios.get('http://localhost:3001/persons')
    .then(response => {
      // console.log('promise fulfilled');
      setPersons(response.data);
    })
  }, []);
  // console.log('render', persons.length, 'persons');

  const submitFormHandler = (event) => {
    event.preventDefault();

    for (const person of persons) {
      if (person.name == newName) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }
    const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    axios.post('http://localhost:3001/persons', newObject)
    .then(response => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    })
  }

  const nameInputHandler = (event) => {
    setNewName(event.target.value);
  }

  const numberInputHandler = (event) => {
    setNewNumber(event.target.value);
  }

  const filterInputHandler = (event) => {
    setNameFilter(event.target.value);
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()));


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterInputHandler}></Filter>
      {nameFilter}
      
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={submitFormHandler}
        onNameChange={nameInputHandler}
        onNumberChange={numberInputHandler}
        nameVal={newName}
        numVal={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsData={personsToShow}></Persons>
    </div>
  );
}

export default App
