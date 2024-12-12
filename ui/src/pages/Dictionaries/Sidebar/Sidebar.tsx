import { FC, useEffect } from 'react';
import Item from './Item';
import { FiPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  findAll,
  getDictionaryEntries,
} from '../../../store/slices/dictionaries';

const Sidebar: FC = () => {
  const { dictionaries, selectedDictionaryId } = useAppSelector(
    (state) => state.dictionaries,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onItemSelect = (id: string) => {
    dispatch(getDictionaryEntries(id));
    navigate('/dictionaries');
  };

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  return (
    <div
      className={`sticky flex flex-col h-[calc(100vh-80px)] px-20 py-12 gap-y-4`}
    >
      <h2 className="text-2xl font-bold text-slate-800">Словари</h2>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col overflow-y-scroll no-scrollbar gap-y-3">
          {dictionaries == null || dictionaries.length == 0 ? (
            <p className="font-semibold text-slate-400">Здесь пусто</p>
          ) : (
            dictionaries.map((item) => (
              <Item
                key={item.id}
                text={item.name}
                onClick={() => onItemSelect(item.id)}
                selected={item.id == selectedDictionaryId}
              />
            ))
          )}
        </div>
        <div className="flex flex-row items-center w-full h-20 gap-x-3 min-h-20 text-slate-800 hover:text-blue-500 focus:outline-none">
          <FiPlus size={24} />
          <Link
            to="/dictionaries/create"
            className="content-center w-full h-full text-base font-bold text-left "
          >
            Создать новый
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
