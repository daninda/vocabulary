import { IDictionaryEntry } from '../utils/types';
import api from './api';

export interface IGenerateTestInput {
  dictionaryId: string;
  wrongsCount: number;
}
export interface IGenerateTestOutput {
  dictionaryEntry: IDictionaryEntry;
  wrongs: string[];
}
export const generateTest = async (data: IGenerateTestInput) => {
  return await api.post<IGenerateTestOutput>('api/test/generate', data);
};

export const TestService = {
  generateTest,
};
