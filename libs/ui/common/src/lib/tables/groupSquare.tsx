import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ContainerContext } from "@spos/ui/common";
import { useContext } from "react";
import { KitchenService, TYPES } from "@spos/services/common";

export function GroupSquare(
  props: Readonly<{
    tableNumbers: string[];
    groupId: string;
  }>
) {
  const container = useContext(ContainerContext);
  container.get<KitchenService>(TYPES.KitchenService).getOrdersByGroupId(props.groupId).then((orders) => {
    console.log(orders);
  });
  const navigate = useNavigate();
  return (
    <Box width={"fit-content"}>
      <Button
        variant="contained"
        sx={{
          aspectRatio: 1
        }}
        onClick={() => navigate("/commands/" + props.groupId + '/')}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={120} // width of the square box
          height={100} // height of the square box
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            sx={{ wordBreak: "break-word" }}
          >
            {props.tableNumbers.join(", ")}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
}
