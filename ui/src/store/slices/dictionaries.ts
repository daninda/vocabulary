import { AxiosError } from 'axios';
import createAppSlice from '../createAppSlice';
import { IDictionary } from '../../utils/types';
import {
  DictionaryService,
  ICreateDictionaryInput,
  ICreateDictionaryOutput,
  IFindAllDictionaryOutput,
} from '../../services/dictionary';

interface InitialState {
  dictionaries: IDictionary[] | null;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: InitialState = {
  errorMessage: '',
  dictionaries: null,
  isLoading: true,
};

export const dictionariesSlice = createAppSlice({
  name: 'dictionaries',
  initialState,
  reducers: (create) => ({
    findAll: create.asyncThunk<
      IFindAllDictionaryOutput,
      void,
      { rejectValue: string }
    >(
      async (_, config) => {
        try {
          const res = await DictionaryService.findAll();
          return res.data;
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
          state.dictionaries = action.payload ? action.payload : [];
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.dictionaries = null;
          state.isLoading = false;
        },
      },
    ),
    create: create.asyncThunk<
      ICreateDictionaryOutput,
      ICreateDictionaryInput,
      { rejectValue: string }
    >(
      async (data, config) => {
        try {
          const res = await DictionaryService.create(data);
          return res.data;
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
          state.dictionaries?.push(action.payload);
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.isLoading = false;
        },
      },
    ),
  }),
});

export const { findAll, create } = dictionariesSlice.actions;

export default dictionariesSlice.reducer;
