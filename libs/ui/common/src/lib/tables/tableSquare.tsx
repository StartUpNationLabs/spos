import './landingPage.css';
import NbPeopleSelector from './nbPeopleSelector';
import { purple, red } from '@mui/material/colors';

import { Button, Typography, Box } from "@mui/material";
import {useState} from 'react';

export function TableSquare({tableNumber, totalPeople, setTotalPeople}) {
    const [showPeopleSelector, setShowPeopleSelector] = useState(false)
    const showHidePeopleSelector = () => {
        showPeopleSelector ? setShowPeopleSelector(false) : setShowPeopleSelector(true);
    }

    return (
        <Box className="table-box">
            <Button onClick={showHidePeopleSelector} variant="contained" fullWidth={true} className="table-button" color={showPeopleSelector? 'success':'primary' }>
                <Typography variant="h1" component="h2"  fontWeight="bold">
                {tableNumber+1}
                </Typography>
            </Button>
            <Box margin="5%"></Box>
            { showPeopleSelector ? <NbPeopleSelector totalPeople={totalPeople} setTotalPeople={setTotalPeople}/> : null }
            <Box margin="2%"></Box>
            
        </Box>
    );
}

export default TableSquare;