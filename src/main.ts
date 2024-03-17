import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import config from './config';

let port: number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');
  port = config.port;
  await app.listen(port);
}

bootstrap().then(() => {
  console.info(`
      ------------
      Internal Application Started!
      API: http://localhost:${port}/
      API Docs: http://localhost:${port}/docs
      ------------
`);
});
