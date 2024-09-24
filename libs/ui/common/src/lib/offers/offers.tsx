import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import { useOffers } from './stores/offers';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { container, GroupCreateDto, GroupService } from "@spos/services/common";
import { useCurrentSelectedGroup } from '../tables/stores/currentSelectedGroup';
import { Container } from "@freshgum/typedi";

export function Offers() {
  const offers = useOffers((state) => state.offers);
  const selectedTables = useCurrentSelectedGroup((state) => state.tables);
  const resetCurrentSelectedGroup = useCurrentSelectedGroup(state => state.resetTables);
  const mutation = useMutation({
    mutationFn: (newGroup: GroupCreateDto) => {
      return container.get(GroupService).addGroup(newGroup);
    },
    onSuccess: (data) => {
      navigate('/');
    },
  });
  const navigate = useNavigate();

  function onClick(offer) {
    return () => {
      mutation.mutate({
        tables: selectedTables,
        offer: offer,
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
