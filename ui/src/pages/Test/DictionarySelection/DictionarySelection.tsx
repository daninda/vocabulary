import { FC, useEffect } from 'react';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import LinkCreate from './LinkCreate';
import { findAll } from '../../../store/slices/dictionaries';
import { generateTest } from '../../../store/slices/test';

const DictionarySelection: FC = () => {
  const { dictionaries } = useAppSelector((state) => state.dictionaries);
  const { selectedDictionaryId } = useAppSelector((state) => state.test);

  const dispatch = useAppDispatch();

  const onSelectDictionaryId = (id: string) => {
    dispatch(
      generateTest({
        dictionaryId: id,
        wrongsCount: 5,
      }),
    );
  };

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  if (dictionaries == null) {
    return <LinkCreate />;
  }

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <p className="text-2xl font-bold text-slate-800">Выбор словаря</p>

      <div className="flex flex-row gap-x-4">
        {dictionaries.map((item) => (
          <Button
            onClick={() => onSelectDictionaryId(item.id)}
            key={item.id}
            id={item.id}
            title={item.name}
            selected={item.id === selectedDictionaryId}
          />
        ))}
      </div>
    </div>
  );
};

export default DictionarySelection;
