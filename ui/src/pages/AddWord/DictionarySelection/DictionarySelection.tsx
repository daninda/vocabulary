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
    <div className="flex flex-col w-full gap-y-4">
      <p className="text-2xl font-bold text-slate-800">Выбор словаря</p>

      <div className="flex flex-row gap-x-4">
        {mockData.map((item) => (
          <Button key={item.id} id={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default DictionarySelection;
