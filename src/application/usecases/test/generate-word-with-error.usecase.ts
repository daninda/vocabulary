import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { WordWithErrorTest } from '@domain/word-with-error-test';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

const qwertyMap = {
  q: 'wa',
  w: 'qe',
  e: 'wr',
  r: 'et',
  t: 'ry',
  y: 'tu',
  u: 'yi',
  i: 'uo',
  o: 'ip',
  p: 'o',
  a: 'sq',
  s: 'ad',
  d: 'sf',
  f: 'dg',
  g: 'fh',
  h: 'gj',
  j: 'hk',
  k: 'jl',
  l: 'k',
  z: 'xa',
  x: 'zc',
  c: 'xv',
  v: 'cb',
  b: 'vn',
  n: 'bm',
  m: 'n',
};

@Injectable()
export class GenerateWordWithErrorTestUseCase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
  ) {}

  async execute(dictionaryId: string): Promise<Result<WordWithErrorTest>> {
    const dictionaryEntry =
      await this.dictionaryEntryRepository.findForTestByDictionary(
        dictionaryId,
      );

    if (!dictionaryEntry) {
      return Result.failure('No more tests');
    }

    const methodsLessThreeChars = [
      this.replaceWithNearbyKey,
      this.replaceVowelWithAnother,
      this.replaceConsonantWithAnother,
    ];

    const methodsMoreThreeChars = [
      this.addRandomLetter,
      this.removeRandomLetter,
      this.swapAdjacentLetters,
      this.replaceWithNearbyKey,
      this.replaceVowelWithAnother,
      this.replaceConsonantWithAnother,
    ];

    let errorMethod: (word: string) => string;

    if (dictionaryEntry.word.length <= 3) {
      errorMethod =
        methodsLessThreeChars[
          Math.floor(Math.random() * methodsLessThreeChars.length)
        ];
    } else {
      errorMethod =
        methodsMoreThreeChars[
          Math.floor(Math.random() * methodsMoreThreeChars.length)
        ];
    }

    const wordWithError = errorMethod(dictionaryEntry.word);

    const wordWithErrorTest = WordWithErrorTest.create(
      dictionaryEntry,
      wordWithError,
    );

    return Result.success(wordWithErrorTest);
  }

  addRandomLetter(word: string) {
    if (word.length < 3) return word;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const index = Math.floor(Math.random() * word.length);
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    return word.slice(0, index) + randomLetter + word.slice(index);
  }

  removeRandomLetter(word: string) {
    if (word.length < 3) return word;
    const index = Math.floor(Math.random() * word.length);
    return word.slice(0, index) + word.slice(index + 1);
  }

  swapAdjacentLetters(word: string) {
    if (word.length < 3) return word;
    const index = Math.floor(Math.random() * (word.length - 1));
    return (
      word.slice(0, index) +
      word[index + 1] +
      word[index] +
      word.slice(index + 2)
    );
  }

  replaceWithNearbyKey(word: string) {
    const index = Math.floor(Math.random() * word.length);
    const letter = word[index];
    if (qwertyMap[letter]) {
      const possibleReplacements = qwertyMap[letter];
      const newLetter =
        possibleReplacements[
          Math.floor(Math.random() * possibleReplacements.length)
        ];
      return word.slice(0, index) + newLetter + word.slice(index + 1);
    }
    return word;
  }

  replaceVowelWithAnother(word: string) {
    const vowels = 'aeiouy';
    const index = [...word].findIndex((char) => vowels.includes(char));
    if (index === -1) return word;
    const newVowel = vowels[Math.floor(Math.random() * vowels.length)];
    return word.slice(0, index) + newVowel + word.slice(index + 1);
  }

  replaceConsonantWithAnother(word: string): string {
    const consonants = 'bcdfghjklmnpqrstvwxz';
    const index = [...word].findIndex((char) => consonants.includes(char));
    if (index === -1) return word;
    const newConsonant =
      consonants[Math.floor(Math.random() * consonants.length)];
    return word.slice(0, index) + newConsonant + word.slice(index + 1);
  }
}
