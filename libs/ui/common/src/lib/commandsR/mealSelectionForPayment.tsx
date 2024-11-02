import React from 'react';
import Footer from '../utils/mealSelectionForPaymentFooter';
import BackButton from '../utils/backButton';
import { CatalogDisplay } from './catalogDisplay';
import { useSSE, SSEProvider } from 'react-hooks-sse';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { parse } from 'path';
import { PaymentResponseTableDTO } from '@spos/clients-payment-sharing';
import { Item } from './Item';
import { useContext } from 'react';
import { ContainerContext } from '../containerHook/containerContext';
import { useQuery } from '@tanstack/react-query';
import { CatalogueService, TYPES } from '@spos/services/common';

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

function MealSelectionContent({
  onClose,
  onSelectWhoPays,
  onGroupClick,
  onBackButtonClick,
  tableNumber,
}: MealSelectionContentProps) {
  const tableItems = useSSE<PaymentResponseTableDTO[]>('message', []);

  const container = React.useContext(ContainerContext);

  const currentTable = tableItems.find((table) => table.number === tableNumber);
  const itemIds = currentTable ? currentTable.elements.map((element) => element.item.id) : [];

  const { data: catalog, isLoading: isLoadingCatalog } = useQuery({
    queryKey: ['catalogMealSelectionForPayments', itemIds],
    queryFn: async () => {
      const catalogService: CatalogueService = container.get<CatalogueService>(
        TYPES.CatalogueService
      );
      return catalogService.getFullItemFromItemIdsArray(itemIds);
    },
    enabled: itemIds.length > 0,
    refetchOnWindowFocus: 'always',
  });

  if (!tableItems || tableItems.length === 0) {
    return <p>Loading for elements in this table...</p>;
  }

  if (!currentTable) {
    return <p>No element available for this table.</p>;
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <BackButton onClick={onBackButtonClick} />
      <Box sx={{ marginTop: '120px', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Typography variant="h6">My Table (Number {currentTable.number})</Typography>
        {isLoadingCatalog ? (
          <p>Chargement du catalogue...</p>
        ) : (
          currentTable.elements.map((element, elementIndex) => {
            const catalogItem = catalog?.find((item) => item._id === element.item.id);
            const isSelected = itemIds.includes(element.item.id);

            return (
              <Box key={elementIndex} sx={{ marginTop: '20px', marginLeft: '15px', padding: '5px' }}>
                <Typography variant="body1">Nom: {element.item.name}</Typography>
                <Typography variant="body1">Prix: {element.item.price} €</Typography>
                <Typography variant="body1">Quantité restante: {element.remaining}</Typography>
                <Typography variant="body1">Sur la table: {element.onTable}</Typography>
                <Item
                  item={{
                    _id: element.item.id,
                    fullName: element.item.name,
                    shortName: element.item.name,
                    category: catalogItem?.category || 'default',
                    image: catalogItem?.image || '',
                    price: element.item.price,
                  }}
                  tableNumber={tableNumber}
                  handleSelectItem={() => console.log('Item selected')}
                  remaining={element.remaining}
                  isSelected={isSelected}
                />
              </Box>
            );
          })
        )}
      </Box>
      <Footer onClose={onClose} onSelectWhoPays={onSelectWhoPays} onGroupClick={onGroupClick} />
    </div>
  );
}


export default MealSelectionForPayment;
