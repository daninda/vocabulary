import { FC, useEffect } from 'react';
import Item from './Item';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import DictionarySelection from '../DictionarySelection/DictionarySelection';
import { addWord, selectDictionaryId } from '../../../store/slices/add-word';

const Results: FC = () => {
  const { selectedDictionaryId, results, existenceWords } = useAppSelector(
    (state) => state.addWord,
  );
  const dispatch = useAppDispatch();

  const onAddWord = (word: string, pos: string, dictionaryId: string) => {
    dispatch(addWord({ word, partOfSpeech: pos, dictionaryId }));
  };

  useEffect(() => {
    if (selectedDictionaryId) {
      dispatch(selectDictionaryId(selectedDictionaryId));
    }
  }, [dispatch, results, selectedDictionaryId]);

  if (results == null) {
    return (
      <p className="text-base font-semibold text-center text-slate-400">
        Введите слово на английском, и вам будут представлены его разные формы с
        переводом и примерами использования. Добавьте нужную форму слова в
        словарь. Сохранённые слова будут доступны для изучения и выполнения
        тестов.
      </p>
    );
  }
  return (
    <>
      {results.length === 0 ? (
        <p className="text-base font-semibold text-center text-slate-400">
          Ничего не нашлось
        </p>
      ) : (
        <>
          <h2 className="w-full text-4xl font-bold text-center transition-opacity text-slate-800">
            {results[0].word}
          </h2>
          <DictionarySelection />
          <div className="flex flex-col w-full gap-y-8">
            {results.map((item) => (
              <Item
                key={item.word + item.pos}
                word={item.word}
                pos={item.pos}
                translated={item.translated}
                onClick={() =>
                  onAddWord(item.word, item.pos, selectedDictionaryId!)
                }
                disabled={!selectedDictionaryId}
                isAdded={
                  existenceWords?.find(
                    (check) =>
                      check.checkWord.word == item.word &&
                      check.checkWord.pos == item.pos,
                  )?.exist
                }
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Results;
