import { AxiosError } from 'axios';
import createAppSlice from '../createAppSlice';
import { IDictionaryEntry } from '../../utils/types';
import {
  DictionaryEntryService,
  ILookupInput,
  ILookupOutput,
} from '../../services/dictionary-entry';

interface InitialState {
  results: IDictionaryEntry[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: InitialState = {
  errorMessage: '',
  results: [],
  isLoading: true,
};

export const addWordSlice = createAppSlice({
  name: 'add-word',
  initialState,
  reducers: (create) => ({
    lookup: create.asyncThunk<
      ILookupOutput | undefined,
      ILookupInput,
      { rejectValue: { error: string } }
    >(
      async (data, config): Promise<ILookupOutput | undefined> => {
        try {
          const res = await DictionaryEntryService.lookup(data);
          return res.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw config.rejectWithValue(error.response?.data.message);
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
          state.results = [];
          state.isLoading = false;
        },
      },
    ),
  }),
});

export const { lookup } = addWordSlice.actions;

export default addWordSlice.reducer;
