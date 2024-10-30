import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { Cart, ContainerContext, useCarts, Item, CatalogDisplay } from '@spos/ui/common';
import { useQuery } from '@tanstack/react-query';
import { CatalogueService, GroupService, TYPES } from '@spos/services/common';
import DollarIcon from '@mui/icons-material/AttachMoney';
import {
  Box,
  Fab
} from '@mui/material';

export default function PersonalOrdering() {
  const navigate = useNavigate();
  const { groupId, tableNumber, ownerId } = useParams<{ groupId: string, tableNumber: string, ownerId: string }>();

  const currentTableCart: Cart =
    useCarts((state) => state.carts)[tableNumber] || [];

  const updateItem = useCarts((state) => state.updateItem);

  const container = React.useContext(ContainerContext);

  const {
    data: group,
    isLoading: isLoadingGroup
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

  const {
    data: catalog,
    isLoading: isLoadingCatalog
  } = useQuery({
    queryKey: ['catalog', group?.offer],
    queryFn: async () => {
      const catalogService: CatalogueService = container.get<CatalogueService>(
        TYPES.CatalogueService
      );
      return catalogService.getFilteredCatalog(group?.offer ?? "");
    },
    enabled: group?.offer !== undefined && group?.offer !== '',
    refetchOnWindowFocus: 'always',
  });

  if (isLoadingGroup || isLoadingCatalog) {
    return <div>Loading...</div>
  }

  if (group === undefined) {
    return <div>Error, the selected groupId doesn't exist</div>;
  }

  if (!group.tables.map((table) => table.number).map(String).includes(tableNumber ?? "")) {
    return <div>Error, the selected table doesn't belong to the group</div>;
  }

  function handleSelectItem(itemId: string, shortName: string) {
    if (
      currentTableCart.find((element) => element.shortName === shortName) !==
      undefined
    ) {
      updateItem(tableNumber, itemId, shortName, 0);
    } else {
      updateItem(tableNumber, itemId, shortName, 1);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh'
        }}
      >
        <CatalogDisplay catalog={catalog} currentTableCart={currentTableCart} tableNumber={tableNumber} handleSelectItem={handleSelectItem} />

        <Fab
          color="primary"
          aria-label="Dollar"
          sx={{ position: 'absolute', bottom: '2.5dvh', left: '2.5dvh' }}
          onClick={() => navigate(`/personalBilling/${groupId}/${tableNumber}/${ownerId}`)}
        >
          <DollarIcon />
        </Fab>
      </Box>
    </Box>
  );
}
