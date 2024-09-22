import {useNavigate} from "react-router-dom";
import TableSquare from './tableSquare';
import {Box, Button, Grid2 as Grid, Typography} from "@mui/material";
import * as React from 'react';
import {useFreeTables} from "./stores/useFreeTables";

export function LandingPage() {
  const navigate = useNavigate();
  const tables = useFreeTables();
  const navigateTables = () => {
    navigate("/offers")
  }

  return (
    <Box height={"100vh"} display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"}>
      <Typography align='center' variant="h1" component="h2" fontSize="10vh" fontWeight="bold">
        Tables
      </Typography>
      <Grid container spacing={4} justifyContent={"center"} alignItems={"center"} marginTop="60px" maxHeight='60vh'
            overflow='auto' maxWidth={800}>
        {tables.map((value, index) => (
          <Grid key={index}>
            <TableSquare tableNumber={value.id}></TableSquare>
          </Grid>
        ))}
      </Grid>
      <Box textAlign='center' marginTop="60px">
        <Button
          onClick={navigateTables}
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
