import { afterMethod } from 'kaop-ts';

export const logger = afterMethod((meta) => {
  // log the class name, method name and arguments passed to the method
  console.log(
    `Method: ${meta.method.name}',
     'Class: ${meta.target.constructor.name}',
     'Arguments: ${meta.args}`,
  );
});
