import api from './api';
import { IDictionaryEntry } from '../utils/types';

export interface ILookupInput {
  word: string;
}
export type ILookupOutput = IDictionaryEntry[];
const lookup = async (data: ILookupInput) => {
  return await api.post<ILookupOutput>('/api/dictionary-entries/lookup', {
    word: data.word,
  });
};

export const DictionaryEntryService = {
  lookup,
};
