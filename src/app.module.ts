import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import env from 'common/env.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get(env.MONGO_USER);
        const password = configService.get(env.MONGO_PASSWORD);
        const host = configService.get(env.MONGO_HOST);
        const db = configService.get(env.MONGO_DB);

        return {
          uri: `mongodb+srv://${username}:${password}@${host}?retryWrites=false&w=majority`,
          dbName: db,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
