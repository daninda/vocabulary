import { AxiosError } from 'axios';
import createAppSlice from '../createAppSlice';
import { IDictionaryEntry } from '../../utils/types';
import {
  IGenerateTestInput,
  IGenerateTestOutput,
  IGenerateWordWithErrorTestInput,
  IGenerateWordWithErrorTestOutput,
  TestService,
} from '../../services/test';

interface InitialState {
  dictionaryEntry: IDictionaryEntry | null;
  wrongWords: string[] | null;
  wordWithError: string | null;
  selectedDictionaryId: string | null;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: InitialState = {
  errorMessage: '',
  wrongWords: null,
  wordWithError: null,
  dictionaryEntry: null,
  selectedDictionaryId: null,
  isLoading: true,
};

export const testSlice = createAppSlice({
  name: 'test',
  initialState,
  reducers: (create) => ({
    reset: create.reducer((state) => {
      state.errorMessage = '';
      state.wrongWords = null;
      state.wordWithError = null;
      state.dictionaryEntry = null;
      state.selectedDictionaryId = null;
      state.isLoading = true;
    }),

    generateWordWithErrorTest: create.asyncThunk<
      { data: IGenerateWordWithErrorTestOutput; id: string },
      IGenerateWordWithErrorTestInput,
      { rejectValue: string }
    >(
      async (data, config) => {
        try {
          const res = await TestService.generateWordWithErrorTest(data);
          return { data: res.data, id: data.dictionaryId };
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          } else {
            return config.rejectWithValue('Something went wrong');
          }
        }
      },
      {
        pending: (state) => {
          state.errorMessage = '';
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.errorMessage = '';
          state.wordWithError = action.payload
            ? action.payload.data.wordWithError
            : null;
          state.dictionaryEntry = action.payload
            ? action.payload.data.dictionaryEntry
            : null;
          state.selectedDictionaryId = action.payload
            ? action.payload.id
            : null;
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.wordWithError = null;
          state.dictionaryEntry = null;
          state.selectedDictionaryId = action.meta.arg.dictionaryId;
          state.isLoading = false;
        },
      },
    ),

    generateTest: create.asyncThunk<
      { data: IGenerateTestOutput; id: string },
      IGenerateTestInput,
      { rejectValue: string }
    >(
      async (data, config) => {
        try {
          const res = await TestService.generateTest(data);
          return { data: res.data, id: data.dictionaryId };
        } catch (error) {
          if (error instanceof AxiosError) {
            return config.rejectWithValue(error.response?.data.message);
          } else {
            return config.rejectWithValue('Something went wrong');
          }
        }
      },
      {
        pending: (state) => {
          state.errorMessage = '';
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.errorMessage = '';
          state.dictionaryEntry = action.payload
            ? action.payload.data.dictionaryEntry
            : null;
          state.wrongWords = action.payload ? action.payload.data.wrongs : null;
          state.selectedDictionaryId = action.payload
            ? action.payload.id
            : null;
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.dictionaryEntry = null;
          state.selectedDictionaryId = action.meta.arg.dictionaryId;
          state.wrongWords = null;
          state.isLoading = false;
        },
      },
    ),
  }),
});

export const { generateTest, generateWordWithErrorTest, reset } = testSlice.actions;

export default testSlice.reducer;
