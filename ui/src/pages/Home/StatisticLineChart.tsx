import { FC } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ICalcStatisticOutput } from '../../services/test-statistic';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

type Props = {
  data: ICalcStatisticOutput;
  interval?: string;
};

const StatisticLineChart: FC<Props> = ({ data, interval }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    switch (interval) {
      case 'day':
        return format(date, 'HH:mm, eeee', { locale: ru });
      case 'week':
        return format(date, 'dd MMM, eeee', { locale: ru });
      case 'month':
        return format(date, 'dd MMM', { locale: ru });
      default:
        return format(date, 'MMM yyyy', { locale: ru });
    }
  };

  const customTooltip = ({ payload, label }: any) => {
    if (!payload || !payload.length) return null;

    const { addedCount, passedCount, rightCount, wrongCount } =
      payload[0].payload;
    return (
      <div className="max-w-xs p-4 bg-white rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-gray-800">
          {formatDate(label)}
        </p>{' '}
        <div className="flex flex-col mt-2 text-sm text-slate-800 gap-y-2">
          <p className="text-[#8884d8]">
            <strong>Добавлено слов:</strong> {addedCount}
          </p>
          <p className="text-[#82ca9d]">
            <strong>Тестов выполнено:</strong> {passedCount}
          </p>
          <p className="text-[#4CAF50]">
            <strong>Выполнено правильно:</strong> {rightCount}
          </p>
          <p className="text-[#F44336]">
            <strong>Выполнено неправильно:</strong> {wrongCount}
          </p>
        </div>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(date) => formatDate(date)} />
        <YAxis />
        <Tooltip content={customTooltip} />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            lineHeight: '40px',
            fontSize: '16px',
            fontWeight: 'medium',
          }}
        />
        <Line
          dataKey="addedCount"
          stroke="#8884d8"
          name="Добавлено слов"
          strokeWidth={2}
        />
        <Line
          dataKey="passedCount"
          stroke="#82ca9d"
          name="Тестов выполнено"
          strokeWidth={2}
        />
        <Line
          dataKey="rightCount"
          stroke="#4CAF50"
          name="Выполнено правильно"
          strokeWidth={2}
        />
        <Line
          dataKey="wrongCount"
          stroke="#F44336"
          name="Выполнено неправильно"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StatisticLineChart;
