require('dotenv').config();
const mongoose = require('mongoose');
const dbUser = process.env.DATABASE_USER
const dbPassWord = process.env.DATABASE_PASSWORD
const dbName = process.env.DATABASE_NAME
const dbConnection = process.env.DATABASE_CONNECTION

const url = `mongodb://${dbUser}:${dbPassWord}@${dbConnection}/${dbName}`;

mongoose.set('strictQuery',false);
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to mongoDB:', error.message)
    });

const phonebookSchema = new mongoose.Schema({
    name: String,
    password: String,
    number: String,
});

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Phonebook', phonebookSchema);