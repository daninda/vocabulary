import { FC } from 'react';
import Button from './Button';

const DictionarySelection: FC = () => {
  const mockData = [
    {
      id: '1',
      title: 'Программирование',
    },
    {
      id: '2',
      title: 'Путешествия',
    },
    {
      id: '3',
      title: 'Время',
    },
  ];

  return (
    <div className="w-full flex flex-col gap-y-4">
      <p className="font-bold text-slate-800 text-2xl">Выбор словаря</p>

      <div className="flex flex-row gap-x-4">
        {mockData.map((item) => (
          <Button id={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default DictionarySelection;
