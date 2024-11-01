import { useParams } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import { SSEProvider, useSSE } from 'react-hooks-sse';
import { TableSummary } from '@spos/services/common';
import CustomizedTableForTableBilling from '@spos/ui/common';

const Tables = () => {
  const state = useSSE('message', {} as [string, TableSummary]);
  console.log(state);
  if (Object.keys(state).length === 0) {
    return null;
  }
  return (
    Object.keys(state).length > 0 && (
      Object.keys(state).map((key) => {
        return (
          <Box>
            <Typography variant={'h2'}

              sx={{ padding: '10px', textAlign: 'center' }}
            >Table {key}</Typography>
            <CustomizedTableForTableBilling
            key={key}
            summary={state[key]}
          /></Box>
        );
      }
    )
  ))
}

export function PersonalBilling() {
  const { groupId, tableNumber, ownerId } = useParams<{
    groupId: string;
    tableNumber: string;
    ownerId: string;
  }>();

  return (
    <Box>
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
