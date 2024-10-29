import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { ContainerContext } from '../containerHook/containerContext';
import { useQuery } from '@tanstack/react-query';
import { DiningApiService, TYPES } from '@spos/services/common';
import { OrdersRow } from './preparationRow';

export function OrdersTable() {
  const container = React.useContext(ContainerContext);

  const {
    data: allTableOrders,
    isLoading: isAllTableOrdersLoading,
    isError: isAllTableOrderError,
    error: errorAllTableOrders,
  } = useQuery({
    queryKey: ['allTableOrders'],
    queryFn: async () => {
      const diningApiService: DiningApiService =
        container.get<DiningApiService>(TYPES.DiningApiService);
      return diningApiService
        .getTableOrdersApi()
        .tableOrdersControllerListAllTableOrders();
    },
    refetchOnWindowFocus: 'always',
    staleTime: 5000,
  });

  if (isAllTableOrdersLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (isAllTableOrderError) {
    console.error(errorAllTableOrders);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Table Number</TableCell>
            <TableCell align="right">customersCount</TableCell>
            <TableCell align="right">opened</TableCell>
            <TableCell align="right">billed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allTableOrders?.data
            .filter((tableOrder) => {
              if (tableOrder.billed === null) {
                return true;
              }
              return false;
            })
            .map((tableOrder) => (
              <OrdersRow
                key={tableOrder._id}
                tableOrder={tableOrder}
              ></OrdersRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrdersTable;
