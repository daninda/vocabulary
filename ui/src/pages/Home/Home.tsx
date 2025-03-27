import { FC, useEffect, useState } from 'react';
import SelectField from '../../components/Input/SelectField';
import WrapperLarge from '../../components/Wrapper/Large';
import { DictionaryService } from '../../services/dictionary';
import {
  ICalcStatisticOutput,
  TestStatisticService,
} from '../../services/test-statistic';
import { IDictionary } from '../../utils/types';
import StatisticLineChart from './StatisticLineChart';

const intervalOptions = [
  { label: 'За всё время', value: undefined },
  { label: 'За последние сутки', value: 'day' },
  { label: 'За последнюю неделю', value: 'week' },
  { label: 'За последний месяц', value: 'month' },
];

const Home: FC = () => {
  const [statistics, setStatistics] = useState<ICalcStatisticOutput>([]);
  const [statisticsLoading, setStatisticsLoading] = useState(true);

  const [dictionaries, setDictionaries] = useState<IDictionary[]>([]);
  const [dictionariesLoading, setDictionariesLoading] = useState(true);
  const [selectedDictionary, setSelectedDictionary] = useState<
    string | undefined
  >(undefined);

  const [selectedInterval, setSelectedInterval] = useState<string | undefined>(
    'day',
  );

  const getCommonStatistics = () => {
    return statistics.reduce(
      (acc, stat) => {
        return {
          addedCount: acc.addedCount + stat.addedCount,
          passedCount: acc.passedCount + stat.passedCount,
          rightCount: acc.rightCount + stat.rightCount,
          wrongCount: acc.wrongCount + stat.wrongCount,
        };
      },
      { addedCount: 0, passedCount: 0, rightCount: 0, wrongCount: 0 },
    );
  };

  useEffect(() => {
    setDictionariesLoading(true);

    DictionaryService.findAll().then((res) => {
      setDictionaries(res.data);
      setDictionariesLoading(false);
    });
  }, []);

  useEffect(() => {
    setStatisticsLoading(true);
    TestStatisticService.calcStatistic({
      dictionaryId: selectedDictionary,
      interval: selectedInterval,
    }).then((res) => {
      setStatistics(res.data);
      setStatisticsLoading(false);
    });
  }, [selectedDictionary, selectedInterval]);

  return (
    <WrapperLarge>
      <div className="flex flex-col mt-12 gap-y-8">
        <div className="flex flex-col w-full pb-2 gap-y-16">
          <h1 className="max-w-3xl mx-auto text-4xl font-bold text-center text-slate-800">
            Добро пожаловать!
          </h1>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800"></h2>
          <div className="flex flex-row items-center justify-end gap-x-4">
            <SelectField
              className="w-64"
              disabled={!dictionariesLoading && dictionaries.length == 0}
              options={[
                { label: 'Во всех словарях', value: undefined },
                ...dictionaries.map((d) => ({ label: d.name, value: d.id })),
              ]}
              selected={selectedDictionary}
              onChange={setSelectedDictionary}
            />
            <SelectField
              className="w-64"
              options={intervalOptions}
              selected={selectedInterval}
              onChange={setSelectedInterval}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between w-full pb-4 gap-x-4">
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-slate-800">
                {getCommonStatistics().addedCount}
              </p>
              <p className="text-base text-slate-800">Добавлено слов</p>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-slate-800">
                {getCommonStatistics().passedCount}
              </p>
              <p className="text-base text-slate-800">Тестов выполнено</p>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-slate-800">
                {getCommonStatistics().rightCount}
              </p>
              <p className="text-base text-slate-800">Выполнено правильно</p>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-slate-800">
                {getCommonStatistics().wrongCount}
              </p>
              <p className="text-base text-slate-800">Выполнено неправильно</p>
            </div>
          </div>
        </div>
        <div>
          {!statisticsLoading && (
            <StatisticLineChart data={statistics} interval={selectedInterval} />
          )}
        </div>
      </div>
    </WrapperLarge>
  );
};

export default Home;
