// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { authApi } from './services/authApi';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';

// Configure persist settings. Here, only the auth slice is persisted.
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializableCheck for redux-persist actions
      serializableCheck: false,
    }).concat(authApi.middleware),
});

// Create a persistor linked to your store
export const persistor = persistStore(store);
