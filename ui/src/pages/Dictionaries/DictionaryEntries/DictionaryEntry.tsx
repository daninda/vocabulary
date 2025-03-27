import { FC } from 'react';
import { IDictionaryEntry } from '../../../utils/types';
import { FiChevronDown, FiTrash2 } from 'react-icons/fi';
import { formatDate } from '../../../utils/helpers';

const getRatingColor = (value: number) => {
  if (value === -4) return 'bg-red-500';
  if (value === -3) return 'bg-red-400';
  if (value === -2) return 'bg-red-300';
  if (value === -1) return 'bg-orange-300';
  if (value === 0) return 'bg-gray-300';
  if (value === 1) return 'bg-yellow-300';
  if (value === 2) return 'bg-green-300';
  if (value === 3) return 'bg-green-400';
  if (value === 4) return 'bg-green-500';
  return 'bg-gray-200';
};

interface Props {
  data: IDictionaryEntry;
  onClick: () => void;
  isOpen: boolean;
  onDelete: (id: string) => void;
}

const DictionaryEntry: FC<Props> = ({ data, onClick, isOpen, onDelete }) => {
  return (
    <div
      className={`flex relative flex-col transition-colors rounded-lg ${isOpen ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
    >
      <div
        className={`w-2 h-full absolute rounded-lg ${getRatingColor(data.rating)}`}
      />

      <div
        className="flex flex-row items-center justify-between w-full h-20 p-4 cursor-pointer"
        onClick={() => onClick()}
      >
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-base font-bold text-slate-800">
            {data.word} - {data.translated.word}
          </h2>
          <p className="text-sm font-semibold text-slate-400">{data.pos}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8">
          <FiChevronDown
            size={24}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      <div
        className={`flex flex-row w-full px-4 justify-between overflow-hidden transition-all ${isOpen ? 'py-4' : 'h-0 py-0'}`}
      >
        <div className={`flex flex-col w-full gap-y-4`}>
          {data.translated.synonims &&
            data.translated.synonims.length > 0 &&
            data.translated.synonims[0] && (
              <div className="flex flex-col w-full gap-y-2">
                <p className="text-sm font-semibold text-slate-800">Синонимы</p>
                <p className="text-sm font-semibold text-slate-500">
                  {data.translated.synonims.join(', ')}
                </p>
              </div>
            )}
          {data.translated.means &&
            data.translated.means.length > 0 &&
            data.translated.means[0] && (
              <div className="flex flex-col w-full gap-y-2">
                <p className="text-sm font-semibold text-slate-800">Значения</p>
                <p className="text-sm font-semibold text-slate-500">
                  {data.translated.means.join(', ')}
                </p>
              </div>
            )}
          {data.translated.example &&
            data.translated.example.text &&
            data.translated.example.translated && (
              <div className="flex flex-col w-full gap-y-2">
                <p className="text-sm font-semibold text-slate-800">
                  Примеры использования
                </p>
                <p className="text-sm font-semibold text-slate-500">
                  {`${data.translated.example.text} - ${data.translated.example.translated}`}
                </p>
              </div>
            )}
        </div>
        <p className="flex items-end p-1 pr-4 text-base font-medium text-slate-400 whitespace-nowrap">
          Добавлено: {formatDate(data.createAt)}
        </p>
        <div className="flex items-end p-1">
          <FiTrash2
            size={24}
            className="text-gray-800 transition-colors cursor-pointer hover:text-blue-500"
            onClick={() => {
              onDelete(data.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DictionaryEntry;
