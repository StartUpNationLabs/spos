import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ContainerContext } from '../containerHook/containerContext';
import { useQuery } from '@tanstack/react-query';
import { KitchenApiService, TYPES } from '@spos/services/common';
import { PreparedItemDto } from '@spos/clients-dining';

export function PreparedItem(props: { preparedItem: PreparedItemDto }) {
  const container = React.useContext(ContainerContext);

  const {
    data: preparedItemsDetails,
    isLoading: preparedItemsDetailsLoading,
    isError: preparedItemsDetailsError,
    error: errorPreparedItemsDetails,
  } = useQuery({
    queryKey: ['preparedItemsDetails', props.preparedItem._id],
    queryFn: async () => {
      const kitchenApiService: KitchenApiService =
        container.get<KitchenApiService>(TYPES.KitchenApiService);
      return kitchenApiService
        .getPreparedItemsApi()
        .preparedItemsControllerRetrievePreparedItem({
          preparedItemId: props.preparedItem._id,
        });
    },
    refetchOnWindowFocus: 'always',
  });
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell component="th" scope="row">
        {props.preparedItem._id}
      </TableCell>
      <TableCell align="right">{props.preparedItem.shortName}</TableCell>
      <TableCell align="right">
        {preparedItemsDetails?.data.startedAt}
      </TableCell>
      <TableCell align="right">
        {preparedItemsDetails?.data.finishedAt}
      </TableCell>
    </TableRow>
  );
}
