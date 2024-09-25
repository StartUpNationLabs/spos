export interface TableCreateDto {
  number: number;
  customerCount: number;
}

export interface GroupCreateDto {
  tables: TableCreateDto[];
  offer: string;
}
