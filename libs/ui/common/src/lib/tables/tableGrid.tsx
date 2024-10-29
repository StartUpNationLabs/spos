import { Box, Grid2 as Grid, Typography } from '@mui/material';
import * as React from 'react';
import { FreeTables } from './freeTables';
import { GroupTables } from './groupTables';

export function TableGrid() {
  return (
    <Grid
      container
      spacing={4}
      justifyContent={'center'}
      alignItems={'center'}
      marginTop="60px"
      maxHeight="60vh"
      overflow="auto"
      maxWidth={800}
    >
      <Grid width={'100%'}>
        <Box width={'100%'}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Reserved Tables
          </Typography>
        </Box>
        <GroupTables />
      </Grid>
      <Grid width={'100%'}>
        <Box width={'100%'}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Free Tables
          </Typography>
        </Box>
        <FreeTables />
      </Grid>
    </Grid>
  );
}
