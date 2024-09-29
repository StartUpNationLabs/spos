import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableItem } from '@spos/services/common';
import NumberInput from '../tables/nbPeopleSelector';

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


interface CustomizedTablesForGroupBillingProps {
    items: TableItem[],
}
export default function CustomizedTableForGroupBilling(props: CustomizedTablesForGroupBillingProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" width="25%">Quantity Remaining</StyledTableCell>
                        <StyledTableCell align="center" width="25%">name</StyledTableCell>
                        <StyledTableCell align="center" width="25%">Price&nbsp;($)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.items.map((item) => {
                        return (
                            <StyledTableRow key={item.item.id}>
                                <StyledTableCell align="center" width="25%">{item.remaining}</StyledTableCell>
                                <StyledTableCell align="center" width="25%">{item.item.name}</StyledTableCell>
                                <StyledTableCell align="center" width="25%">{item.item.price * item.remaining}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
