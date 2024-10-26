import { Schema } from "redis-om";

/* create a Schema for Person */
export const PaymentSchema = new Schema(
  'payment',
  {
    order_id: { type: 'string', required: true },
    owner_id: { type: 'string', required: true },
    item_short_name: { type: 'string', required: true },
    amount: { type: 'number', required: true },
  },
  {
    dataStructure: 'HASH',
  }
);


