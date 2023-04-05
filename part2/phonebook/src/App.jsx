import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const submitFormHandler = (event) => {
    event.preventDefault();

    for (const person of persons) {
      if (person.name == newName) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }
    const newObject = {
      name: newName
    }
    setPersons(persons.concat(newObject));
  }

  const nameInputHandler = (event) => {
    setNewName(event.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitFormHandler}>
        <div>
          name: <input onChange={nameInputHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
}

export default App
