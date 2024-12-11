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
const checkExistence = async (data: ICheckexistenceInput) => {
  return await api.post<ICheckexistenceOutput>(
    '/api/dictionary-entries/check-existence',
    {
      dictionaryId: data.dictionaryId,
      checkWords: data.checkWords,
    },
  );
};

export interface IAddWordInput {
  dictionaryId: string;
  word: string;
  partOfSpeech: string;
}
export type IAddWordOutput = IDictionaryEntry;
export const addWord = async (data: IAddWordInput) => {
  return await api.post<IAddWordOutput>('/api/dictionary-entries', data);
};

export const DictionaryEntryService = {
  lookup,
  findAll,
  checkExistence,
  addWord,
};
