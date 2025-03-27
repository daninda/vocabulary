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

export interface IGenerateWordWithErrorTestInput {
  dictionaryId: string;
}
export interface IGenerateWordWithErrorTestOutput {
  dictionaryEntry: IDictionaryEntry;
  wordWithError: string;
}
export const generateWordWithErrorTest = async (
  data: IGenerateWordWithErrorTestInput,
) => {
  return await api.post<IGenerateWordWithErrorTestOutput>(
    'api/test/generate-word-with-error',
    data,
  );
};

export const TestService = {
  generateTest,
  generateWordWithErrorTest,
};
