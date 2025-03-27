import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import DictionaryEntry from './DictionaryEntry';
import InputField from '../../../components/Input/Field';
import { FiSearch } from 'react-icons/fi';
import SelectField from '../../../components/Input/SelectField';
import {
  deleteDictionaryEntry,
  getDictionaryEntries,
} from '../../../store/slices/dictionaries';

const sortOptions = [
  { label: 'Сначала новые', value: 'date_desc' },
  { label: 'Сначала старые', value: 'date_asc' },
  { label: 'По алфавиту (A...Z)', value: 'alphabet_asc' },
  { label: 'По алфавиту (Z...A)', value: 'alphabet_desc' },
  { label: 'По возрастанию рейтинга', value: 'rating_asc' },
  { label: 'По убыванию рейтинга', value: 'rating_desc' },
];

const DictionaryEntries: FC = () => {
  const { dictionaryEntries, selectedDictionaryId, dictionaries, isLoading } =
    useAppSelector((state) => state.dictionaries);

  const dispatch = useAppDispatch();

  const [menuItems, setMenuItems] = useState<boolean[]>([]);
  const [sortOption, setSortOption] = useState<string | undefined>('date_desc');
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const dictionary = useMemo(
    () => dictionaries?.find((item) => item.id === selectedDictionaryId),
    [dictionaries, selectedDictionaryId],
  );

  const toggleMenu = (index: number) => {
    const item = menuItems[index];
    const newMenuItems = menuItems.map(() => false);
    newMenuItems[index] = !item;
    setMenuItems(newMenuItems);
  };

  useEffect(() => {
    if (dictionaryEntries) {
      setMenuItems(dictionaryEntries.map(() => false));
    }
  }, [dictionaryEntries]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setSearch('');
    setSortOption('date_desc');
  }, [selectedDictionaryId]);

  useEffect(() => {
    if (selectedDictionaryId) {
      dispatch(
        getDictionaryEntries({
          dictionaryId: selectedDictionaryId,
          sort: sortOption || 'date_desc',
          search: debouncedSearch,
        }),
      );
    }
  }, [debouncedSearch, selectedDictionaryId, sortOption, dispatch]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] pt-12">
      {dictionaryEntries ? (
        <div className="grid h-full grid-rows-[auto_auto_1fr] gap-y-5">
          <h1 className="px-3 text-4xl font-bold">{dictionary?.name}</h1>
          <div className="flex justify-between">
            <InputField
              className="max-w-xs"
              placeholder="Поиск слова в словаре"
              type="text"
              id="search"
              Icon={FiSearch}
              disabled={
                !isLoading && dictionaryEntries.length == 0 && !debouncedSearch
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <SelectField
              className="w-full max-w-xs"
              disabled={
                !isLoading && dictionaryEntries.length == 0 && !debouncedSearch
              }
              options={sortOptions}
              selected={sortOption}
              onChange={setSortOption}
            />
          </div>
          <div className="flex flex-col h-full pb-8 overflow-y-auto gap-y-2">
            {dictionaryEntries.length > 0 ? (
              dictionaryEntries.map((item, index) => (
                <DictionaryEntry
                  key={item.id}
                  data={item}
                  isOpen={menuItems[index]}
                  onClick={() => toggleMenu(index)}
                  onDelete={(id) => dispatch(deleteDictionaryEntry({ id: id }))}
                ></DictionaryEntry>
              ))
            ) : (
              <p className="text-lg font-semibold text-slate-400">
                {debouncedSearch
                  ? `По запросу "${debouncedSearch}" ничего не найдено`
                  : 'Теперь добавьте слова в словарь.'}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="pt-1 text-base font-semibold text-center text-slate-400">
          Выберите словарь в меню слева или создайте новый, нажав на кнопку "Создать новый". Добавление слова имеют свой рейтинг запоминания, который влияет на частоту его появления в тестах и отображается в виде цвета.
        </p>
      )}
    </div>
  );
};

export default DictionaryEntries;
