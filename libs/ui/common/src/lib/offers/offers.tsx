import { CenterFocusStrong } from '@mui/icons-material';
import './offers.css';
import { useNavigate } from "react-router-dom";
import { Button, Typography, ButtonGroup, Box } from "@mui/material";
import { red } from '@mui/material/colors';
import * as React from 'react';
import { useState } from 'react';
import { Router } from 'react-router-dom';

export function Offers() {
    return (
        <Box margin='170px' marginTop='30vw'>
            <Typography align='center'  variant="h1" component="h2" fontSize="10vw" fontWeight="bold" marginBottom="4vw" >
                Offers
            </Typography>
            <Box
            justifyContent="center"  // Center horizontally
            textAlign="center"
            width="60vw"
            margin="auto"
            >
                <Button className='offer-button' variant="contained" fullWidth={true} style={{
                    padding: '20px 50px', // Plus grand bouton
                    fontSize: '5vw',      // Texte plus grand
                    borderRadius: "60px",
                    color: 'white',
                    background: '#313131',
                    marginTop: '4vw'
                }} key="one">Classic</Button>,
                <Button className='offer-button' variant="contained" fullWidth={true} style={{
                    padding: '20px 50px', // Plus grand bouton
                    fontSize: '5vw',      // Texte plus grand
                    borderRadius: "60px",
                    color: 'white',
                    background: '#313131',
                    marginTop: '4vw'
                }} key="two">Cousinade</Button>,
                <Button className='offer-button' variant="contained" fullWidth={true} style={{
                    padding: '20px 50px', // Plus grand bouton
                    fontSize: '5vw',      // Texte plus grand
                    borderRadius: "60px",
                    color: 'white',
                    background: '#313131',
                    marginTop: '4vw'
                }} key="three">Comanie</Button>,
            </Box>
        </Box>
    );
}
export default Offers;