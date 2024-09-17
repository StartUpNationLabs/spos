import { CenterFocusStrong } from '@mui/icons-material';
import './offers.css';
import { useNavigate } from "react-router-dom";
import { Button, Typography, ButtonGroup, Box } from "@mui/material";
import * as React from 'react';
import { useState } from 'react';
import { Router } from 'react-router-dom';

export function Offers() {

    const buttons = [
        <Button className='offer-button' style={{
            padding: '20px 50px', // Plus grand bouton
            fontSize: '6vw',      // Texte plus grand
            borderWidth: '0.5vw',
        }} key="one">Classic</Button>,
        <Button className='offer-button' style={{
            padding: '20px 50px', // Plus grand bouton
            fontSize: '6vw',      // Texte plus grand
            borderWidth: '0.5vw'
        }} key="two">Cousinade</Button>,
        <Button className='offer-button' style={{
            padding: '20px 50px', // Plus grand bouton
            fontSize: '6vw',      // Texte plus grand
            borderWidth: '0.5vw'
        }} key="three">Comanie</Button>,
    ];

    return (
        <Box margin='170px' marginTop='30vw'>
            <Typography align='center'  variant="h1" component="h2" fontSize="8vw" fontWeight="bold" >
                Offers
            </Typography>
            <Box
            display="flex"
            justifyContent="center"  // Center horizontally
            alignItems="center"      // Center vertically
            marginTop="8vw"
            >
                <ButtonGroup
                    className='offers-container'
                    orientation="vertical"
                    aria-label="Vertical button group"
                    variant="text"
                >
                    {buttons}
                </ButtonGroup>
            </Box>
        </Box>
    );
}
export default Offers;