import { useState } from 'react'
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';
import Persons from './Components/Persons';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

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
    setPersons(persons.concat(newObject));
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
      />
      <h2>Numbers</h2>
      <Persons personsData={personsToShow}></Persons>
    </div>
  );
}

export default App
