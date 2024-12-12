import { DictionaryEntry } from '@domain/dictionary-entry';
import { Test } from '@domain/test';
import { faker } from '@faker-js/faker/locale/ru';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class CreateTestUseCase {
  constructor() {}

  execute(dictionaryEntry: DictionaryEntry, wrongsCount: number): Result<Test> {
    const length = dictionaryEntry.word.length;

    let wrongs: string[] = [];
    if (dictionaryEntry.pos === 'other' || dictionaryEntry.pos === 'pronoun') {
      wrongs = faker.word.words(wrongsCount - 1).split('');
      wrongs.push(dictionaryEntry.word);
    } else {
      for (let i = 0; i < wrongsCount - 1; i++) {
        wrongs.push(faker.word[dictionaryEntry.pos](length));
      }
    }

    wrongs.push(dictionaryEntry.word);

    wrongs = shuffleArray(wrongs);

    const test = Test.create(dictionaryEntry, wrongs);

    return Result.success(test);
  }
}

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
