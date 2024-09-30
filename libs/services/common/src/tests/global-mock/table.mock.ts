import { Table } from '../../lib/group/groupService';

const TABLE_NUMBER = 12;

const TABLE_MOCKS = [] as Table[];

const CUSTOMER_COUNT_TABLE = [
  3, 5, 1, 16, 7
]

for (let i = 0; i < TABLE_NUMBER; i++) {
  const index = Math.floor(Math.random() * CUSTOMER_COUNT_TABLE.length);
  TABLE_MOCKS.push(
    {
      id : i + "",
      number : i,
      customerCount : CUSTOMER_COUNT_TABLE[index]
    }
  );
}

export { TABLE_MOCKS, TABLE_NUMBER, CUSTOMER_COUNT_TABLE };
