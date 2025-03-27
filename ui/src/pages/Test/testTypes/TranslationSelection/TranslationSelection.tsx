import { FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { Status } from '../../../../utils/types';
import { DictionaryEntryService } from '../../../../services/dictionary-entry';
import { generateTest } from '../../../../store/slices/test';
import Button from './Button/Button';
import { ResultTimeInterval } from '../../types'

const TranslationSelection: FC = () => {
  const dispatch = useAppDispatch();
  const { dictionaryEntry, wrongWords, selectedDictionaryId } = useAppSelector(
    (state) => state.test,
  );
  const [status, setStatus] = useState<Status>('default');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'correct' || status === 'incorrect') {
      setProgress(100);
      setTimeout(() => setProgress(0), ResultTimeInterval);
    }
  }, [status]);

  const onAnswer = useCallback(
    (answer: string) => {
      if (dictionaryEntry != null && selectedDictionaryId != null) {
        if (answer == dictionaryEntry.word) {
          DictionaryEntryService.ratingUp({ id: dictionaryEntry.id });
          setStatus('correct');
        } else {
          DictionaryEntryService.ratingDown({ id: dictionaryEntry.id });
          setStatus('incorrect');
        }

        setTimeout(() => {
          dispatch(
            generateTest({
              dictionaryId: selectedDictionaryId,
              wrongsCount: 5,
            }),
          );
          setStatus('default');
        }, ResultTimeInterval);
      }
    },
    [dictionaryEntry, dispatch, selectedDictionaryId],
  );

  return (
    <>
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
            {wrongWords.map((item, index) => (
              <Button
                status={
                  status != 'default'
                    ? item == dictionaryEntry.word
                      ? 'correct'
                      : 'incorrect'
                    : 'default'
                }
                text={item}
                key={index}
                onClick={() => onAnswer(item)}
                disabled={status != 'default'}
              />
            ))}
          </div>
          {(status == 'correct' || status == 'incorrect') && (
            <div>
              <p className="mt-16 text-xl font-semibold text-center text-slate-800">
                {status == 'correct' && 'Ответ верный!'}
                {status == 'incorrect' && 'Ответ неверный!'}
              </p>
              <div className="w-full h-2 mt-4 overflow-hidden bg-gray-200 rounded-full">
                <div
                  className={`h-full transition-all ease-linear ${status === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    width: `${progress}%`,
                    transitionDuration: `${ResultTimeInterval}ms`,
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TranslationSelection;
