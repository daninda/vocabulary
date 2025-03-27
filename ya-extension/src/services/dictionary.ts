import { IDictionary } from '../utils/types';
import api from './api';

export type IFindAllDictionaryOutput = IDictionary[];
const findAll = async (accessToken?: string) => {
  return await api.get<IFindAllDictionaryOutput>('/api/dictionaries', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const DictionaryService = {
  findAll,
};
