import * as API from '../../services/api-contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.fetchContacts();

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('You are not authorized!');
      }

      if (error.response.status === 404) {
        toast.error(`User doesn't have such data!`);
      }

      if (error.response.status === 500) {
        toast.error('Server is currently unavailable!');
      }

      return rejectWithValue(error.message);
    }
  },
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const { data } = await API.addContact(contact);

      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(`Contact can't be added!`);
      }

      if (error.response.status === 401) {
        toast.error(`You are not authorized!`);
      }

      return rejectWithValue(error.message);
    }
  },
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      await API.deleteContact(contactId);

      return contactId;
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('You are not authorized!');
      }

      if (error.response.status === 404) {
        toast.error(`User doesn't have such data!`);
      }

      if (error.response.status === 500) {
        toast.error('Server is currently unavailable!');
      }

      return rejectWithValue(error.message);
    }
  },
);

const patchContact = createAsyncThunk(
  'contacts/patchContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const { data } = await API.patchContact(contactId);

      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(`Contact can't be updated!`);
      }

      if (error.response.status === 401) {
        toast.error(`You are not authorized!`);
      }

      return rejectWithValue(error.message);
    }
  },
);

const operations = { fetchContacts, addContact, deleteContact, patchContact };

export default operations;
