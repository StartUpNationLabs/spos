import {Box, Button, Typography} from "@mui/material";
import * as React from 'react';
import {useOffers} from "./stores/offers";
import {useGroups} from "../tables/stores/groups";

export function Offers() {
  const offers = useOffers(state => state.offers);
  const addGroup = useGroups(state => state.addGroup);
  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"start"} width={"100%"}
         height={"100vh"}>
      <Typography align='center' variant="h1" component="h2" fontSize="10vw" fontWeight="bold" paddingTop={"150px"}>
        Offers
      </Typography>
      <Box
        justifyContent="center"  // Center horizontally
        textAlign="center"
        width="60vw"
        margin="auto"
      >
        {offers.map((offer) => (
          <Button className='offer-button' onClick={() => {
            addGroup(offer.name)
          }} variant="contained" fullWidth={true} style={{
            padding: '20px 50px', // Plus grand bouton
            fontSize: '5vw',      // Texte plus grand
            borderRadius: "60px",
            color: 'white',
            background: '#313131',
            marginTop: '4vw'
          }} key={offer.name}>{offer.name}</Button>
        ))}
      </Box>
    </Box>
  );
}

export default Offers;
