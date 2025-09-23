import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: '',
  genreId: '',
  order: 'NUM_VOTE',
  type: '',
  year: '',
  page: 1,
  keyword: '',
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
