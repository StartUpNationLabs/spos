import { useQuery } from "@tanstack/react-query";
import { GroupService, GroupServiceWorkflow, TYPES } from "@spos/services/common";
import { Grid2 as Grid, Typography } from "@mui/material";
import { GroupSquare } from "./groupSquare";
import * as React from "react";
import { useContext } from "react";
import { ContainerContext } from "../containerHook/containerContext";

export function GroupTables() {
  const container = useContext(ContainerContext);
  const { data: groupsApi, isLoading, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const groupService = container.get<GroupService>(TYPES.GroupService);
      return groupService.getGroups();
    },
    refetchOnWindowFocus: "always",
    staleTime: 0
  });
  if (isLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (groupsApi.length === 0) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        No Reservations
      </Typography>
    );
  }

  return (
    <Grid container spacing={4} justifyContent={"center"} alignItems={"center"}>
      {groupsApi.map((value, index) => (
        <Grid key={index}>
          <GroupSquare
            tableNumbers={value.tables.map((table) => table.number.toString())}
            groupId={value.id}
          ></GroupSquare>
        </Grid>
      ))}
    </Grid>
  );
}
