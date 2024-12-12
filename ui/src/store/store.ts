import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import addWord from './slices/add-word';
import dictionaries from './slices/dictionaries';
import testSlice from './slices/test';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addWord: addWord,
    dictionaries: dictionaries,
    test: testSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
