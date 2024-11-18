import { FC } from 'react';
import Button from './Button';
import { useAppSelector } from '../../../utils/hooks';
import LinkCreate from './LinkCreate';

const DictionarySelection: FC = () => {
  const { dictionaries } = useAppSelector((state) => state.dictionaries);

  if (dictionaries == null) {
    return <LinkCreate />;
  }

  return (
    <div className="flex flex-col w-full gap-y-4">
      <p className="text-2xl font-bold text-slate-800">Выбор словаря</p>

      <div className="flex flex-row gap-x-4">
        {dictionaries.map((item) => (
          <Button key={item.id} id={item.id} title={item.name} />
        ))}
      </div>
    </div>
  );
};

export default DictionarySelection;
