import { useQuery } from "@tanstack/react-query";
import { Container } from "typedi";
import { TableService } from "@spos/services/common";
import { Grid2 as Grid, Typography } from "@mui/material";
import TableSquare from "./tableSquare";
import * as React from "react";

export function FreeTables() {
  const { data: tables, isLoading, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const tableService = Container.get(TableService);
      return tableService.getFreeTables();
    },
    refetchOnWindowFocus: "always"
  });
  if (isLoading) {
    return <Typography variant="h6" component="h2" fontWeight="bold">Loading...</Typography>;
  }
  if (isError) {
    return <Typography variant="h6" component="h2" fontWeight="bold">Error</Typography>;
  }
  console.log(tables);
  return (
    <Grid container spacing={4} justifyContent={"center"} alignItems={"center"}>
      {tables.map((value, index) => (
        <Grid key={index}>
          <TableSquare tableNumber={value.number}></TableSquare>
        </Grid>
      ))}
    </Grid>
  );
}