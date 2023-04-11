import { useState, useEffect } from 'react';
import personsService from './services/persons';
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';
import Persons from './Components/Persons';
import Notification from './Components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [notifyMsg, setNotifyMsg] = useState(null);


  useEffect(()=> {
    getPersonsData();
  }, []);

  const getPersonsData = async () => {
    const result = await personsService.getAllPersons();
    setPersons(result.data);
  }
  const submitFormHandler = (event) => {
    event.preventDefault();

    for (const person of persons) {
      if (person.name == newName) {
        
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          const newObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
          }
          updatePersonDataHandler(person.id, newObject);
          getPersonsData();
          setNewName('');
          setNewNumber('');
          return;
        } else {
          alert(`${newName} is already added to phonebook`);
          return;
        }
      }
    }
    
    const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    personsService.createNewPerson(newObject)
    .then(response => {
      setPersons(persons.concat(response.data));
      updateMsgContent(`Added ${newObject.name} `);
      setNewName('');
      setNewNumber('');
    }).catch(error => {
      updateMsgContent(`Fail to Add new person ${newObject.name}`);
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

  const deletePersonDataHandler = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService.deletePerson(id)
      .then(response=> {
          getPersonsData();
      });
    }
  }

  const updatePersonDataHandler = (id, newObject) => {
    personsService.updatePerson(id, newObject)
    .then(response => {
      // setNotifyMsg(`Successfully updated person ${newObject.name} with new phone number ${newObject.number}`);
      // setTimeout(() => {
      //   setNotifyMsg(null);
      //   }, 5000);
      updateMsgContent(`Successfully updated person ${newObject.name} with new phone number ${newObject.number}`);
    }).catch(error => {
      // setNotifyMsg(`Error in updating user ${newObject.name}`);
      // setTimeout(() => {
      //   setNotifyMsg(null);
      //   }, 5000);
      updateMsgContent(`Error in updating user ${newObject.name}`);
    }
    );
  }

  const updateMsgContent = (msgContent) => {
    setNotifyMsg(msgContent);
    setTimeout(() => {
      setNotifyMsg(null);
    }, 5000);
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()));


  return (
    <div>
      <Notification message={notifyMsg} />
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
      <Persons personsData={personsToShow} onDeletePerson={deletePersonDataHandler}></Persons>
    </div>
  );
}

export default App
