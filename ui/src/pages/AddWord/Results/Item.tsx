import { FC } from 'react';
import Button from './Button';
import Info from './Info';

const Item: FC = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <p className="text-slate-800 font-bold text-2xl">Время</p>
          <p className="text-slate-400 font-semibold text-base">noun</p>
        </div>
        <Button />
      </div>
      <div className="flex flex-col gap-y-3 w-full border-t py-2 border-slate-300">
        <Info
          title="Синонимы"
          text="noun, adjective, adverb, verb, adjective"
        />
        <Info title="Значение" text="adverb" />
        <Info title="Примеры использования" text="adjective" />
      </div>
    </div>
  );
};

export default Item;
