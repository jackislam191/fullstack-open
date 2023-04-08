import React from 'react';

const Persons = ({personsData}) => {
    return (
        personsData.map((person) => (
            <p key={person.id}>{person.name} {person.number}</p>
        ))
    );
}

export default Persons;
