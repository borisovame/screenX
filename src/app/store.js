import { configureStore } from '@reduxjs/toolkit';
import movieSlice from '../features/movieSlice';
import searchSlice from '../features/searchSlice';
import { kinoApi } from '../service/api';

export const store = configureStore({
  reducer: {
    [kinoApi.reducerPath]: kinoApi.reducer,
    movieSlice: movieSlice,
    searchSlice: searchSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(kinoApi.middleware),
});
