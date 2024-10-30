import { TableSummary } from '@spos/services/common';
import { Box, Typography } from '@mui/material';
import CustomizedTableForGroupBilling from './customizedTableForGroupBilling';

interface GroupBillingSectionPageProps {
  table: TableSummary
  index: number;
  showRemoveButton?: boolean;
  onRemoveItem?: (itemId: string) => void;
}

export function GroupBillingSectionPage(props: GroupBillingSectionPageProps) {
  return (
    <Box
      key={props.index}
      sx={{ margin: '2vh 0', backgroundColor: '#d9d9d9' }}
    >

      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: '5vw',
          fontWeight: 'bold',
          textDecoration: 'underline',
        }}
      >
        {'Table ' + props.table.number}
      </Typography>
      <Box sx={{ padding: '2vh 0' }}>
        {props.table.elements !== undefined && props.table.elements.length > 0 ? (
          <CustomizedTableForGroupBilling items={props.table.elements} showRemoveButton={props.showRemoveButton} onRemoveItem={props.onRemoveItem}/>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
}
