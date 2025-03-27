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
  search?: string;
  sort: string;
}
export type IFindAllOutput = IDictionaryEntry[];
const findAll = async (data: IFindAllInput) => {
  return await api.get<IFindAllOutput>('/api/dictionary-entries', {
    params: {
      dictionaryId: data.dictionaryId,
      search: data.search,
      sort: data.sort,
    },
  });
};

export interface IDeleteInput {
  id: string
}
export type IDeleteOutput = null;
const deleteById = async (data: IDeleteInput) => {
  return await api.delete<IDeleteOutput>(`/api/dictionary-entries/${data.id}`);
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
const addWord = async (data: IAddWordInput) => {
  return await api.post<IAddWordOutput>('/api/dictionary-entries', data);
};

export interface IRatingUpInout {
  id: string;
}
export type IRatingUpOutput = IDictionaryEntry;
const ratingUp = async (data: IRatingUpInout) => {
  return await api.put<IRatingUpOutput>('/api/dictionary-entries/rating-up', {
    id: data.id,
  });
};

export interface IRatingDownInout {
  id: string;
}
export type IRatingDownOutput = IDictionaryEntry;
const ratingDown = async (data: IRatingUpInout) => {
  return await api.put<IRatingUpOutput>('/api/dictionary-entries/rating-down', {
    id: data.id,
  });
};

export const DictionaryEntryService = {
  lookup,
  findAll,
  deleteById,
  checkExistence,
  addWord,
  ratingUp,
  ratingDown,
};
