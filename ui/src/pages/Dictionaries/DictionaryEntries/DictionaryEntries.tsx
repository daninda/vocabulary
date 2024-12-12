import { FC } from 'react';
import { useAppSelector } from '../../../utils/hooks';

const DictionaryEntries: FC = () => {
  const { dictionaryEntries } = useAppSelector((state) => state.dictionaries);

  return (
    <div className="flex flex-col">
      {dictionaryEntries && dictionaryEntries.length > 0 ? (
        <div>
          <div className="grid grid-cols-5 mb-8 border-b gap-x-8 border-slate-300">
            <p>Слово</p>
            <p>Часть речи</p>
            <p>Перевод</p>
            <p>Значения</p>
            <p>Синонимы</p>
          </div>
          <div className="flex flex-col gap-y-8">
            {dictionaryEntries.map((item) => (
              <div key={item.id} className="grid grid-cols-5 gap-x-8">
                <p>{item.word}</p>
                <p>{item.pos}</p>
                <p>{item.translated.word}</p>
                <p>{item.translated.means?.join(', ')}</p>
                <p>{item.translated.synonims?.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-base font-semibold text-center text-slate-400">
          Здесь пусто
        </p>
      )}
    </div>
  );
};

export default DictionaryEntries;
