import { FC, useCallback, useEffect, useState } from 'react';
import ButtonMain from '../../../components/Button/Main';
import InputField from '../../../components/Input/Field';
import { DictionaryEntryService } from '../../../services/dictionary-entry';
import { generateWordWithErrorTest } from '../../../store/slices/test';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { Status } from '../../../utils/types';
import { ResultTimeInterval } from '../types';

const WordWithError: FC = () => {
  const dispatch = useAppDispatch();
  const { dictionaryEntry, wordWithError, selectedDictionaryId } =
    useAppSelector((state) => state.test);
  const [status, setStatus] = useState<Status>('default');
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (status === 'correct' || status === 'incorrect') {
      setProgress(100);
      setTimeout(() => setProgress(0), ResultTimeInterval);
    }
  }, [status]);

  const onAnswer = useCallback(
    (answer: string) => {
      if (dictionaryEntry != null && selectedDictionaryId != null) {
        if (answer.trim().toLowerCase() == dictionaryEntry.word) {
          DictionaryEntryService.ratingUp({ id: dictionaryEntry.id });
          setStatus('correct');
        } else {
          DictionaryEntryService.ratingDown({ id: dictionaryEntry.id });
          setStatus('incorrect');
        }

        setTimeout(() => {
          dispatch(
            generateWordWithErrorTest({
              dictionaryId: selectedDictionaryId,
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
      {dictionaryEntry == null || wordWithError == null ? (
        <p className="mt-16 text-xl font-semibold text-center text-slate-400">
          Нет доступных тестов
        </p>
      ) : null}
      {dictionaryEntry && wordWithError && (
        <>
          <div className="flex justify-center mt-16">
            <div className="flex flex-row items-center gap-x-4">
              <p className="text-4xl font-bold text-slate-800">
                {dictionaryEntry.translated.word}
              </p>
              <p className="">({dictionaryEntry.pos})</p>
            </div>
          </div>
          <div className="flex justify-center w-full mt-8">
            <p
              className={`flex items-center transition-colors justify-center py-8 text-xl font-bold w-96 rounded-2xl ${status == 'correct' ? 'bg-green-200 text-slate-800' : status == 'incorrect' ? 'bg-red-200 text-slate-800' : 'bg-slate-200 text-red-500'}`}
            >
              {status == 'default' ? wordWithError : dictionaryEntry.word}
            </p>
          </div>
          <div className="flex justify-center w-full mt-8">
            <InputField
              className="w-96"
              label="Ответ:"
              type="text"
              id="answer"
              placeholder="Введите исправленное слово"
              required={true}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="flex justify-center w-full mt-8">
            <ButtonMain
              className="w-96"
              text="Ответить"
              type="submit"
              onClick={() => onAnswer(answer)}
            />
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

export default WordWithError;
