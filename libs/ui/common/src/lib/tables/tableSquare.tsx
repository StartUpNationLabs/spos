import NbPeopleSelector from './nbPeopleSelector';
import { purple, red } from '@mui/material/colors';

import { Button, Typography, Box } from "@mui/material";
import {useState} from 'react';
import {styled} from "@mui/system";

export function TableSquare({tableNumber, totalPeople, setTotalPeople}) {
    const [showPeopleSelector, setShowPeopleSelector] = useState(false)
    const showHidePeopleSelector = () => {
        showPeopleSelector ? setShowPeopleSelector(false) : setShowPeopleSelector(true);
    }

    return (
        <Box width="fit-content">
            <Button onClick={showHidePeopleSelector}
                    variant="contained"
                    sx={{aspectRatio: 1,

                    }}
                    color={showPeopleSelector? 'success':'primary' }>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={120}  // width of the square box
                height={100} // height of the square box
              >
                <Typography variant="h1" component="h2"  fontWeight="bold" >
                {tableNumber}
                </Typography>
              </Box>
            </Button>
            <Box margin="5%"></Box>
            { showPeopleSelector ? <NbPeopleSelector totalPeople={totalPeople} setTotalPeople={setTotalPeople}/> : <></> }
            <Box margin="2%"></Box>

        </Box>
    );
}

export default TableSquare;
