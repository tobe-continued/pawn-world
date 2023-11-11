/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express"

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  const whitelist = [
    'https://frightened-wasp-pantsuit.cyclic.app',
    'https://api.continued.fr',
    'http://localhost:3000',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        Logger.log("allowed cors for:", origin)
        callback(null, true)
      } else {
        Logger.log("blocked cors for:", origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
