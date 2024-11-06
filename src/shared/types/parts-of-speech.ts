export type PartOfSpeech =
  | 'noun' // существительное
  | 'adjective' // прилагательное
  | 'verb' // глагол
  | 'adverb' // наречие
  | 'preposition' // предлог
  | 'conjunction' // союз
  | 'interjection' // междометие
  | 'pronoun' // местоимение
  | 'other';

export function getPartOfSpeech(partOfSpeech: string): PartOfSpeech {
  if (partOfSpeech === 'существительное' || partOfSpeech === 'noun') {
    return 'noun';
  } else if (
    partOfSpeech === 'прилагательное' ||
    partOfSpeech === 'adjective'
  ) {
    return 'adjective';
  } else if (partOfSpeech === 'глагол' || partOfSpeech === 'verb') {
    return 'verb';
  } else if (partOfSpeech === 'наречие' || partOfSpeech === 'adverb') {
    return 'adverb';
  } else if (partOfSpeech === 'предлог' || partOfSpeech === 'preposition') {
    return 'preposition';
  } else if (partOfSpeech === 'союз' || partOfSpeech === 'conjunction') {
    return 'conjunction';
  } else if (partOfSpeech === 'междометие' || partOfSpeech === 'interjection') {
    return 'interjection';
  } else if (partOfSpeech === 'местоимение' || partOfSpeech === 'pronoun') {
    return 'pronoun';
  } else {
    return 'other';
  }
}
