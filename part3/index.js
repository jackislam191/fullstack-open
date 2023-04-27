const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Phonebook = require('./models/phonebook');

const app = express();

//init
app.use(bodyParser.json());

//morgan middleware
const morganTinyLogger = morgan(function (tokens, req, res) {
    const morganRes = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ].join(' ');
    return morganRes + ' ' + JSON.stringify(req.body);
  })

app.use(morganTinyLogger);

app.use(cors());


// app.get('/', (request, response) => {
//     response.send('home page try');
// });

app.get('/api/persons/', (request, response) => {
    Phonebook.find({}).then(phonebook => {
        response.json(phonebook);
    });
})

app.get('/api/persons/:id', (request, response) => {
    Phonebook.findById(request.params.id).then(phonebook=>{
        if (phonebook) {
            response.json(phonebook);
        } else {
            response.status(404).end();
        }
    }).catch(error => {
        console.log(error)
        response.status(500).end()
      })
})

app.delete('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id);
    persons = PERSONS_DATA.filter(person => person.id !== personId);
    response.status(204).end();
})

app.post('/api/persons/', (request, response) => {
    const newPerson = request.body;
    const isPersonNameExist = PERSONS_DATA.find(p => p.name === newPerson.name);
    if (isPersonNameExist) {
        return response.status(400).json({
            error: 'person existed'
        });
    }

    if (newPerson.name === undefined) {
        return response.status(400).json({
            error: 'name data is missing'
        });
    }
    
    if (newPerson.number === undefined) {
        return response.status(400).json({
            error: 'number data is missing'
        });
    }
    const newPersonData = {
        "id": newPerson.id,
        "name": newPerson.name,
        "number": newPerson.number
    };
    
    const updatedPersonsData = [...PERSONS_DATA, newPersonData];
    response.json(updatedPersonsData);
})

app.put('/api/persons/:id', (request, response) => {
    const personId = Number(request.params.id);
    const newPersonData = {
        "id": personId,
        "name": request.body.name,
        "number": request.body.number,
        }
    // const updatedPersonsData = [...PERSONS_DATA, newPersonData];
    response.json(newPersonData);
    }
)
app.get('/info', (request, response) => {
    const utcStr = new Date().toUTCString();
    const result = `Phonebook has info for ${PERSONS_DATA.length} people\r\n ${utcStr}`;
    response.send(result);
})
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})