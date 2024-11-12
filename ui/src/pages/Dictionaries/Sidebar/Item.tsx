import { FC } from 'react';

interface Props {
  selected?: boolean;
  text: string;
}

const Item: FC<Props> = ({ selected, text }) => {
  return (
    <button
      className={`w-full px-4 text-base font-bold text-left transition-colors text-slate-800 h-11 min-h-11 hover:bg-slate-100 rounded-2xl ${selected ? 'bg-slate-200' : ''}`}
    >
      {text}
    </button>
  );
};

export default Item;
