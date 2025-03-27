import { FC } from 'react';
import Button from './Button';
import Info from './Info';
import { IPartOfSpeech } from '../../../utils/types';

interface Props {
  onClick?: () => void;
  isAdded?: boolean;
  disabled?: boolean;

  word: string;
  pos: IPartOfSpeech;
  translated: {
    word: string;
    pos: string;
    synonims?: string[];
    means?: string[];
    example?: {
      text: string;
      translated: string;
    };
  };
}

const Item: FC<Props> = ({ pos, translated, onClick, isAdded, disabled }) => {
  return (
    <div className="flex flex-col p-6 rounded-2xl gap-y-4 bg-slate-100">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <p className="text-2xl font-bold text-slate-800">{translated.word}</p>
          <p className="text-base font-semibold text-slate-400">{pos}</p>
        </div>
        <Button onClick={onClick} added={isAdded} disabled={disabled} />
      </div>
      <div className="flex flex-col w-full py-2 border-t gap-y-3 border-slate-300">
        {translated.synonims && (
          <Info title="Синонимы" text={translated.synonims?.join(', ') || ''} />
        )}
        {translated.means && (
          <Info title="Значение" text={translated.means?.join(', ') || ''} />
        )}
        {translated.example?.text && (
          <Info
            title="Пример использования"
            text={translated.example?.translated || ''}
          />
        )}
      </div>
    </div>
  );
};

export default Item;
