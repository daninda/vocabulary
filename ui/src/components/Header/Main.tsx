import { FC } from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
import IconButton from '../Button/Icon';
import TextButton from '../Button/Text';
import { PiLetterCircleVFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WrapperLarge from '../Wrapper/Large';

const HeaderMain: FC = () => {
  const navigate = useNavigate();

  return (
    <header className={`h-[80px] border border-slate-300`}>
      <WrapperLarge>
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex gap-x-2">
            <PiLetterCircleVFill size={32} />
            <div className="text-2xl font-extrabold text-slate-800">
              Vocabify
            </div>
          </Link>

          <div className="flex gap-x-4">
            <TextButton onClick={() => navigate('/')} text="Главная" />
            <TextButton
              onClick={() => navigate('/add-word')}
              text="Добавить слово"
            />
            <TextButton onClick={() => navigate('/tests')} text="Тесты" />
            <TextButton
              onClick={() => navigate('/dictionaries')}
              text="Словари"
            />

            <IconButton Icon={FiSearch} />
            <IconButton Icon={FiMenu} />
          </div>
        </div>
      </WrapperLarge>
    </header>
  );
};

export default HeaderMain;
