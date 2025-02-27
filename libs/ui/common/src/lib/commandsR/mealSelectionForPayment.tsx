import React, { useEffect } from 'react';
import Footer from '../utils/mealSelectionForPaymentFooter';
import BackButton from '../utils/backButton';
import { useSSE, SSEProvider } from 'react-hooks-sse';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Divider, Grid } from '@mui/material';
import { Configuration, PaymentResponseTableDTO } from "@spos/clients-payment-sharing";
import { Item } from './Item';
import { ContainerContext } from '../containerHook/containerContext';
import { useQuery } from '@tanstack/react-query';
import { CatalogueService, TYPES } from '@spos/services/common';
import { useTableStore } from '../dining/stores/tableSelectionStore';
import OtherTable from './otherTables';
import useCarts from './stores/cart';
import { RemoteGroupApi } from "@spos/clients-bff";
import {Configuration as ConfigurationGroup} from '@spos/clients-bff';
import { GroupClosedListener } from "../utils/GroupClosedListener";

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
  const { tableNumber } = useParams<{
    tableNumber: string;
  }>();
  const { data: groupId } = useQuery({
    queryKey: ['group', tableNumber],
    queryFn: async () => {
      const api = new RemoteGroupApi(
        new ConfigurationGroup({ basePath: import.meta.env.VITE_BFF_BASE_URL })
      );

      return (
        await api.remoteGroupControllerGetGroupFromTableNumber({
          tableNumber: tableNumber || '',
        })
      ).data.id;
    },
  });
  console.log('Group ID:', groupId);
  if (!tableNumber) {
    throw new Error('Table number is required');
  }
  if (!groupId) {
    return <CircularProgress />;
  }
  function handleSelectWhoPays() {
    console.log('Select who pays button clicked');
    navigate(`/payementAsignee/${groupId}/${tableNumber}`);
  }

  function handleGroupClick() {
    console.log('Group button clicked');
    navigate(`/diningRoomTables/${groupId}/${tableNumber}`);
    //navigate(`/diningRoomTables/`);

  }

  function handleBackButtonClick(): void {
    console.log('Back button clicked');
  }

  return (
    <SSEProvider endpoint={`${import.meta.env.VITE_PAYMENT_SHARING_BASE_URL}/api/payments/sse/table-items/${groupId}`}>
      <MealSelectionContent
        onSelectWhoPays={handleSelectWhoPays}
        onGroupClick={handleGroupClick}
        onBackButtonClick={handleBackButtonClick}
        tableNumber={parseInt(tableNumber ?? '0', 10)}
      />
      <GroupClosedListener/>
    </SSEProvider>
  );
}

function MealSelectionContent({
  onSelectWhoPays,
  onGroupClick,
  onBackButtonClick,
  tableNumber,
}: MealSelectionContentProps) {
  const tableItems = useSSE<PaymentResponseTableDTO[]>('message', []);
  const container = React.useContext(ContainerContext);
  const selectedTables = useTableStore((state) => state.selectedTables);
  const removeTable = useTableStore((state) => state.removeTable);
  const currentTableCart = useCarts((state) => state.carts)[tableNumber] || [];
  const updateItem = useCarts((state) => state.updateItem);

  React.useEffect(() => {
    console.log("Selected Tables:", selectedTables ? Array.from(selectedTables) : []);
  }, [selectedTables]);
  const currentTable = tableItems.find((table) => table.number === tableNumber);
  const otherTables = tableItems.filter(
    (table) => Array.from(selectedTables).includes(table.number) && table.number !== tableNumber
  );


  const itemIds = React.useMemo(() => {
    const currentTableItems = currentTable ? currentTable.elements.map((element) => element.item.id) : [];
    const otherTableItems = otherTables.flatMap((table) => table.elements.map((element) => element.item.id));
    return Array.from(new Set([...currentTableItems, ...otherTableItems]));
  }, [currentTable, otherTables]);



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
  function handleSelectItem(itemId: string, shortName: string) {
    if (currentTableCart.find((element) => element.shortName === shortName) !== undefined) {
      updateItem(tableNumber, itemId, shortName, 0); // Remove item
    } else {
      updateItem(tableNumber, itemId, shortName, 1); // Add item
    }
  }

  function handleClose(tableItems: PaymentResponseTableDTO[], updateItem: (tableNumber: number, itemId: string, shortName: string, quantity: number) => void): void {
    console.log('Close button clicked');
    for (const key in tableItems) {
      const table = tableItems[key]
      tableNumber = table.number
      const elements = table.elements
      for (const elemKey in elements){
        const element = elements[elemKey]
        updateItem(tableNumber, element.item.id, element.item.name, 0)
      }
    }
  }

  return (
    <Box sx={{ pb: 10 }}>
      <BackButton onClick={onBackButtonClick} />
      <Box sx={{ mt: 15, px: 3,
                  maxHeight: '1150px',
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
                        handleSelectItem={() =>handleSelectItem(element.item.id, element.item.name)}
                        remaining={element.remaining}
                        onTable={element.onTable}
                        isSelected={isSelected}
                      />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
        {otherTables.map((table) => (
          <OtherTable key={table.number} table={table} catalog={catalog ?? []} handleSelectItem={handleSelectItem} handleRemoveTable={removeTable}/>
        ))}
      </Box>
      <Footer onClose={() => handleClose(tableItems, updateItem)}  onSelectWhoPays={onSelectWhoPays} onGroupClick={onGroupClick} />
    </Box>
  );
}

export default MealSelectionForPayment;
