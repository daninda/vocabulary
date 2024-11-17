import { FC } from 'react';
import Button from './Button';
import Info from './Info';
import { IPartOfSpeech } from '../../../utils/types';

interface Props {
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

const Item: FC<Props> = ({ pos, translated }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <p className="text-2xl font-bold text-slate-800">{translated.word}</p>
          <p className="text-base font-semibold text-slate-400">{pos}</p>
        </div>
        <Button />
      </div>
      <div className="flex flex-col w-full py-2 border-t gap-y-3 border-slate-300">
        <Info title="Синонимы" text={translated.synonims?.join(', ') || ''} />
        <Info title="Значение" text={translated.means?.join(', ') || ''} />
        <Info
          title="Примеры использования"
          text={translated.example?.text || ''}
        />
      </div>
    </div>
  );
};

export default Item;
