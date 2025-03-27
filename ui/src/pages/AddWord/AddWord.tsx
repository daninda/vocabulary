import { FC, useState } from 'react';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import InputField from '../../components/Input/Field';
import WrapperSmall from '../../components/Wrapper/Small';
import Results from './Results/Results';
import { useAppDispatch } from '../../utils/hooks';
import { lookup } from '../../store/slices/add-word';

const AddWord: FC = () => {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();

  const onLookup = () => {
    dispatch(lookup({ word: search }));
  };

  return (
    <WrapperSmall>
      <div className="flex flex-col items-center mt-12 mb-8 gap-y-10">
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
            onClick={() => onLookup()}
          />
        </div>
        <Results />
      </div>
    </WrapperSmall>
  );
};

export default AddWord;
