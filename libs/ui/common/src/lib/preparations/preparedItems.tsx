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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DiningApiService, GroupService, TYPES } from '@spos/services/common';
import { useParams } from 'react-router-dom';
import { PreparedItemDto, TableOrder } from '@spos/clients-dining';
import { PreparationDto } from '@spos/clients-dining';
import { KitchenApiService } from 'libs/services/common/src/lib/apis/kitchenApiService';



export function PreparedItem(props : {preparedItem: PreparedItemDto}) {
    const container = React.useContext(ContainerContext);

    const {
        data: preparedItemsDetails,
        isLoading: preparedItemsDetailsLoading,
        isError: preparedItemsDetailsError,
        error: errorPreparedItemsDetails,
    } = useQuery({
        queryKey: ['preparedItemsDetails', props.preparedItem._id],
        queryFn: async () => {
            const kitchenApiService: KitchenApiService = container.get<KitchenApiService>(
                TYPES.KitchenApiService
            );
            return kitchenApiService.getPreparedItemsApi().preparedItemsControllerRetrievePreparedItem({
                preparedItemId: props.preparedItem._id,
            });
        },
        refetchOnWindowFocus: 'always',
    });
    return(
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
            {props.preparedItem._id}
        </TableCell>
        <TableCell align="right">{props.preparedItem.shortName}</TableCell>
        <TableCell align="right">{preparedItemsDetails?.data.startedAt}</TableCell>
        <TableCell align="right">{preparedItemsDetails?.data.finishedAt}</TableCell>



      </TableRow>
    )
}