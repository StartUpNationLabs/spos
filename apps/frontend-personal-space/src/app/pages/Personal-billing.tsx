import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { SSEProvider, useSSE } from 'react-hooks-sse';
import { TableBillingShell } from '@spos/ui/common';
import { useMutation } from '@tanstack/react-query';
import {
  Configuration,
  ItemRequestDto,
  PaymentsApi,
  SelectedByCustomerDTO,
} from '@spos/clients-payment-sharing';
import { TableItem } from '@spos/services/common';

interface TablesProps {
  groupId: string;
  ownerId: string;
}

const Tables = ({ groupId, ownerId }: TablesProps) => {
  const state = useSSE('message', {} as [SelectedByCustomerDTO]);

  const returnToCenterTableMutation = useMutation({
    mutationFn: (itemRequestDto: ItemRequestDto) => {
      console.log(itemRequestDto);
      return new PaymentsApi(
        new Configuration({
          basePath: import.meta.env.VITE_PAYMENT_SHARING_BASE_URL.replace(
            /\/*$/,
            ''
          ),
        })
      ).paymentControllerReturnItemToCenterTable({
        itemRequestDto,
      });
    },
  });

  const takeItemFromCenterTableMutation = useMutation({
    mutationFn: (itemRequestDto: ItemRequestDto) => {
      console.log(itemRequestDto);
      return new PaymentsApi().paymentControllerTakeItemFromCenterTable({
        itemRequestDto,
      });
    },
  });

  console.log(state);
  if (Object.keys(state).length === 0) {
    return null;
  }

  const countFunction = (tableItem: TableItem, tableNumber: number) => {
    const table = state[tableNumber];
    if (!table) {
      return 0;
    }
    const element = table.elements.find(
      (element) => element.item.name === tableItem.item.name
    );
    return element ? element.selectedByCustomer : 0;
  };

  return (
    Object.keys(state).length > 0 &&
    Object.keys(state).map((key) => {
      return (
        <Box key={key} sx={{ marginTop: '1dvh' }}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: '5vw',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
            gutterBottom
          >
            {'Table ' + key}
          </Typography>
          <TableBillingShell
            key={key}
            elements={state[key].elements}
            showRemoveButton={true}
            countFunction={(tableItem: TableItem) =>
              countFunction(tableItem, parseInt(key))
            }
            onIncrement={(itemId: string) => {
              takeItemFromCenterTableMutation.mutate({
                group_id: groupId,
                owner_id: ownerId,
                item_short_name: itemId,
                amount: countFunction(itemId, parseInt(key)),
                table_id: key,
              });
            }}
            onDecrement={(itemId: string) => {
              returnToCenterTableMutation.mutate({
                group_id: groupId,
                owner_id: ownerId,
                item_short_name: itemId,
                amount: 1,
                table_id: key,
              });
            }}
            onRemove={(tableItem: TableItem) => {
              returnToCenterTableMutation.mutate({
                group_id: groupId,
                owner_id: ownerId,
                table_id: key,
                amount: countFunction(tableItem, parseInt(key)),
                item_short_name: tableItem.item.name,
              });
            }}
          />
        </Box>
      );
    })
  );
};

export function PersonalBilling() {
  const { groupId, tableNumber, ownerId } = useParams<{
    groupId: string;
    tableNumber: string;
    ownerId: string;
  }>();

  return (
    <Box
      sx={{
        backgroundColor: '#d9d9d9',
        margin: '0',
        padding: '5dvw',
        minHeight: '100dvh',
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{ fontSize: '8vw', fontWeight: 'bold', textAlign: 'center' }}
      >
        Billing
      </Typography>

      <SSEProvider
        endpoint={
          'http://localhost:3002/api/payments/sse/customer-items/' +
          groupId +
          '/' +
          ownerId
        }
      >
        <Tables groupId={groupId ?? ''} ownerId={ownerId ?? ''} />
      </SSEProvider>
    </Box>
  );
}
