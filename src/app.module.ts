import { AuthModule } from '@infrastructure/modules/auth';
import { DictionaryModule } from '@infrastructure/modules/dictionary';
import { TranslateModule } from '@infrastructure/modules/translate';
import { UserModule } from '@infrastructure/modules/user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from '@postgres/repositories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    RepositoriesModule,
    AuthModule,
    DictionaryModule,
    UserModule,
    TranslateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
