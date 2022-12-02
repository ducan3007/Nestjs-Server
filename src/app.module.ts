import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { entities } from './entity'
import { APP_GUARD } from '@nestjs/core'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'

import { AuthenticationModule } from 'modules/auth/authentication.module'
import { AccountModule } from 'modules/account/account.module'
import { MailModule } from 'modules/mail/mail.module'
import { AppService } from './app.service'
import { PostModule } from './modules/post/post.module'

import env from 'common/env.config'
import { UserModule } from 'modules/users/user.module'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'

mongoose.set('returnOriginal', false)

@Module({
  imports: [
    // Env config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),

    // MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get(env.MONGO_USER)
        const password = configService.get(env.MONGO_PASSWORD)
        const host = configService.get(env.MONGO_HOST)
        const db = configService.get(env.MONGO_DB)
        return {
          uri: `mongodb+srv://${username}:${password}@${host}?retryWrites=false&w=majority`,
          dbName: db
        }
      }
    }),

    // PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(env.POSTGRES_HOST),
        port: configService.get(env.POSTGRES_PORT),
        username: configService.get(env.POSTGRES_USER),
        password: configService.get(env.POSTGRES_PASSWORD),
        database: configService.get(env.POSTGRES_DB),
        entities,
        synchronize: true
      })
    }),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   installSubscriptionHandlers: true,
    //   subscriptions: {
    //     'graphql-ws': true,
    //   },
    // }),

    // For Rate Limit
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5
    }),

    AccountModule,
    AuthenticationModule,
    MailModule,
    PostModule,
    UserModule
  ],
  providers: [
    AppService
    // Should be  disabled in Development
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // }
  ]
})
export class AppModule {}
