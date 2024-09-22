import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import * as React from 'react';
import {TableGrid} from "./tableGrid";

export function LandingPage() {
  const navigate = useNavigate();
  const navigateTables = () => {
    navigate("/offers")
  }

  return (
    <Box height={"100vh"} width={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"}>
      <Typography align='center' variant="h1" component="h2" fontSize="10vh" fontWeight="bold">
        Tables
      </Typography>
      <TableGrid/>
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
