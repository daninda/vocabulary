import { FC } from 'react';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import InputField from '../../components/Input/Field';
import WrapperSmall from '../../components/Wrapper/Small';
import DictionarySelection from './DictionarySelection/DictionarySelection';
import Results from './Results/Results';

const AddWord: FC = () => {
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
          />
        </div>
        {/* <p className="font-semibold text-base text-slate-400 text-center">
          Введите слово на английском, и вам будут представлены его разные формы
          с переводом и примерами использования. Добавьте нужную форму слова в
          словарь. Сохранённые слова будут доступны для изучения и выполнения
          тестов.
        </p> */}
        <DictionarySelection />
        <Results />
      </div>
    </WrapperSmall>
  );
};

export default AddWord;
