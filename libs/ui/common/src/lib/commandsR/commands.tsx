import React, { useEffect } from 'react';
import { Box, SpeedDial, Typography } from '@mui/material';
import NavBar from '../utils/navbar';
//SpeedDial imports
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from '@mui/icons-material/Close';
import DollarIcon from '@mui/icons-material/AttachMoney';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useCarts } from './stores/cart';
// Service import
import { ContainerContext } from '../containerHook/containerContext';
import { useQuery } from '@tanstack/react-query';
import { GroupService, TYPES } from '@spos/services/common';
import useCommandsParameter from './stores/useCommandsParameter';

export function Commands() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const removeCart = useCarts((state) => state.resetCart);

  const setGroupId = useCommandsParameter((state) => state.setGroupId);
  const setTableNumber = useCommandsParameter((state) => state.setTableNumber);
  const setOfferType = useCommandsParameter((state) => state.setOfferType);

  if (!groupId || groupId === '') {
    navigate('/');
  }

  const container = React.useContext(ContainerContext);
  const {
    data: group,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const groupService: GroupService = container.get<GroupService>(
        TYPES.GroupService
      );
      return groupService.getGroup(groupId);
    },
    refetchOnWindowFocus: 'always',
    enabled: !!groupId && groupId !== '',
  });

  useEffect(() => {
    if (group) {
      removeCart(group.tables[0].number);
      setTableNumber(group.tables[0].number);
      setOfferType(group.offer);
    }
  }, [group]);
  useEffect(() => {
    setGroupId(groupId ?? '');
  }, [setGroupId, groupId]);

  if (isLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (!group || isError) {
    console.error(error);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }

  const speedDialActions = [
    {
      icon: <TableRestaurantIcon />,
      name: 'Table Payment',
      operation: onClickTableBilling,
    },
    {
      icon: <GroupsIcon />,
      name: 'Group Payment',
      operation: onClickGroupBilling,
    },
  ];

  function onClickTableBilling() {
    navigate('/tableBilling/' + groupId);
  }

  function onClickGroupBilling() {
    navigate('/groupBilling/' + groupId);
  }

  return (
    <div>
      <Box
        sx={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Box
          sx={{
            boxSizing: 'border-box',
            width: 'fit-content',
            borderRight: '2px solid #000',
          }}
        >
          <NavBar tables={group.tables} />
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, left: '2.5dvh' }}
            icon={
              <SpeedDialIcon openIcon={<CloseIcon />} icon={<DollarIcon />} />
            }
            FabProps={{ size: 'large' }}
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
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default Commands;
