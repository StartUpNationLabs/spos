import React, { useState } from 'react';
import { Box, SpeedDial } from '@mui/material';
import NavBar from '../utils/navbar';
import Orders from '../orders/orders';
import BackButton from '../utils/backButton';
import OrderingChoices from './orederingChoices';
import { setSelectedTableById, tablesData } from '../utils/tableUtils';
//SpeedDial imports
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from '@mui/icons-material/Close';
import DollarIcon from '@mui/icons-material/AttachMoney';

export function Commands() {
    const [selectedTable, setSelectedTable] = useState(tablesData[1]);

    const speedDialActions = [
      { icon: <TableRestaurantIcon />, name: 'Table Payment', operation: onClickTableBilling },
      { icon: <GroupsIcon />, name: 'Group Payment', operation: onClickGroupBilling }
    ];

    function onClickBackButton() {
      console.log('clicked on back button... redirection to be implemented');
    }

    function onClickTableBilling() {
      //TODO: Do the redirection with the table id
      console.log('table billing button... redirection to be implemented');
    }

    function onClickGroupBilling() {
      //TODO: Do the redirection with the group id
      console.log('group billing button... redirection to be implemented');
    }

    return (
        <div>
            <Box sx={{ minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'row',
                width: '100%' }}>
                <Box sx={{ boxSizing: 'border-box',
                            width: 'fit-content',
                            borderRight: '2px solid #000' }}>
                    <NavBar
                        tables={tablesData}
                        setSelectedTable={(tableId: number) =>
                            setSelectedTableById(tablesData, tableId, setSelectedTable)
                        }
                    />
                    <SpeedDial
                      ariaLabel="SpeedDial basic example"
                      sx={{ position: 'absolute', bottom: 16, left: '2.5dvh'}}
                      icon={<SpeedDialIcon openIcon={<CloseIcon />} icon={<DollarIcon />} />}
                      FabProps={{ size: 'large'}}
                    >
                      {speedDialActions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          onClick={action.operation}
                        />
                      ))}
                    </SpeedDial>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <BackButton onClick={onClickBackButton} color={'black'} top={20} left={150}></BackButton>
                    {selectedTable && <OrderingChoices selectedTable={selectedTable} />}
                    <Orders></Orders>
                </Box>
            </Box>
        </div>
    );
}

export default Commands;
