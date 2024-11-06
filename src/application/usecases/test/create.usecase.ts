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
      wrongs = faker.word.words(wrongsCount).split('');
    }

    for (let i = 0; i < wrongsCount; i++) {
      wrongs.push(faker.word[dictionaryEntry.pos](length));
    }

    const test = Test.create(dictionaryEntry, wrongs);

    return Result.success(test);
  }
}
