import { FC, useState } from 'react';
import WrapperLarge from '../../../components/Wrapper/Large';
import Sidebar from '../Sidebar/Sidebar';
import InputField from '../../../components/Input/Field';
import ButtonMain from '../../../components/Button/Main';
import { useAppDispatch } from '../../../utils/hooks';
import { create } from '../../../store/slices/dictionaries';

const Create: FC = () => {
  const [name, setName] = useState('');

  const dispatch = useAppDispatch();

  const handleCreate = () => {
    if (name) {
      dispatch(create({ name }));
    }
  };

  return (
    <WrapperLarge>
      <div className="grid w-full h-full grid-cols-3">
        <div className="relative h-full col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-2 mt-12">
          <h2 className="text-4xl font-bold text-slate-800">
            Создание нового словаря
          </h2>
          <p className="mt-6 text-base font-semibold text-slate-400">
            Словарь - это коллекция слов и фраз. Вы можете группировать слова по
            тематике, сложности или любому другому признаку, который поможет вам
            в изучении.
          </p>
          <div className="flex flex-col max-w-xl mt-6 gap-y-12">
            <InputField
              type="text"
              id="dictionary-name"
              label="Название словаря"
              placeholder="Название словаря"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ButtonMain
              text="Создать"
              type="button"
              onClick={() => handleCreate()}
            />
          </div>
        </div>
      </div>
    </WrapperLarge>
  );
};

export default Create;
