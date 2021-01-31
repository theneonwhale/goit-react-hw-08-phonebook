import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { contactsOperations, contactsActions } from '../contacts';

const items = createReducer([], {
  [contactsOperations.fetchContacts.fulfilled]: (_, { payload }) => payload,
  [contactsOperations.addContact.fulfilled]: (state, { payload }) => [
    ...state,
    payload,
  ],
  [contactsOperations.deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [contactsActions.changeFilter]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [contactsOperations.fetchContacts.pending]: () => true,
  [contactsOperations.fetchContacts.fulfilled]: () => false,
  [contactsOperations.fetchContacts.rejected]: () => false,
  [contactsOperations.addContact.pending]: () => true,
  [contactsOperations.addContact.fulfilled]: () => false,
  [contactsOperations.addContact.rejected]: () => false,
  [contactsOperations.deleteContact.pending]: () => true,
  [contactsOperations.deleteContact.fulfilled]: () => false,
  [contactsOperations.deleteContact.rejected]: () => false,
});

const error = createReducer(null, {
  [contactsOperations.fetchContacts.rejected]: (_, { payload }) => payload,
  [contactsOperations.fetchContacts.pending]: () => null,
  [contactsOperations.addContact.rejected]: (_, { payload }) => payload,
  [contactsOperations.addContact.pending]: () => null,
  [contactsOperations.deleteContact.rejected]: (_, { payload }) => payload,
  [contactsOperations.deleteContact.pending]: () => null,
});

export default combineReducers({ items, filter, loading, error });
