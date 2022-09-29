import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth';
import { booksApi } from './books/booksApi';
import { trainingApi } from './books/trainingApi';
// import filterSlice from '../redux/contacts/filterSlice';
import persistStore from 'redux-persist/es/persistStore';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'isLoggedIn'],
  };

  export const store = configureStore({
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
      [booksApi.reducerPath]: booksApi.reducer,
      [trainingApi.reducerPath]: trainingApi.reducer,

    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(booksApi.middleware).concat(trainingApi.middleware),
  });
  
  export const persistor = persistStore(store);