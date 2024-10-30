import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

export function PersonalBilling() {
  const { groupId, tableNumber, ownerId } = useParams<{ groupId: string, tableNumber: string, ownerId: string }>();


  return (
    <Box>
      test
    </Box>
  );
}
