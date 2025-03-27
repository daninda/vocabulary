import { FC } from 'react';

interface TextButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const TextButton: FC<TextButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`text-base transition-colors px-3 text-slate-800 font-bold hover:text-blue-500 focus:outline-none ${className}`}
    >
      {text}
    </button>
  );
};

export default TextButton;
