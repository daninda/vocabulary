import { FC, useState } from 'react';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import InputField from '../../components/Input/Field';
import WrapperSmall from '../../components/Wrapper/Small';
import DictionarySelection from './DictionarySelection/DictionarySelection';
import Results from './Results/Results';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { lookup } from '../../store/slices/add-word';

const AddWord: FC = () => {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();

  const { results } = useAppSelector((state) => state.addWord);

  return (
    <WrapperSmall>
      <div className="flex flex-col items-center mt-12 gap-y-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Добавление слова или фразы
        </h1>
        <div className="w-full">
          <InputField
            id="word"
            placeholder="Поиск слова или фразы"
            type="text"
            Icon={FiSearch}
            IconButton={FiArrowRight}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => dispatch(lookup({ word: search }))}
          />
        </div>
        {results != null ? (
          <>
            {results.length === 0 ? (
              <p className="text-base font-semibold text-center text-slate-400">
                Ничего не нашлось
              </p>
            ) : (
              <>
                <h2 className="w-full text-4xl font-bold text-center text-slate-800">
                  {results[0].word}
                </h2>
                <DictionarySelection />
                <Results results={results} />
              </>
            )}
          </>
        ) : (
          <p className="text-base font-semibold text-center text-slate-400">
            Введите слово на английском, и вам будут представлены его разные
            формы с переводом и примерами использования. Добавьте нужную форму
            слова в словарь. Сохранённые слова будут доступны для изучения и
            выполнения тестов.
          </p>
        )}
      </div>
    </WrapperSmall>
  );
};

export default AddWord;
