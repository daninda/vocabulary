import { FC } from 'react';
import WrapperLarge from '../../../components/Wrapper/Large';
import Sidebar from '../Sidebar/Sidebar';
import DictionaryEntries from '../DictionaryEntries/DictionaryEntries';

const Dictionary: FC = () => {
  return (
    <WrapperLarge>
      <div className="grid w-full h-full grid-cols-3">
        <div className="relative h-full col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-2 mt-12">
          <DictionaryEntries />
        </div>
      </div>
    </WrapperLarge>
  );
};

export default Dictionary;
