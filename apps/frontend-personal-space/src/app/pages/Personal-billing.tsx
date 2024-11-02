import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { SSEProvider, useSSE } from 'react-hooks-sse';
import { KitchenService, MonsieurAxelMenvoie, TableSummary, TYPES } from '@spos/services/common';
import CustomizedTableForTableBilling, { GroupBillingSectionPage } from '@spos/ui/common';
import { useMutation } from '@tanstack/react-query';
import { ItemRequestDto, PaymentsApi } from '@spos/clients-payment-sharing';

const Tables = () => {
  const state = useSSE('message', {} as [string, TableSummary]);

  const mutation = useMutation({
    mutationFn: (itemRequestDto: ItemRequestDto) => {
      console.log(itemRequestDto);
      return new PaymentsApi().paymentControllerReturnItemToCenterTable({
        itemRequestDto,
      });
    }
  });

  console.log(state);
  if (Object.keys(state).length === 0) {
    return null;
  }

  return (
    Object.keys(state).length > 0 &&
    Object.keys(state).map((key) => {
      return (
        <Box key={key} sx={{marginTop: "1dvh"}}>
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
          <CustomizedTableForTableBilling
            key={key}
            summary={state[key]}
            showRemoveButton={true}
            onRemoveItem={(itemId: string) => {
              mutation.mutate({
                tableNumber: key,
                itemId: itemId,
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
    <Box sx={{backgroundColor: '#d9d9d9', margin: "0", padding: "5dvw", minHeight: "100dvh"}}>
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
        <Tables />
      </SSEProvider>
    </Box>
  );
}
