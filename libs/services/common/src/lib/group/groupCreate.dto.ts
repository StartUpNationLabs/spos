export interface GroupCreateDto {
  tables: {
    [tableNumber: string]: {
      number: number;
      customerCount: number;
    };
  };
  offer: string;
}
