import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const WrapperSmall: FC<Props> = ({ children }) => {
  return <div className="max-w-6xl mx-auto px-6 h-full">{children}</div>;
};

export default WrapperSmall;
