import { FC } from 'react';
import Item from './Item';

const Results: FC = () => {
  return (
    <div className="flex flex-col gap-y-8 w-full">
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default Results;
