import { afterMethod, beforeMethod } from 'kaop-ts';

const startTimeSymbol = Symbol('startTime');

export const perf = [
  beforeMethod((meta: any) => {
    meta[startTimeSymbol] = Date.now();
  }),
  afterMethod((meta: any) => {
    const endTime = Date.now();
    const executionTime = endTime - meta[startTimeSymbol];
    
    console.log(
      `Performance: ${meta.target.constructor.name}.${meta.method.name}`,
      `Execution time: ${executionTime}ms`
    );
  })
];




