import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { RatingDownDictionaryEntryUsecase } from '@usecases/dictionary-entry/rating-down.usecase'
import { RatingUpDictionaryEntryUsecase } from '@usecases/dictionary-entry/rating-up.usecase'

@Injectable()
export class RatingUpdateSchedule {
  constructor(private readonly ratingDownUseCase: RatingDownDictionaryEntryUsecase, private readonly ratingUpUseCase: RatingUpDictionaryEntryUsecase) {}
}
