import { configureStore } from '@reduxjs/toolkit';
import { notesApi } from '@services/notesApi';
import { categoriesApi } from '@services/categoriesApi';

const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([notesApi.middleware, categoriesApi.middleware]),
});

export default store;
