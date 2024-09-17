import { CenterFocusStrong } from '@mui/icons-material';
import './landingPage.css';
import { useNavigate } from "react-router-dom";
import TableSquare from './tableSquare';
import { Button, Typography, Grid2, Box } from "@mui/material";
import * as React from 'react';
import { useState } from 'react';
import { Router } from 'react-router-dom';

export function LandingPage() {
    const [totalPeople, setTotalPeople] = useState(0);
    const navigate = useNavigate();

    const validateTables = () => {
        console.log({totalPeople})
        navigate("/offers")
    }

    return (
        <Box margin='170px' marginTop='20vw'>
            <Typography align='center'  variant="h1" component="h2" fontSize="8vw" fontWeight="bold" >
                Tables
            </Typography>
            <Grid2 container spacing={4} justifyContent="center" marginTop="60px">
                {Array.from(Array(9)).map((_, index) => (
                    <Grid2 key={index} size='auto' >
                        <TableSquare tableNumber={index} totalPeople={totalPeople} setTotalPeople={setTotalPeople}></TableSquare>
                    </Grid2>
                ))}
            </Grid2>
            <Box textAlign='center' marginTop="60px">
            { totalPeople>0 ? 
                <Button
                    onClick={validateTables}
                    variant="contained"
                    color="success"
                    style={{
                        padding: '20px 50px', // Plus grand bouton
                        borderRadius: '50px',  // Coins arrondis
                        fontSize: '4vw',      // Texte plus grand
                    }}
                    >
                    Validate
                </Button>
                : null
            }
            </Box>
        </Box>
    );
}
export default LandingPage;