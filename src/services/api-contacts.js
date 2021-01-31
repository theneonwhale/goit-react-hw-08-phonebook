import axios from 'axios';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

export const fetchContacts = () => axios.get('/contacts');

export const addContact = contact => axios.post('/contacts', contact);

export const deleteContact = contactId =>
  axios.delete(`/contacts/${contactId}`);

export const patchContact = contactId => axios.patch(`/contacts/${contactId}`);
