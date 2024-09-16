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
        <div>
            <Button onClick={showHidePeopleSelector} variant="contained" className='table-button' color={showPeopleSelector? 'success':'primary' }>
                <Typography variant="h1" component="h2"  fontWeight="bold">
                {tableNumber+1}
                </Typography>
            </Button>
            <Box margin="15px"></Box>
            { showPeopleSelector ? <NbPeopleSelector totalSize={200} totalPeople={totalPeople} setTotalPeople={setTotalPeople}/> : null }
            
        </div>
    );
}

export default TableSquare;