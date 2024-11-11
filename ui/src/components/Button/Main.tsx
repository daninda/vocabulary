import { FC } from 'react';

interface Props {
  text: string;
  type: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}

const ButtonMain: FC<Props> = ({ text, type, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full text-base px-4 font-bold text-white h-12 bg-blue-500 rounded-2xl hover:bg-blue-400 focus:outline-none focus:ring-1 transition-colors focus:ring-blue-500 ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonMain;
