import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/api');
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');
  await app.listen(port, () => logger.log(`Server listening at ${port}`));
}
bootstrap();
