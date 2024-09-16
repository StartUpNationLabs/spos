import './landingPage.css';
import NbPeopleSelector from './nbPeopleSelector';

import { Button, Typography } from "@mui/material";
import { useState } from 'react';

export function TableSquare() {
    const [showPeopleSelector, setShowPeopleSelector] = useState(false)

    const showHidePeopleSelector = () => {
        showPeopleSelector ? setShowPeopleSelector(false) : setShowPeopleSelector(true);
    }

    return (
        <div>
            <Button onClick={showHidePeopleSelector} variant="contained" className='table-button'>
                <Typography variant="h1" component="h2"  fontWeight="bold">
                1
                </Typography>
            </Button>
            { showPeopleSelector ? <NbPeopleSelector totalSize={150}/> : null }
            
        </div>
    );
}

export default TableSquare;