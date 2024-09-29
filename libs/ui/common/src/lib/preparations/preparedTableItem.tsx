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
import { PreparedItemDto, TableOrder } from '@spos/clients-dining';
import { PreparationDto } from '@spos/clients-dining';
import { PreparedItem } from './preparedItems';



export function PreparedTableItem(props : {preparedItems: PreparedItemDto[]}) {
    return(
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
            <PreparedItem key={preparedItem._id} preparedItem={preparedItem}></PreparedItem>
        ))}
        </TableBody>
    </Table>
    )
}