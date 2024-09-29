import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableSummary } from '@spos/services/common';
import NumberInput from '../tables/nbPeopleSelector';
import useTableBillingStore from './stores/paymentStore';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


interface CustomizedTablesForTableBillingProps {
    summary: TableSummary,
}
export default function CustomizedTableForTableBilling(props: CustomizedTablesForTableBillingProps) {
    const { elementToBePaid, updateItem } = useTableBillingStore(state => state);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" width="25%">Quantity Selected</StyledTableCell>
                        <StyledTableCell align="center" width="25%">Quantity Remaining</StyledTableCell>
                        <StyledTableCell align="center" width="25%">name</StyledTableCell>
                        <StyledTableCell align="center" width="25%">Price&nbsp;($)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.summary.elements.map((element) => {

                        const count: number = (elementToBePaid[props.summary.number] ?? []).find(tableItem => tableItem.itemId === element.item.id)?.quantityPaid ?? 0;
                        return (
                            <StyledTableRow key={element.item.id}>
                                <StyledTableCell component="th" scope="row" width="25%">
                                    <NumberInput
                                        min={0}
                                        max={99}
                                        value={count}
                                        onChange={(e, value) => {
                                            updateItem(props.summary.number, element.item.id, value as number, element.item.price)
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center" width="25%">{element.remaining}</StyledTableCell>
                                <StyledTableCell align="center" width="25%">{element.item.name}</StyledTableCell>
                                <StyledTableCell align="center" width="25%">{element.item.price * count}</StyledTableCell>
                            </StyledTableRow>
                        )
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
