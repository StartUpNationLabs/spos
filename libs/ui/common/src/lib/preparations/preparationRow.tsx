import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ContainerContext } from "../containerHook/containerContext";
import { useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import { DiningApiService, GroupService, TYPES } from '@spos/services/common';
import { useParams } from 'react-router-dom';
import { TableOrder } from '@spos/clients-dining';
import { PreparationTable } from './preparationTable';

export function OrdersRow(props : {tableOrder: TableOrder}) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            {props.tableOrder.tableNumber}
        </TableCell>
        <TableCell align="right">{props.tableOrder.customersCount}</TableCell>
        <TableCell align="right">{props.tableOrder.opened}</TableCell>
        <TableCell align="right">{props.tableOrder.billed}</TableCell>
      </TableRow>
      <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Preparation
            </Typography>
            <PreparationTable preparation={props.tableOrder.preparations} ></PreparationTable>
            
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>

    </>

    )}