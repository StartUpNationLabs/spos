import {useFreeTables} from "./stores/useFreeTables";
import {Box, Button, Grid2 as Grid, Typography} from "@mui/material";
import TableSquare from "./tableSquare";
import * as React from "react";
import {useGroups} from "./stores/groups";
import {useNavigate} from "react-router-dom";

function GroupSquare(props: {
  tableNumbers: string[];
}) {
  const navigate = useNavigate();
  return <Box width={"fit-content"}>
    <Button
      variant="contained"
      sx={{
        aspectRatio: 1,

      }}

      onClick={() => navigate("/commands")}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={120}  // width of the square box
        height={100} // height of the square box
      >
        <Typography variant="h4" component="h2" fontWeight="bold" sx={{wordBreak: "break-word"}}>
          {props.tableNumbers.join(", ")}
        </Typography>
      </Box>
    </Button>
  </Box>;
}

function GroupTables() {
  const groups = useGroups(state => state.groups);
  if (groups.length === 0) {
    return <Typography variant="h6" component="h2" fontWeight="bold">No Reservations</Typography>
  }

  return (
    <Grid container spacing={4} justifyContent={"center"} alignItems={"center"}>
      {groups.map((value, index) => (
        <Grid key={index}>
          <GroupSquare tableNumbers={Object.keys(value.tables)}></GroupSquare>
        </Grid>
      ))}
    </Grid>
  );
}

export function TableGrid() {
  return (
    <Grid container spacing={4} justifyContent={"center"} alignItems={"center"} marginTop="60px" maxHeight='60vh'
          overflow='auto' maxWidth={800}>
      <Grid width={"100%"}>
        <Box width={"100%"}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Reserved Tables
          </Typography>
        </Box>
        <GroupTables/>
      </Grid>
      <Grid width={"100%"}>
        <Box width={"100%"}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Free Tables
          </Typography>
        </Box>
        <FreeTables/>
      </Grid>
    </Grid>
  );
}

function FreeTables() {
  const tables = useFreeTables();

  return (
    <Grid container spacing={4} justifyContent={"center"} alignItems={"center"}>
      {tables.map((value, index) => (
        <Grid key={index}>
          <TableSquare tableNumber={value.id}></TableSquare>
        </Grid>
      ))}
    </Grid>
  );
}
