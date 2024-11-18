import { AxiosError } from 'axios';
import createAppSlice from '../createAppSlice';
import { IDictionaryEntry } from '../../utils/types';
import {
  DictionaryEntryService,
  ILookupInput,
  ILookupOutput,
} from '../../services/dictionary-entry';

interface InitialState {
  results: IDictionaryEntry[] | null;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: InitialState = {
  errorMessage: '',
  results: null,
  isLoading: true,
};

export const addWordSlice = createAppSlice({
  name: 'add-word',
  initialState,
  reducers: (create) => ({
    lookup: create.asyncThunk<
      ILookupOutput,
      ILookupInput,
      { rejectValue: string }
    >(
      async (data, config) => {
        try {
          const res = await DictionaryEntryService.lookup(data);
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
          state.results = action.payload ? action.payload : [];
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.results = null;
          state.isLoading = false;
        },
      },
    ),
  }),
});

export const { lookup } = addWordSlice.actions;

export default addWordSlice.reducer;
