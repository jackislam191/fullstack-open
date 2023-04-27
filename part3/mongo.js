require('dotenv').config();
const mongoose = require('mongoose');
const dbUser = process.env.DATABASE_USER
const dbPassWord = process.env.DATABASE_PASSWORD
const dbName = process.env.DATABASE_NAME
const dbConnection = process.env.DATABASE_CONNECTION


const url = `mongodb://${dbUser}:${dbPassWord}@${dbConnection}/${dbName}`;

mongoose.set('strictQuery',false);
mongoose.connect(url);

if (process.argv.length<5) {
    console.log('give password as argurment');
    process.exit(1);
}

const inputPassword = process.argv[2];
const inputName = process.argv[3];
const inputNumber = process.argv[4];

const phonebookSchema = new mongoose.Schema({
    name: String,
    password: String,
    number: String,
  });

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

const phonebook = new Phonebook({
    name: inputName,
    number: inputNumber,
    password: inputPassword,
});

// Phonebook.find({}).then(result => {
//     console.log('phonebook:');
//     result.forEach(phonebook => {
//         console.log(`${phonebook.name} ${phonebook.number}`);
//     })
// })
phonebook.save().then(result => {
    console.log(`added ${inputName} number ${inputNumber} to phonebook`);
    mongoose.connection.close();
})