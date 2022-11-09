import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);

   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
         transform: true,
      }),
   );

   await app.listen(configService.get('PORT'));
}
bootstrap();
