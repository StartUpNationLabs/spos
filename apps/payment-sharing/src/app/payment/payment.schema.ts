import { Schema } from "redis-om";

/* create a Schema for Person */
export const PaymentSchema = new Schema(
  'payment',
  {
    order_id: { type: 'string' , field: 'order_id'},
    owner_id: { type: 'string' , field: 'owner_id'},
    item_short_name: { type: 'string' , field: 'item_short_name'},
    amount: { type: 'number' , field: 'amount'},
  },
  {
    dataStructure: 'HASH',
  }
);


