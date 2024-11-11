import { FC } from 'react';

const Button: FC = () => {
  return (
    <button
      className={`text-sm h-10 px-8 rounded-2xl bg-slate-200 text-slate-800 font-semibold transition-colors focus:outline-none hover:bg-blue-500 hover:text-white`}
    >
      Добавить
    </button>
  );
};

export default Button;
