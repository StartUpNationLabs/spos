import { useQuery } from '@tanstack/react-query';
import { TableService, TYPES } from "@spos/services/common";
import { Grid2 as Grid, Typography } from '@mui/material';
import TableSquare from './tableSquare';
import * as React from 'react';
import { useContext } from 'react';
import { ContainerContext } from '../containerHook/containerContext'

export function FreeTables() {
  const container = useContext(ContainerContext);
  const {
    data: tables,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tables'],
    queryFn: async () => {
      const tableService = container.get<TableService>(TYPES.TableService);
      return tableService.getFreeTables();
    },
    refetchOnWindowFocus: 'always',
  });
  if (isLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (!tables || isError) {
    console.error(error);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }
  return (
    <Grid container spacing={4} justifyContent={'center'} alignItems={'center'}>
      {tables.map((value, index) => (
        <Grid key={index}>
          <TableSquare tableNumber={value.number}></TableSquare>
        </Grid>
      ))}
    </Grid>
  );
}
