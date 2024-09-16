import './landingPage.css';

import AddIcon from '@mui/icons-material/Add';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { IconButton, Typography } from "@mui/material";
import { useState } from 'react';

export function NbPeopleSelector({totalSize}) {
    const [nbPeople, setNbPeople] = useState(0)

    const addPerson = () => {
        setNbPeople(nbPeople + 1)
    };

    const removePerson = () => {
        if (nbPeople > 0){
            setNbPeople(nbPeople - 1)
        }
    };

    return (
        <div className="horizontal-container">
            <IconButton onClick={addPerson}  style={{maxWidth: totalSize/3, minWidth: totalSize/3}} >
                <AddIcon style={{ color: 'black' }}/>
            </IconButton>
            <Typography align="center" variant="h4" component="h5"  fontWeight="bold" style={{maxWidth: totalSize/3, minWidth: totalSize/3}}>
                {nbPeople}
            </Typography>
            <IconButton onClick={removePerson} style={{maxWidth: totalSize/3, minWidth: totalSize/3}} >
                <RemoveRoundedIcon style={{ color: 'black' }}/>
            </IconButton>
        </div>
    );
}

export default NbPeopleSelector;