import { FC } from 'react';
import Item from './Item';
import { IDictionaryEntry } from '../../../utils/types';

interface Props {
  results: IDictionaryEntry[];
}

const Results: FC<Props> = ({ results }) => {
  return (
    <div className="flex flex-col w-full gap-y-8">
      {results.map((item) => (
        <Item
          key={item.word + item.pos}
          word={item.word}
          pos={item.pos}
          translated={item.translated}
        />
      ))}
    </div>
  );
};

export default Results;
