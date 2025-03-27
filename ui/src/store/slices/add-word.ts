import { AxiosError } from 'axios';
import createAppSlice from '../createAppSlice';
import { IDictionaryEntry, IPartOfSpeech } from '../../utils/types';
import {
  DictionaryEntryService,
  IAddWordInput,
  IAddWordOutput,
  ICheckexistenceInput,
  ICheckexistenceOutput,
  ILookupInput,
  ILookupOutput,
} from '../../services/dictionary-entry';
import toast from 'react-hot-toast'

interface InitialState {
  results: IDictionaryEntry[] | null;
  isLoading: boolean;
  errorMessage: string;
  selectedDictionaryId: string | null;
  existenceWords:
    | {
        checkWord: {
          word: string;
          pos: string;
        };
        exist: boolean;
      }[]
    | null;
}

const initialState: InitialState = {
  errorMessage: '',
  results: null,
  isLoading: true,
  selectedDictionaryId: null,
  existenceWords: null,
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
          state.results = action.payload ? action.payload : null;
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.results = null;
          state.isLoading = false;
        },
      },
    ),

    selectDictionaryId: create.asyncThunk<
      { data: ICheckexistenceOutput; id: string },
      string,
      { rejectValue: string }
    >(
      async (data, config) => {
        try {
          const state = config.getState() as { addWord: InitialState };
          const input: ICheckexistenceInput = {
            dictionaryId: data,
            checkWords:
              state.addWord.results?.map((item) => {
                return {
                  word: item.word,
                  pos: item.pos as IPartOfSpeech,
                };
              }) || [],
          };
          const res = await DictionaryEntryService.checkExistence(input);
          return { data: res.data, id: data };
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
          state.existenceWords = action.payload
            ? action.payload.data.existenceWords
            : null;
          state.selectedDictionaryId = action.payload
            ? action.payload.id
            : null;
          state.isLoading = false;
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.existenceWords = null;
          state.isLoading = false;
        },
      },
    ),

    addWord: create.asyncThunk<
      IAddWordOutput,
      IAddWordInput,
      { rejectValue: string }
    >(
      async (data, config) => {
        try {
          const res = await DictionaryEntryService.addWord(data);
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
          state.existenceWords =
            state.existenceWords?.map((existenceWord) => {
              if (
                existenceWord.checkWord.word === action.payload.word &&
                existenceWord.checkWord.pos === action.payload.pos
              ) {
                return { checkWord: existenceWord.checkWord, exist: true };
              }
              return existenceWord;
            }) || null;
          state.errorMessage = '';
          state.isLoading = false;
          toast.success(
            'Слово ' + action.payload.word + ' (' + action.payload.translated.word + ') добавлено в словарь',
          );
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message || 'Something went wrong';
          state.isLoading = false;
        },
      },
    ),
  }),
});

export const { lookup, selectDictionaryId, addWord } = addWordSlice.actions;

export default addWordSlice.reducer;
