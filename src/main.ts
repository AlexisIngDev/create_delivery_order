import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ENVS } from './CONFIG/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  await app.listen(ENVS.PORT);
  logger.log(`Application is running on: ${ENVS.PORT}`);
}
bootstrap();
