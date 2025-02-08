import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import jobsReducer from './features/jobs/jobsSlice';
import companiesReducer from './features/company/companiesSlice';
import { authApi } from './services/authApi';
import { jobsApi } from './features/jobs/jobsApi';
import { companiesApi } from './features/company/companiesApi';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'jobs', 'companies'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  companies: companiesReducer,
  [authApi.reducerPath]: authApi.reducer,
  [jobsApi.reducerPath]: jobsApi.reducer,
  [companiesApi.reducerPath]: companiesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, jobsApi.middleware, companiesApi.middleware),
});

export const persistor = persistStore(store);