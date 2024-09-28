import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { MenuItem } from "@spos/clients-menu"
import NumberInput from '../tables/nbPeopleSelector';
import { count } from "console";
import { useCarts } from "./stores/cart";
import { Cart } from "./orderingChoices";
import { useState } from "react";

type ItemProps = {
  item: MenuItem;
  isSelected: boolean;
  tableNumber: number;
  handleSelectItem: (itemId: string) => void;
}

export function Item(props: Readonly<ItemProps>) {
  const currentTableCart: Cart = (useCarts(state => state.carts)[props.tableNumber] || []);
  const updateItem = useCarts(state => state.updateItem);

  const count = currentTableCart.find(element => element.itemId === props.item._id)?.quantity ?? 0;


  return (
    <Card sx={{ maxWidth: 250, minWidth: 150, maxHeight: 250 }}>
      <CardMedia
        sx={{ width: "100%", minWidth: 120, height: 100 }}
        image={props.item.image}
        title={props.item.shortName}
        onClick={() => props.handleSelectItem(props.item._id)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.item.shortName}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'center', padding: 0, alignItems: "center" }}>
        {props.isSelected && (
          <NumberInput
            min={0}
            max={99}
            value={count}
            onChange={(e, value) => {
              updateItem(props.tableNumber, props.item._id, value as number)
            }}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default Item;
