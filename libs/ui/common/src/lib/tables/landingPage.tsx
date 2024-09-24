import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import * as React from 'react';
import {TableGrid} from "./tableGrid";
import {useCurrentSelectedGroup} from "./stores/currentSelectedGroup";
import { Container } from "typedi";
import { TableService } from "@spos/services/common";

export function LandingPage() {
  const navigate = useNavigate();
  const navigateTables = () => {
    navigate("/offers")
  }
  const tables  = useCurrentSelectedGroup(state => state.tables);
  const tableEmpty = Object.keys(tables).length === 0;
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
          disabled={tableEmpty}
        >
          <Typography variant={"h4"}>Create</Typography>
        </Button>
        <Button
          onClick={async () => {
            await Container.get(TableService).closeAllTables();
            window.location.reload();
          }}

        >
          <Typography variant={"h4"}>Clear</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default LandingPage;
