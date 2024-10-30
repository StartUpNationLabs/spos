import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import BackButton from '../utils/backButton';
import './orderingChoices.css';
import { useCarts } from './stores/cart';
import { useQuery } from '@tanstack/react-query';
import { ContainerContext } from '../containerHook/containerContext';
import { CatalogueService, TYPES } from '@spos/services/common';
import useCommandsParameter from './stores/useCommandsParameter';
import { useNavigate } from 'react-router-dom';
import { CatalogDisplay } from './catalogDisplay';

export type Cart = {
  itemId: string;
  shortName: string;
  quantity: number;
}[];

export function OrderingChoices() {
  const navigate = useNavigate();
  const { groupId, tableNumber, offerType } = useCommandsParameter();

  const currentTableCart: Cart =
    useCarts((state) => state.carts)[tableNumber] || [];
  const haveCurrentCommand = currentTableCart.length > 0;
  const container = React.useContext(ContainerContext);

  const updateItem = useCarts((state) => state.updateItem);
  const {
    data: catalog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['catalog', offerType],
    queryFn: async () => {
      const catalogService: CatalogueService = container.get<CatalogueService>(
        TYPES.CatalogueService
      );
      return catalogService.getFilteredCatalog(offerType);
    },
    enabled: tableNumber !== -1 && offerType !== '',
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
    if (
      currentTableCart.find((element) => element.shortName === shortName) !==
      undefined
    ) {
      updateItem(tableNumber, itemId, shortName, 0);
    } else {
      updateItem(tableNumber, itemId, shortName, 1);
    }
  }

  function onClickBackButton() {
    navigate('/');
  }

  return (
    <Box
      sx={{
        padding: '16px',
        paddingTop: '110px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '14px',
        height: '100vh',
        width: 'calc(100% - 32px)',
        position: 'relative',
        left: '0',
      }}
    >
      <BackButton
        onClick={onClickBackButton}
        color={'black'}
        top={20}
        left={10}
      />
      <CatalogDisplay catalog={catalog} currentTableCart={currentTableCart} tableNumber={tableNumber} handleSelectItem={handleSelectItem} />
      {haveCurrentCommand && (
        <Button
          sx={{
            margin: 'auto',
            alignItems: 'center',
          }}
          variant="contained"
          onClick={() => navigate('/commands/' + groupId + '/summary')}
        >
          Summary
        </Button>
      )}
      {!haveCurrentCommand && (
        <Button
          sx={{
            margin: 'auto',
            alignItems: 'center',
          }}
          variant="contained"
          onClick={() => navigate('/commands/' + groupId + '/orders')}
        >
          Orders
        </Button>
      )}
    </Box>
  );
}

export default OrderingChoices;
