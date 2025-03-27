import { IDictionaryEntry } from '../utils/types';
import api from './api';

export interface ILookupInput {
  word: string;
}
export type ILookupOutput = IDictionaryEntry[];
const lookup = async (data: ILookupInput, accessToken?: string) => {
  return await api.post<ILookupOutput>(
    '/api/dictionary-entries/lookup',
    {
      word: data.word,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
};

export interface ICheckexistenceInput {
  dictionaryId: string;
  checkWords: {
    word: string;
    pos: string;
  }[];
}
export interface ICheckexistenceOutput {
  existenceWords: {
    checkWord: {
      word: string;
      pos: string;
    };
    exist: boolean;
  }[];
}
const checkExistence = async (
  data: ICheckexistenceInput,
  accessToken?: string,
) => {
  return await api.post<ICheckexistenceOutput>(
    '/api/dictionary-entries/check-existence',
    {
      dictionaryId: data.dictionaryId,
      checkWords: data.checkWords,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
};

export interface IAddWordInput {
  dictionaryId: string;
  word: string;
  partOfSpeech: string;
}
export type IAddWordOutput = IDictionaryEntry;
const addWord = async (data: IAddWordInput, accessToken?: string) => {
  return await api.post<IAddWordOutput>('/api/dictionary-entries', data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const DictionaryEntryService = {
  lookup,
  checkExistence,
  addWord,
};
