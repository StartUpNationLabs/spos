import NumberInput from './nbPeopleSelector';

import {Box, Button, Typography} from "@mui/material";
import * as React from 'react';
import {useState} from 'react';
import {useCurrentSelectedGroup} from "./stores/currentSelectedGroup";

export function TableSquare({tableNumber}) {
  const [showPeopleSelector, setShowPeopleSelector] = useState(false)
  const currentTablePeople = useCurrentSelectedGroup(state => state.tables[tableNumber]?.customerCount || 0);
  const setTable = useCurrentSelectedGroup(state => state.setTable);
  const removeTable = useCurrentSelectedGroup(state => state.removeTable);
  const showHidePeopleSelector = () => {
    setShowPeopleSelector(!showPeopleSelector)
    if (!showPeopleSelector) {
      setTable(tableNumber, 1)
    } else {
      removeTable(tableNumber)
    }
  }
  return (
    <Box width="fit-content">
      <Button onClick={showHidePeopleSelector}
              variant="contained"
              sx={{
                aspectRatio: 1,

              }}
              color={showPeopleSelector ? 'success' : 'secondary'}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={120}  // width of the square box
          height={100} // height of the square box
        >
          <Typography variant="h1" component="h2" fontWeight="bold">
            {tableNumber}
          </Typography>
        </Box>
      </Button>
      {showPeopleSelector ? <>
        <Box margin="5%"></Box>

        <NumberInput aria-label="Table Input"
                                         min={1}
                                         max={99}
                                         value={currentTablePeople}
                                         onChange={(e, value) => setTable(tableNumber, value as number)}

      />
        <Box margin="2%"></Box>

      </> : <></>}

    </Box>
  );
}

export default TableSquare;
