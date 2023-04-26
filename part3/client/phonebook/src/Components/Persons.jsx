import React from 'react';

const Persons = ({personsData, onDeletePerson}) => {
    return (
        <div>
            {personsData.map((person) => (
            <p key={person.id}>{person.name} {person.number} <button onClick={()=>onDeletePerson(person.name, person.id)}>Delete</button></p>
        ))}
        </div>
        
    );
}

export default Persons;
