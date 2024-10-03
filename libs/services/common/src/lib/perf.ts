import { beforeMethod, afterMethod } from 'kaop-ts';



export const perf = (): MethodDecorator => {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const startTimeSymbol = Symbol('startTime');

    beforeMethod((meta: any) => {
      meta[startTimeSymbol] = Date.now();
      console.log(meta[startTimeSymbol]);
    })(target, propertyKey as string, descriptor);

    afterMethod((meta: any) => {
      const endTime = Date.now();
      console.log(endTime);

      const executionTime = endTime - meta[startTimeSymbol];

      console.log(
        `Performance: ${meta.target.constructor.name}.${meta.method.name}`,
        `Execution time: ${executionTime}ms`
      );
    })(target, propertyKey as string, descriptor);

    return descriptor;
  };
};