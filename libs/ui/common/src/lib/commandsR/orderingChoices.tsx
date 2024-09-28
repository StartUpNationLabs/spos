import React from 'react';
import { Box, Typography } from '@mui/material';
import './orderingChoices.css';
import { useCarts } from './stores/cart';
import { useQuery } from '@tanstack/react-query';
import { ContainerContext } from '../containerHook/containerContext';
import { CatalogueService, TYPES } from '@spos/services/common';
import Item from './Item';
import useCommandsParameter from './stores/useCommandsParameter';

export type Cart = {
  itemId: string;
  shortName: string;
  quantity: number;
}[]

export function OrderingChoices() {
  const { tableNumber, offerType } = useCommandsParameter();
  console.log(tableNumber, offerType);

  const currentTableCart: Cart = (useCarts(state => state.carts)[tableNumber] || []);
  const container = React.useContext(ContainerContext);

  const updateItem = useCarts(state => state.updateItem);

  const {
    data: catalog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['catalog', offerType],
    queryFn: async () => {
      const catalogService: CatalogueService = container.get<CatalogueService>(TYPES.CatalogueService);
      return catalogService.getFilteredCatalog(offerType);
    },
    enabled: tableNumber !== -1,
    refetchOnWindowFocus: 'always',
  });

  if (isError) {
    console.log(error);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Help
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading
      </Typography>
    );
  }

  if (!catalog) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading
      </Typography>
    );
  }

  function handleSelectItem(itemId: string, shortName: string) {
    if (currentTableCart.find(element => element.shortName === shortName) !== undefined) {
      updateItem(tableNumber, itemId, shortName, 0);
    }
    else {
      updateItem(tableNumber, itemId, shortName, 1);
    }
  }

  return (
    <Box
      className="custom-scrollbar"
      sx={{
        padding: '16px',
        marginTop: '110px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        height: '80vh',
        overflowY: 'auto',
        width: 'calc(100% - 32px)',
        position: 'relative',
        left: '0',
      }}
    >
      {Object.keys(catalog).map((category) => (
        <Box key={category} sx={{ marginBottom: '24px' }}>
          <Typography variant="h6">{category}</Typography>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {catalog[category].length > 0 ? (
              catalog[category].map((item) => {
                const isSelected = Boolean(currentTableCart.find(element => element.itemId === item._id));

                return (
                  <Box key={item._id} sx={{ display: 'inline', flexDirection: 'column', alignItems: 'center' }}>
                    <Item item={item} tableNumber={tableNumber} isSelected={isSelected}
                      handleSelectItem={handleSelectItem} />
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
  );
};

export default OrderingChoices;

