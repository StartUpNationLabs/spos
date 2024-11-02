import React from 'react';
import Footer from '../utils/mealSelectionForPaymentFooter';
import BackButton from '../utils/backButton';
import { CatalogDisplay } from './catalogDisplay';
import { useSSE, SSEProvider } from 'react-hooks-sse';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { parse } from 'path';

interface MealSelectionContentProps {
  onClose: () => void;
  onSelectWhoPays: () => void;
  onGroupClick: () => void;
  onBackButtonClick: () => void;
  tableNumber: number;
}
interface TableItem {
  number: number;
  elements: {
    item: {
      name: string;
      price: number;
    };
    remaining: number;
    onTable: number;
  }[];
}

export function MealSelectionForPayment() {
  const { groupId, tableNumber } = useParams<{
    groupId: string;
    tableNumber: string;
  }>();

  function handleClose() {
    console.log('Close button clicked');
  }

  function handleSelectWhoPays() {
    console.log('Select who pays button clicked');
  }

  function handleGroupClick() {
    console.log('Group button clicked');
  }

  function handleBackButtonClick(): void {
    console.log('Back button clicked');
  }

  return (
    <SSEProvider endpoint={`http://localhost:3002/api/payments/sse/table-items/${groupId}`}>
      <MealSelectionContent
        onClose={handleClose}
        onSelectWhoPays={handleSelectWhoPays}
        onGroupClick={handleGroupClick}
        onBackButtonClick={handleBackButtonClick}
        tableNumber={parseInt(tableNumber ?? '0', 10)}
      />
    </SSEProvider>
  );
}


function MealSelectionContent({ onClose, onSelectWhoPays, onGroupClick, onBackButtonClick,tableNumber }: MealSelectionContentProps) {
 

  const tableItems = useSSE<TableItem[]>('message', []);

  if (!tableItems || tableItems.length === 0) {
    return <p>Loading for elements in this table...</p>;
  }
  const currentTable = tableItems.find(table => table.number === tableNumber);

  if (!currentTable) {
    return <p>No element disponible for this table.</p>;
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <BackButton onClick={onBackButtonClick} />
      <Box sx={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Typography variant="h6">Table {currentTable.number}</Typography>
        {currentTable.elements.length > 0 ? (
          currentTable.elements.map((element, elementIndex) => (
            <Box key={elementIndex} sx={{ marginLeft: '15px', padding: '5px' }}>
              <Typography variant="body1">Nom: {element.item.name}</Typography>
              <Typography variant="body1">Prix: {element.item.price} €</Typography>
              <Typography variant="body1">Quantité restante: {element.remaining}</Typography>
              <Typography variant="body1">Sur la table: {element.onTable}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">Aucun élément disponible</Typography>
        )}
      </Box>
      <Footer onClose={onClose} onSelectWhoPays={onSelectWhoPays} onGroupClick={onGroupClick} />
    </div>
  );
}

export default MealSelectionForPayment;
