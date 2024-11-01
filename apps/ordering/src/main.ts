/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import process from 'process';
import fs from 'fs';
import { otelSDK } from "@spos/tracing";

async function bootstrap() {
  let oltpUrl = "http://localhost:4318/v1/traces";
  if (process.env.OTLP_URL) {
    oltpUrl = process.env.OTLP_URL;
  }
  otelSDK('ordering', oltpUrl).start();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ordering API')
    .setDescription('Ordering API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  SwaggerModule.setup('swagger', app, document);

  if (process.env.NODE_ENV === 'openapi') {
    // save openapi.json to disk
    fs.writeFileSync('libs/clients/ordering/openapi.json', JSON.stringify(document));
    process.exit(0);
  }

  const port = process.env.PORT || 3003;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
