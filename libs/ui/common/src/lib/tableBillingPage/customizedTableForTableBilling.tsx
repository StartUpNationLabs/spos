import * as React from 'react';
import { TableItem, TableSummary } from '@spos/services/common';
import useTableBillingStore from './stores/paymentStore';
import { TableBillingShell } from './TableBillingShell';

interface CustomizedTablesForTableBillingProps {
  summary: TableSummary;
}

export default function CustomizedTableForTableBilling({
  summary,
}: CustomizedTablesForTableBillingProps) {
  const { elementToBePaid, updateItem } = useTableBillingStore(
    (state) => state
  );

  const countFunction = (tableItem: TableItem): number => {
    const tableItems = elementToBePaid[summary.number] || [];
    const item = tableItems.find((item) => item.itemId === tableItem.item.id);
    return item ? item.quantityPaid : 0;
  };

  const updateItemCount = (itemId: string, increment: boolean) => {
    const tableItem = summary.elements.find((element) => element.item.id === itemId);
    if (!tableItem) return;

    const newCount = countFunction(tableItem) + (increment ? 1 : -1);
    updateItem(summary.number, tableItem.item.id, newCount, tableItem.item.price);
  };

  return (
    <TableBillingShell
      elements={summary.elements}
      countFunction={countFunction}
      onIncrement={(itemId) => updateItemCount(itemId, true)}
      onDecrement={(itemId) => updateItemCount(itemId, false)}
    />
  );
}
