/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { bffContainer, container, TYPES } from "@spos/services/common";
import { Configuration as DiningConfiguration } from '@spos/clients-dining';
import { Configuration as KitchenConfiguration } from '@spos/clients-kitchen';
import { Configuration as MenuConfiguration } from '@spos/clients-menu';
import * as process from 'process';
import { otelSDK } from "@spos/tracing";
import { Configuration as OrderingConfiguration } from "@spos/clients-ordering";

async function bootstrap() {
  let oltpUrl = "http://localhost:4318/v1/traces";
  if (process.env.OTLP_URL) {
    oltpUrl = process.env.OTLP_URL;
  }
  otelSDK('bff', oltpUrl).start();
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('BFF API')
    .setDescription('Backend For Frontend API')
    .setVersion('1.0')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();

  SwaggerModule.setup('swagger', app, document);
  // if args contain openapi, save openapi.json to disk
  if (process.env.NODE_ENV === 'openapi') {
    // save openapi.json to disk
    fs.writeFileSync('libs/clients/bff/openapi.json', JSON.stringify(document));
    process.exit(0);
  }

  container
    .bind<DiningConfiguration>(TYPES.DiningApiConfiguration)
    .toConstantValue(
      new DiningConfiguration({
        basePath: process.env.DINING_BASE_URL.replace(/\/*$/, ""),
      })
    );
  container
    .bind<KitchenConfiguration>(TYPES.KitchenApiConfiguration)
    .toConstantValue(
      new KitchenConfiguration({
        basePath: process.env.KITCHEN_BASE_URL.replace(/\/*$/, ""),
      })
    );
  container
    .bind<MenuConfiguration>(TYPES.MenuApiConfiguration)
    .toConstantValue(
    new MenuConfiguration({
      basePath: process.env.MENU_BASE_URL.replace(/\/*$/, ""),
    })
  );
  container
    .bind<MenuConfiguration>(TYPES.OrderingApiConfiguration)
    .toConstantValue(
      new OrderingConfiguration({
        basePath: process.env.ORDERING_BASE_URL.replace(/\/*$/, ""),
      })
    );

  const port = process.env.PORT || 3000;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
