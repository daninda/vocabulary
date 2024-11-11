import { FC } from 'react';

interface Props {
  title: string;
  text: string;
}

const Info: FC<Props> = ({ title, text }) => {
  return (
    <div className="flex flex-col w-full gap-y-1">
      <p className="font-bold text-base text-slate-800">{title}</p>
      <p className="pl-4 font-semibold text-base text-slate-400">{text}</p>
    </div>
  );
};

export default Info;
