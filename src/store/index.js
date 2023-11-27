import {configureStore} from '@reduxjs/toolkit';
import coinsReducers from './reducers/coins';

export const store = configureStore({
  reducer: {
    coins: coinsReducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
