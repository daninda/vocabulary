import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const WrapperLarge: FC<Props> = ({ children }) => {
  return <div className="max-w-[1800px] mx-auto px-5 h-full">{children}</div>;
};

export default WrapperLarge;
