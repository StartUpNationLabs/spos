
export const perf = (): MethodDecorator => {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now(); 

      const result = await originalMethod.apply(this, args);

      const endTime = Date.now();  
      const executionTime = endTime - startTime;

      console.log(
        `Performance: ${target.constructor.name}.${String(propertyKey)}`,
        `Execution time: ${executionTime}ms`
      );

      return result; 
    };

    return descriptor;
  };
};
