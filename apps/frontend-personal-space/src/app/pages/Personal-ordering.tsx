import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Cart, ContainerContext, useCarts, Item } from '@spos/ui/common';
import { useQuery } from '@tanstack/react-query';
import { CatalogueService, GroupService, TYPES } from '@spos/services/common';
import { Box, Typography } from '@mui/material';

export default function PersonalOrdering() {
  //TODO: Fetch the groupId and the ownerId from... somewhere, maybe environment variables?
  const navigate = useNavigate();
  const groupId = 'aadf893e-ff11-4f0b-b708-66aa16647179';
  const tableNumber = 1;

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
    <>
      <Typography variant="h6" component="h2" fontWeight="bold">
        Personal Ordering
      </Typography>
      <Box
        className="custom-scrollbar"
        sx={{ overflowY: 'auto', height: '85dvh' }}
      >
        {Object.keys(catalog).map((category) => (
          <Box key={category} sx={{ marginBottom: '24px' }}>
            <Typography variant="h6">{category}</Typography>
            <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {catalog[category].length > 0 ? (
                catalog[category].map((item) => {
                  const isSelected = Boolean(
                    currentTableCart.find(
                      (element) => element.itemId === item._id
                    )
                  );

                  return (
                    <Box
                      key={item._id}
                      sx={{
                        display: 'inline',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Item
                        item={item}
                        tableNumber={tableNumber}
                        isSelected={isSelected}
                        handleSelectItem={handleSelectItem}
                      />
                    </Box>
                  );
                })
              ) : (
                <Typography>No Choices</Typography>
              )}
            </Box>
          </Box>
          ))}
      </Box>
    </>
  );
}
