const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//init
app.use(bodyParser.json());
const PERSONS_DATA = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
];

app.get('/', (request, response) => {
    response.send('home page try');
});
``
app.get('/api/persons/', (request, response) => {
    response.json(PERSONS_DATA);
})

app.get('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id);
    const person = PERSONS_DATA.find(p => p.id === personId);
    console.log(personId);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id);
    persons = PERSONS_DATA.filter(person => person.id !== personId);
    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const newPersonId = Math.random() * 100;
    const newPerson = request.body;
    const newPersonData = {
        "id": newPersonId,
        "name": newPerson.name,
        "number": newPerson.number
    };
    
    const updatedPersonsData = [...PERSONS_DATA, newPersonData];
    response.json(updatedPersonsData);
})

app.get('/info', (request, response) => {
    const utcStr = new Date().toUTCString();
    const result = `Phonebook has info for ${PERSONS_DATA.length} people\r\n ${utcStr}`;
    response.send(result);
})
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})