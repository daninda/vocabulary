import { FC, useCallback, useEffect } from 'react';
import Button from './Button';
import LinkCreate from './LinkCreate';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { generateTest } from '../../../store/slices/test'
import { findAll } from '../../../store/slices/dictionaries'

interface Props {
  onClick: () => void;
}

const DictionarySelection: FC<Props> = ({onClick}) => {
  const { dictionaries } = useAppSelector((state) => state.dictionaries);
  const { selectedDictionaryId } = useAppSelector((state) => state.test);

  const dispatch = useAppDispatch();

  const onSelectDictionaryId = useCallback((id: string) => {
    dispatch(
      generateTest({
        dictionaryId: id,
        wrongsCount: 5,
      }),
    );
    onClick();
  }, [dispatch, onClick]);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  if (dictionaries == null) {
    return <LinkCreate />;
  }

  return (
    <div className="flex flex-col items-center w-full gap-y-8">
      <p className="text-2xl font-bold text-slate-800">Выберите словарь:</p>

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
