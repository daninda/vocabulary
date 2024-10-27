import { ITranslateService } from '@application/services/translate.interface';
import { TranslateController } from '@infrastructure/controllers/translate';
import { TranslateService } from '@infrastructure/services/translate';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TranslateUseCase } from '@usecases/translate/translate.usecase';

@Module({
  imports: [ConfigModule],
  controllers: [TranslateController],
  providers: [
    TranslateUseCase,
    { provide: ITranslateService, useClass: TranslateService },
  ],
})
export class TranslateModule {}
