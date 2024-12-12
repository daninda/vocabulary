import { FC } from 'react';
import { Status } from '../../../utils/types';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  status: Status;
  text: string;
}

const Button: FC<Props> = ({ disabled = false, status, onClick, text }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick?.()}
      className={`flex items-center justify-center w-full py-16 text-xl font-bold text-slate-800 rounded-2xl ${!disabled ? 'hover:bg-slate-300' : ''} disabled:cursor-not-allowed ${status == 'correct' ? 'bg-green-200' : status == 'incorrect' ? 'bg-red-200' : 'bg-slate-200'}`}
    >
      {text}
    </button>
  );
};

export default Button;
