import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { MenuItem } from '@spos/clients-menu';
import NumberInput from '../tables/nbPeopleSelector';
import { useCarts } from './stores/cart';
import { Cart } from './orderingChoices';

type ItemProps = {
  item: MenuItem;
  isSelected: boolean;
  tableNumber: number;
  handleSelectItem: (itemId: string, shortName: string) => void;
  remaining?: number;
  onTable?: number;
};

export function Item(props: Readonly<ItemProps>) {
  const currentTableCart: Cart =
    useCarts((state) => state.carts)[props.tableNumber] || [];
  const updateItem = useCarts((state) => state.updateItem);

  const count =
    currentTableCart.find(
      (element) => element.shortName === props.item.shortName
    )?.quantity ?? 0;

  return (
    <Card sx={{ maxWidth: 250, minWidth: 150, maxHeight: 600 }}>
      <CardMedia
        sx={{ width: '100%', minWidth: 120, height: 100 }}
        image={props.item.image}
        title={props.item.shortName}
        onClick={() =>
          props.handleSelectItem(props.item._id, props.item.shortName)
        }
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.item.shortName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
          {props.remaining ? `Unpaid: ${props.remaining}` : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem' }}>

          {props.onTable !== undefined ? `Selected: ${(props.remaining ?? 0) - props.onTable}` : ''}
          </Typography>

      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
          alignItems: 'center',
        }}
      >
        {props.isSelected && (
          <NumberInput
            min={0}
            max={99}
            value={count}
            onChange={(e, value) => {
              updateItem(
                props.tableNumber,
                props.item._id,
                props.item.shortName,
                value as number
              );
            }}
          />
        )}
      </CardActions>
    </Card>
  );
}
