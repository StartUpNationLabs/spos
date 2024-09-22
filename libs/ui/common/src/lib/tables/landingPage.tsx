import {useNavigate} from "react-router-dom";
import TableSquare from './tableSquare';
import {Button, Typography, Box, Grid2 as Grid} from "@mui/material";
import * as React from 'react';
import {useState} from 'react';

export function LandingPage() {
  const [totalPeople, setTotalPeople] = useState(0);
  const navigate = useNavigate();

  const validateTables = () => {
    console.log({totalPeople})
    navigate("/offers")
  }

  return (
    <Box  width={"100%"} height={"100vh"} display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"}>
      <Typography align='center' variant="h1" component="h2" fontSize="10vh" fontWeight="bold">
        Tables
      </Typography>
      <Grid container spacing={4} justifyContent={"center"} alignItems={"center"} marginTop="60px" maxHeight='60vh'  overflow='auto' maxWidth={800} >
        {Array.from(Array(15)).map((_, index) => (
          <Grid key={index}  >
            <TableSquare tableNumber={index} totalPeople={totalPeople} setTotalPeople={setTotalPeople}></TableSquare>
          </Grid>
        ))}
      </Grid>
      <Box textAlign='center' marginTop="60px">
        <Button
          onClick={validateTables}
          variant="contained"
          color="success"
        >
          <Typography variant={"h4"}>Create</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default LandingPage;