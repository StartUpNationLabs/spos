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
import { DiningApiService, GroupService, KitchenService, TYPES } from '@spos/services/common';
import { useParams } from 'react-router-dom';
import { TableOrder } from '@spos/clients-dining';
import { PreparationDto } from '@spos/clients-dining';
import { PreparedTableItem } from './preparedTableItem';
import { Button } from '@mui/material';
import { KitchenApiService } from 'libs/services/common/src/lib/apis/kitchenApiService';



export function PreparationItem(props : {preparation: PreparationDto}) {
    const [open, setOpen] = React.useState(false);
    const container = React.useContext(ContainerContext);
    const queryClient = useQueryClient();
    const {
        data: preparationCompleted,
        isLoading: preparationCompletedLoading,
        isError: preparationCompletedError,
        error: errorPreparationCompleted,
    } = useQuery({
        queryKey: ['preparationCompleted', props.preparation._id],
        queryFn: async () => {
            const kitchenApiService: KitchenApiService = container.get<KitchenApiService>(
                TYPES.KitchenApiService
            );
            return kitchenApiService.getPreparationApi().preparationsControllerRetrievePreparation({
                preparationId: props.preparation._id,
            });
        },
        refetchOnWindowFocus: 'always',
    });
 

    return(
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
            {props.preparation._id}
        </TableCell>

        <TableCell align="right">{props.preparation.shouldBeReadyAt}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {

                await container.get<KitchenService>(TYPES.KitchenService).readyPreparations([props.preparation._id]);
                for(let preparedItem of props.preparation.preparedItems){
                    queryClient.invalidateQueries({ queryKey: ['preparedItemsDetails',preparedItem._id] })
                }
                
            }}
            disabled={!!preparationCompleted?.data.completedAt} 
            >
                <Typography>Ready</Typography>
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
                Prepared Items
            </Typography>
            <PreparedTableItem preparedItems ={props.preparation.preparedItems} ></PreparedTableItem>

          </Box>
        </Collapse>
      </TableCell>
      
    </TableRow>
        </>
    )
}