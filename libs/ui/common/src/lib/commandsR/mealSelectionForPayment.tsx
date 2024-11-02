import React from 'react';
import Footer from '../utils/mealSelectionForPaymentFooter';
import BackButton from '../utils/backButton';
import { useSSE, SSEProvider } from 'react-hooks-sse';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Divider, Grid } from '@mui/material';
import { PaymentResponseTableDTO } from '@spos/clients-payment-sharing';
import { Item } from './Item';
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
  const navigate = useNavigate();
  const { groupId, tableNumber } = useParams<{ 
    groupId: string; 
    tableNumber: string;
  }>();

  function handleClose() {
    console.log('Close button clicked');
  }

  function handleSelectWhoPays() {
    console.log('Select who pays button clicked');
    //navigate(`/diningRoomTables/${tableNumber}`);
    navigate(`/payementAsignee/`);

  }

  function handleGroupClick() {
    console.log('Group button clicked');
    navigate(`/diningRoomTables/`);

  }

  function handleBackButtonClick(): void {
    console.log('Back button clicked');
  }

  return (
    <SSEProvider endpoint={`${import.meta.env.VITE_PAYMENT_SHARING_BASE_URL}/api/payments/sse/table-items/${groupId}`}>
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
      const catalogService: CatalogueService = container.get<CatalogueService>(TYPES.CatalogueService);
      return catalogService.getFullItemFromItemIdsArray(itemIds);
    },
    enabled: itemIds.length > 0,
    refetchOnWindowFocus: 'always',
  });

  if (!tableItems || tableItems.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentTable) {
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>No items available for this table.</Typography>;
  }

  return (
    <Box sx={{ pb: 10 }}>
      <BackButton onClick={onBackButtonClick} />
      <Box sx={{ mt: 15, px: 3, 
                  maxHeight: '600px', 
                  overflowY: 'auto', }}>
        <Typography variant="h3" color="primary" sx={{ mb: 2, textAlign: 'center' }}>
          My table (Nb {currentTable.number})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {isLoadingCatalog ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              borderRadius: 2,
              p: 3,
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              mb: 3,
            }}
          >
            <Grid container spacing={2}>
              {currentTable.elements.map((element, index) => {
                const catalogItem = catalog?.find((item) => item._id === element.item.id);
                const isSelected = itemIds.includes(element.item.id);

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  
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
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Box>
      <Footer onClose={onClose} onSelectWhoPays={onSelectWhoPays} onGroupClick={onGroupClick} />
    </Box>
  );
}

export default MealSelectionForPayment;
