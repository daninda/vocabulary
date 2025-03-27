import { FC, useCallback, useEffect } from 'react';
import Item from './Item';
import { FiPlus } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  findAll,
  getDictionaryEntries,
  setSelectedDictionaryId,
} from '../../../store/slices/dictionaries';

const Sidebar: FC = () => {
  const { dictionaries, selectedDictionaryId } = useAppSelector(
    (state) => state.dictionaries,
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const isCreatePage = location.pathname.endsWith('/create');

  const onItemSelect = useCallback(
    (id: string) => {
      dispatch(getDictionaryEntries({dictionaryId: id, search: '', sort: 'date_desc'}));
      if (isCreatePage) {
        navigate('/dictionaries');
      }
    },
    [dispatch, navigate, isCreatePage],
  );

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);


  return (
    <div
      className={`sticky top-0 flex flex-col h-[calc(100vh-80px)] px-20 py-12 gap-y-4`}
    >
      <h2 className="text-2xl font-bold text-slate-800">Словари</h2>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col overflow-y-auto gap-y-3">
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
            onClick={() => {
              dispatch(setSelectedDictionaryId(null));
            }}
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
