import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAllPersons = () => {
    return axios.get(baseUrl);
}

const createNewPerson = (newObject) => {
    return axios.post(baseUrl, newObject);
}

// const updatePerson = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject);
// }
const updatePerson = (id, newObject) => {
    return axios.put(baseUrl, newObject);
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}
export default {
    getAllPersons: getAllPersons,
    createNewPerson: createNewPerson,
    updatePerson: updatePerson,
    deletePerson: deletePerson
}