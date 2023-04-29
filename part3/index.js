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

app.get('/api/persons/', (request, response, next) => {
    Phonebook.find({}).then(phonebook => {
        response.json(phonebook);
    }).catch(error => {
        next(error);
    });
})

app.get('/api/persons/:id', (request, response, next) => {
    Phonebook.findById(request.params.id).then(phonebook=>{
        if (phonebook) {
            response.json(phonebook);
        } else {
            response.status(404).end();
        }
    }).catch(error => {
        response.status(500).end();
        next(error);
      })
})

app.delete('/api/persons/:id', (request, response, next) => {
    const personId = request.params.id;
    Phonebook.findByIdAndRemove(personId).then(() => {
        response.status(204).end();
    }).catch(error => next(error));
})

app.post('/api/persons/', (request, response, next) => {
    const newPerson = request.body;
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

    // const isExistPhonebook = Phonebook.find({name: newPerson.name}).then(doc => {
    //     console.log(doc);
    // });
    // console.log(isExistPhonebook);
    // Phonebook.find({"name": newPerson.name}).then(phonebook => {
    //     if (phonebook) {
    //         return response.status(400).json({
    //             error: 'person existed'
    //         });
    //     }
    // });
    const newPhoneBookData = new Phonebook({
        "name": newPerson.name,
        "number": newPerson.number,
        "password": 'qwerasdf'
    });
    newPhoneBookData.save().then(phonebook => {
        response.status(200).json(newPhoneBookData.save());
    })
    .catch(err => {
        next(err);
        response.status(400).json({"message": "unable to save the data"});
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const personId = request.params.id;
    const newPersonData = {
        "name": request.body.name,
        "number": request.body.number,
    }
    Phonebook.findByIdAndUpdate(personId, newPersonData, {new: true}).then(result => {
        response.json(result);
    }).catch(error => next(error));
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