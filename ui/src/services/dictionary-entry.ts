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

export interface IFindAllInput {
  dictionaryId: string;
}
export type IFindAllOutput = IDictionaryEntry[];
const findAll = async (data: IFindAllInput) => {
  return await api.get<ILookupOutput>('/api/dictionary-entries', {
    params: {
      dictionaryId: data.dictionaryId,
    },
  });
};

export const DictionaryEntryService = {
  lookup,
  findAll,
};
