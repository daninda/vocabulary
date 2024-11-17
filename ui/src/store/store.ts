import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import addWord from './slices/add-word';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addWord: addWord,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
