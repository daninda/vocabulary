import { FC, useEffect, useMemo, useState } from 'react';
import TextButton from '../../components/Button/Text';
import WrapperSmall from '../../components/Wrapper/Small';
import {
  generateTest,
  generateWordWithErrorTest,
  reset,
} from '../../store/slices/test';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import DictionarySelection from './DictionarySelection/DictionarySelection';
import TestSelection from './TestSelection/TestSelection';
import TranslationSelection from './testTypes/TranslationSelection/TranslationSelection';
import WordWithError from './testTypes/WordWithError';
import { TestType } from './types';

const Test: FC = () => {
  const [testTypeId, setTestTypeId] = useState<number>(0);
  const [step, setStep] = useState(0);

  const dispatch = useAppDispatch();
  const { selectedDictionaryId } = useAppSelector((state) => state.test);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const testTypes: TestType[] = useMemo<TestType[]>(() => {
    return [
      {
        id: 1,
        name: 'Перевод слов',
        onClick: () => {
          setTestTypeId(1);
          setStep(1);
        },
      },
      {
        id: 2,
        name: 'Исправление ошибки в слове',
        onClick: () => {
          setTestTypeId(2);
          setStep(1);
        },
      },
    ];
  }, [setTestTypeId]);

  useEffect(() => {
    if (step == 2 && testTypeId == 1 && selectedDictionaryId) {
      dispatch(
        generateTest({ dictionaryId: selectedDictionaryId, wrongsCount: 5 }),
      );
    } else if (step == 2 && testTypeId == 2 && selectedDictionaryId) {
      dispatch(
        generateWordWithErrorTest({ dictionaryId: selectedDictionaryId }),
      );
    }
  }, [step, testTypeId, selectedDictionaryId, dispatch]);

  return (
    <WrapperSmall>
      <h1 className="max-w-3xl mx-auto mt-12 text-4xl font-bold text-center text-slate-800">
        Выполнение тестов
      </h1>
      {step == 0 && (
        <p className="mt-6 text-base font-semibold text-center text-slate-400">
          Эти тесты помогут вам закрепить новые слова и улучшить запоминание.
        </p>
      )}
      <div className="mt-16">
        {step == 0 && <TestSelection testTypes={testTypes} id={testTypeId} />}
        {step == 1 && (
          <DictionarySelection
            onClick={() => {
              setStep(2);
            }}
          />
        )}
        {step == 2 && testTypeId == 1 && <TranslationSelection />}
        {step == 2 && testTypeId == 2 && <WordWithError />}
        {step == 2 && (
          <TextButton
            className="w-full mt-16 text-blue-400"
            text="Завершить выполнение тестов"
            onClick={() => {
              setStep(0);
              dispatch(reset());
              setTestTypeId(0);
            }}
          />
        )}
      </div>
    </WrapperSmall>
  );
};

export default Test;
