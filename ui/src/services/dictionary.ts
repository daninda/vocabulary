import api from './api';
import { IDictionary } from '../utils/types';

export type IFindAllDictionaryOutput = IDictionary[];
const findAll = async () => {
  return await api.get<IFindAllDictionaryOutput>('/api/dictionaries');
};

export type ICreateDictionaryInput = {
  name: string;
};
export type ICreateDictionaryOutput = IDictionary;
const create = async (data: ICreateDictionaryInput) => {
  return await api.post<ICreateDictionaryOutput>('/api/dictionaries', {
    name: data.name,
  });
};

export type IFindOneDictionaryInput = {
  id: string;
};
export type IFindOneDictionaryOutput = IDictionary;
const findOne = async (data: IFindOneDictionaryInput) => {
  return await api.get<ICreateDictionaryOutput>('/api/dictionaries', {
    params: {
      id: data.id,
    },
  });
};

export const DictionaryService = {
  findOne,
  findAll,
  create,
};
