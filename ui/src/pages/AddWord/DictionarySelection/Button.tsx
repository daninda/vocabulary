import { FC } from 'react';

interface Props {
  id: string;
  title: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<Props> = ({
  id,
  title,
  selected = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick?.()}
      key={id}
      className={`text-sm h-10 px-4 rounded-2xl font-semibold transition-colors focus:outline-none ${disabled ? 'text-slate-400 bg-slate-200' : selected ? 'bg-blue-500 text-white hover:bg-blue-400' : 'text-slate-800 bg-slate-200 hover:bg-blue-500 hover:text-white'}`}
      disabled={selected ? false : disabled}
    >
      {title}
    </button>
  );
};

export default Button;
