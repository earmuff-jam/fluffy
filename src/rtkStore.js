import { configureStore } from '@reduxjs/toolkit';
import { notesApi } from '@services/notesApi';
import { assetsApi } from '@services/assetsApi';
import { categoriesApi } from '@services/categoriesApi';
import { maintenancePlanApi } from '@services/maintenancePlanApi';
import { storageLocationsApi } from '@services/storageLocationsApi';

const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
    [assetsApi.reducerPath]: assetsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [maintenancePlanApi.reducerPath]: maintenancePlanApi.reducer,
    [storageLocationsApi.reducerPath]: storageLocationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      notesApi.middleware,
      assetsApi.middleware,
      categoriesApi.middleware,
      maintenancePlanApi.middleware,
      storageLocationsApi.middleware,
    ]),
});

export default store;
