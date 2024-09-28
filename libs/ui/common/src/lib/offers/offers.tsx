import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  GroupCreateDto,
  GroupService,
  OfferService,
  TYPES,
} from '@spos/services/common';
import { useCurrentSelectedGroup } from '../tables/stores/currentSelectedGroup';
import { ContainerContext } from "../containerHook/containerContext";
import { useContext } from "react";

export function Offers() {
  const selectedTables = useCurrentSelectedGroup((state) => state.tables);
  const navigate = useNavigate();
  const resetCurrentSelectedGroup = useCurrentSelectedGroup(
    (state) => state.resetTables
  );
  const container = useContext(ContainerContext);
  const mutation = useMutation({
    mutationFn: (newGroup: GroupCreateDto) => {
      return container.get<GroupService>(TYPES.GroupService).addGroup(newGroup);
    },
    onSuccess: (data) => {
      navigate('/');
    },
  });

  const {
    data: offers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const offerService: OfferService = container.get<OfferService>(TYPES.OfferService);
      return offerService.getOffers();
    },
    refetchOnWindowFocus: 'always',
  });

  if (isLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (!offers || isError) {
    console.error(error);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }

  function onClick(offer) {
    return () => {
      mutation.mutate({
        tables: Object.keys(selectedTables).map((table) => {
          return {
            number: selectedTables[table].number,
            customerCount: selectedTables[table].customerCount,
          };
        }),
        offer: offer.name,
      });
      resetCurrentSelectedGroup();
    };
  }

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      justifyContent={'start'}
      width={'100vw'}
      height={'100vh'}
    >
      <Typography
        align="center"
        variant="h1"
        component="h2"
        fontWeight="bold"
        paddingTop={'17vh'}
      >
        Offers
      </Typography>
      <Box
        justifyContent="center" // Center horizontally
        textAlign="center"
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        paddingTop={'7vh'}
        width="60vw"
      >
        {offers.map((offer) => (
          <Button
            onClick={onClick(offer)}
            variant="contained"
            fullWidth={true}
            style={{
              borderRadius: '60px',
              color: 'white',
              margin: '10px',
              background: '#313131',
            }}
            key={offer.name}
          >
            <Typography variant={'h3'}>{offer.name}</Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Offers;
