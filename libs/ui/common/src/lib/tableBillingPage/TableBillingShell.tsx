import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import * as React from 'react';
import { TableItem } from '@spos/services/common';
import { BaseTableBillingRow } from './BaseTableBillingRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface TableBillingShellProps {
  elements: TableItem[];
  countFunction: (item: TableItem) => number;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  showRemoveButton?: boolean;
  onRemove?: (tableItem: TableItem) => void;
}

export function TableBillingShell({
  elements,
  countFunction,
  onIncrement,
  onDecrement,
  showRemoveButton,
  onRemove,
}: TableBillingShellProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" width={showRemoveButton ? '20%' : "25%"}>
              Quantity Selected
            </StyledTableCell>
            <StyledTableCell align="center" width={showRemoveButton ? '20%' : "25%"}>
              Quantity Remaining
            </StyledTableCell>
            <StyledTableCell align="center" width={showRemoveButton ? '20%' : "25%"}>
              name
            </StyledTableCell>
            <StyledTableCell align="center" width={showRemoveButton ? '20%' : "25%"}>
              Price&nbsp;($)
            </StyledTableCell>
            {showRemoveButton && (
              <StyledTableCell align="center" width="20%">
                Actions
              </StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {elements.map((element) => (
            <BaseTableBillingRow
              key={element.item.id}
              element={element}
              count={countFunction(element)}
              max={element.remaining}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              showRemoveButton={showRemoveButton}
              onRemove={onRemove}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
