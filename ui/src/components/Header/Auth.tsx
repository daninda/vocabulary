import { FC } from 'react';
import { PiLetterCircleVFill } from 'react-icons/pi';
import WrapperLarge from '../Wrapper/Large';

const HeaderAuth: FC = () => {
  return (
    <header className="h-20 border border-slate-300">
      <WrapperLarge>
        <div className="flex justify-between items-center h-full">
          <div className="flex gap-x-2">
            <PiLetterCircleVFill size={32} />
            <div className="text-2xl font-extrabold text-slate-800">
              Vocabify
            </div>
          </div>

          <div className=""></div>
        </div>
      </WrapperLarge>
    </header>
  );
};

export default HeaderAuth;
