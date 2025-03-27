import { RepositoriesModule } from '@infrastructure/data/postgres/repositories.module';
import { AuthModule } from '@infrastructure/modules/auth';
import { DictionaryModule } from '@infrastructure/modules/dictionary';
import { DictionaryEntryModule } from '@infrastructure/modules/dictionary-entry';
import { TestModule } from '@infrastructure/modules/test';
import { TestStatisticModule } from '@infrastructure/modules/test-statistic';
import { TranslateModule } from '@infrastructure/modules/translate';
import { UserModule } from '@infrastructure/modules/user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    RepositoriesModule,
    AuthModule,
    DictionaryModule,
    UserModule,
    TranslateModule,
    DictionaryEntryModule,
    TestModule,
    TestStatisticModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
