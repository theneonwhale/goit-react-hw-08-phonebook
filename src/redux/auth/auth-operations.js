import * as API from '../../services/api-auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import axios from 'axios';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.register(credentials);
      API.token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.logIn(credentials);
      API.token.set(data.token);
      return data;
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        toast.error('There is no user with this email and password!');
      }
      return rejectWithValue(error.message);
    }
  },
);

const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      token.unset();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue();
    }

    API.token.set(persistedToken);
    try {
      const { data } = await API.fetchCurrentUser();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};

export default operations;
