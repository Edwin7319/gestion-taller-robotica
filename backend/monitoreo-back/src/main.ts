import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adaptador-redis/redis-io-adapter';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.use(express.static('publico'));
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
