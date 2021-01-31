import { createAction } from '@reduxjs/toolkit';

export const changeFilter = createAction('contacts/filter', value => ({
  payload: value,
}));
