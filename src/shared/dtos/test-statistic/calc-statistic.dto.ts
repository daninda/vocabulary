import { IsEnum, IsOptional, IsString } from 'class-validator';

import { TestStatisticPointDto } from './test-statistic-point.dto';

export class CalcStatisticInput {
  @IsOptional()
  @IsString()
  dictionaryId?: string;

  @IsOptional()
  @IsEnum([
    'day',
    'week',
    'month',
    'alphabet_desc',
    'rating_asc',
    'rating_desc',
  ])
  interval?: string;
}

export type CalcStatisticOutput = TestStatisticPointDto[];
