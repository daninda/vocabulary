import { FC } from 'react';
import { IconType } from 'react-icons';

interface IconButtonProps {
  Icon: IconType;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-2xl text-gray-800 flex items-center justify-center bg-slate-200 transition-colors hover:text-blue-500 focus:outline-none"
    >
      <Icon size={24} />
    </button>
  );
};

export default IconButton;
