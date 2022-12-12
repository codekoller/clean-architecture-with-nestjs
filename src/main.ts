import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './infra/common/filters/exception.filter';
import { LoggerService } from './infra/logger/logger.service';
import { LoggingInterceptor } from './infra/common/interceptors/logger.interceptor';
import { ResponseInterceptor } from './infra/common/interceptors/response.interceptor';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes unnecessary properties in POST request body,
      transform: true,
    }),
  );

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // base routing
  app.setGlobalPrefix('/api');
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('port');
  await app.listen(port, () => logger.log(`Server listening at ${port}`));
}
bootstrap();
