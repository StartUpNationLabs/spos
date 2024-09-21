import './landingPage.css';

import AddIcon from '@mui/icons-material/Add';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { IconButton, Typography, Box } from "@mui/material";
import { useState } from 'react';

export function NbPeopleSelector({totalPeople, setTotalPeople}) {
    const [nbPeople, setNbPeople] = useState(0)

    const addPerson = () => {
        setNbPeople(nbPeople + 1)
        setTotalPeople(totalPeople + 1)
    };

    const removePerson = () => {
        if (nbPeople > 0){
            setNbPeople(nbPeople - 1)
        }
        if (totalPeople > 0){
            setTotalPeople(totalPeople - 1)
        }
    };

    return (
        <Box className="horizontal-container">
            <IconButton onClick={addPerson}  style={{maxWidth: "33%", minWidth: "33%"}}>
                <AddIcon sx={{ fontSize: "4vw" }} style={{ color: 'black' }}/>
            </IconButton>
            <Typography align="center" variant="h3" component="h4" fontSize="4vw" fontWeight="bold" style={{maxWidth: "33%", minWidth: "33%"}}>
                {nbPeople}
            </Typography>
            <IconButton onClick={removePerson} style={{maxWidth: "33%", minWidth: "33%"}} >
                <RemoveRoundedIcon sx={{ fontSize: "4vw" }} style={{ color: 'black' }}/>
            </IconButton>
        </Box>
    );
}

export default NbPeopleSelector;