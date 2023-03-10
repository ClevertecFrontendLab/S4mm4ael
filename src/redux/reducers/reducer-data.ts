/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

import { initialState } from '../initial-state';

const category = createAction<string | undefined>('CATEGORY');
const sorting = createAction<boolean>('SORTING');
const searchQuery = createAction<string>('SEARCH_QUERY');

export const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(category, (state, action) => {
      state.category = `:${action.payload}`
  });
  builder.addCase(sorting, (state, action) => {
    state.sorting = action.payload
  });
  builder.addCase(searchQuery, (state, action) => {
    state.searchQuery = action.payload
  });

});

