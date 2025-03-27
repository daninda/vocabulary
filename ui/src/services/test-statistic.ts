import api from './api';

export type ICalcStatisticInput = {
  dictionaryId?: string;
  interval?: string;
};
export type ICalcStatisticOutput = {
  addedCount: number;
  passedCount: number;
  rightCount: number;
  wrongCount: number;
  date: Date;
}[];
const calcStatistic = async (data: ICalcStatisticInput) => {
  return await api.get<ICalcStatisticOutput>('/api/test-statistic', {
    params: {
      dictionaryId: data.dictionaryId,
      interval: data.interval,
    },
  });
};

export const TestStatisticService = {
  calcStatistic,
};
