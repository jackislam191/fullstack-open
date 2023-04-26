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

  const cleanForm = () => {
    setNewName('')
    setNewNumber('') 
  }

  const updatePerson = (person) => {
    const ok = window.confirm(`${newName} is already added to phonebook, replace the number?`)
    if (ok) {
      personService.update(person.id, {...person, number: newNumber}).then((updatedPerson) => {
        setPersons(persons.map(p => p.id !== person.id ? p :updatedPerson ))
        notifyWith(`phon number of ${person.name} updated!`)
      })
      .catch(() => {
        notifyWith(`${person.name} has already been removed`, 'error')
        setPersons(persons.filter(p => p.id !== person.id))
      });

      cleanForm();
    }
  }
  const submitFormHandler = (event) => {
    event.preventDefault();

    const person = persons.find(p => p.name === newName);

    if (person) {
      updatePerson(person);
      return;
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
      cleanForm();
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
    const ok = window.confirm(`Delete ${name} ?`);
    if (ok) {
      personsService.deletePerson(id)
      .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          updateMsgContent(`number of ${name} deleted!`)
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
