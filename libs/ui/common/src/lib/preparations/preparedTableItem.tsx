import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PreparedItemDto } from '@spos/clients-dining';
import { PreparedItem } from './preparedItems';

export function PreparedTableItem(props: { preparedItems: PreparedItemDto[] }) {
  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell align="right">short name</TableCell>
          <TableCell align="right">started at</TableCell>
          <TableCell align="right">finished at</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.preparedItems.map((preparedItem) => (
          <PreparedItem
            key={preparedItem._id}
            preparedItem={preparedItem}
          ></PreparedItem>
        ))}
      </TableBody>
    </Table>
  );
}
