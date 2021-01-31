import * as API from '../../services/api-contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.fetchContacts();

      return data;
    } catch (error) {
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  },
);

const operations = { fetchContacts, addContact, deleteContact, patchContact };

export default operations;
