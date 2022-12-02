import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'

// import * as fs from 'fs'
// // const httpsOptions = {
// //   key: fs.readFileSync('./key.pem', 'utf8'),
// //   cert: fs.readFileSync('./server.crt', 'utf8')
// // }
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('api')

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS')
    .setDescription('NestJS API Docs')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/swagger', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  app.use(cookieParser())
  await app.listen(configService.get('PORT'))
}
bootstrap()
