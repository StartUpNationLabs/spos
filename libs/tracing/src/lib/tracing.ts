import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
// Don't forget to import the dotenv package!
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { RedisInstrumentation } from '@opentelemetry/instrumentation-redis-4';

export const otelSDK = (serviceName: string, oltpUrl: string) => {
  console.log('Starting tracing for service:', serviceName);
  console.log('OTLP URL:', oltpUrl);
  const sdk = new NodeSDK({
    resource: new Resource({
      'service.name': serviceName,
    }),
    traceExporter: new OTLPTraceExporter({
      // optional - default url is http://localhost:4318/v1/traces
      url: oltpUrl,
      // optional - collection of custom headers to be sent with each request, empty by default
      headers: {},
    }),
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new NestInstrumentation(),
      new RedisInstrumentation({

      }),
    ],
  });

  // // gracefully shut down the SDK on process exit
  // process.on('SIGTERM', () => {
  //   sdk
  //     .shutdown()
  //     .then(
  //       () => console.log('SDK shut down successfully'),
  //       (err) => console.log('Error shutting down SDK', err)
  //     )
  //     .finally(() => process.exit(0));
  // });
  return sdk;
};
