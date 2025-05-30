import { FC } from 'react';

interface Props {
  disabled?: boolean;
  added?: boolean;
  onClick?: () => void;
}

const Button: FC<Props> = ({ disabled, added, onClick }) => {
  return (
    <button
      onClick={() => onClick?.()}
      className={`text-sm h-10 px-8 rounded-2xl bg-slate-200 font-semibold transition-colors focus:outline-none  ${disabled || added ? 'text-slate-400' : 'text-slate-800 hover:bg-blue-500 hover:text-white'}`}
      disabled={disabled || added}
    >
      {disabled ? 'Выберите словарь' : added ? 'Добавлено' : 'Добавить'}
    </button>
  );
};

export default Button;
