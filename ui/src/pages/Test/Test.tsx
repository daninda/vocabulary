import { FC, useState } from 'react';
import WrapperSmall from '../../components/Wrapper/Small';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import DictionarySelection from './DictionarySelection/DictionarySelection';
import Button from './Button/Button';
import { DictionaryEntryService } from '../../services/dictionary-entry';
import { generateTest } from '../../store/slices/test';
import { Status } from '../../utils/types';

const Test: FC = () => {
  const dispatch = useAppDispatch();
  const { dictionaryEntry, wrongWords, selectedDictionaryId } = useAppSelector(
    (state) => state.test,
  );
  const [status, setStatus] = useState<Status>('default');

  const onAnswer = (answer: string) => {
    if (dictionaryEntry != null && selectedDictionaryId != null) {
      if (answer == dictionaryEntry.word) {
        DictionaryEntryService.ratingUp({ id: dictionaryEntry.id });
        setStatus('correct');
      } else {
        DictionaryEntryService.ratingDown({ id: dictionaryEntry.id });
        setStatus('incorrect');
      }

      const timer = setTimeout(() => {
        dispatch(
          generateTest({ dictionaryId: selectedDictionaryId, wrongsCount: 5 }),
        );
        setStatus('default');
        clearTimeout(timer);
      }, 3000);
    }
  };

  return (
    <WrapperSmall>
      <div className="mt-8">
        <DictionarySelection />
        {dictionaryEntry == null || wrongWords == null ? (
          <p className="mt-16 text-xl font-semibold text-center text-slate-400">
            Нет доступных тестов
          </p>
        ) : null}
        {dictionaryEntry && wrongWords && (
          <>
            <div className="flex justify-center mt-16">
              <div className="flex flex-row items-center gap-x-4">
                <p className="text-4xl font-bold text-slate-800">
                  {dictionaryEntry.translated.word}
                </p>
                <p className="">({dictionaryEntry.pos})</p>
              </div>
            </div>
            <div className="grid grid-cols-5 mt-8 gap-x-4">
              {wrongWords.map((item) => (
                <Button
                  status={
                    status != 'default'
                      ? item == dictionaryEntry.word
                        ? 'correct'
                        : 'incorrect'
                      : 'default'
                  }
                  text={item}
                  key={item}
                  onClick={() => onAnswer(item)}
                  disabled={status != 'default'}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </WrapperSmall>
  );
};

export default Test;
