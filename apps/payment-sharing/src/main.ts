/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import process from "process";
import fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('Payment Sharing API')
    .setDescription('Payment Sharing API')
    .setVersion('1.0')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();

  SwaggerModule.setup('swagger', app, document);
  // if args contain openapi, save openapi.json to disk
  if (process.env.NODE_ENV === 'openapi') {
    // save openapi.json to disk
    fs.writeFileSync('libs/clients/payment-sharing/openapi.json', JSON.stringify(document));
    process.exit(0);
  }

  const port = process.env.PORT || 3002;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
