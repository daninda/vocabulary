import { FC } from 'react';
import { Link } from 'react-router-dom';

const LinkCreate: FC = () => {
  return (
    <Link
      to="/dictionaries"
      className={`text-sm h-10 px-4 rounded-2xl flex flex-row items-center font-semibold  transition-colors focus:outline-none text-slate-800 bg-slate-200 hover:bg-blue-500 hover:text-white`}
    >
      Создать новый словарь
    </Link>
  );
};

export default LinkCreate;
