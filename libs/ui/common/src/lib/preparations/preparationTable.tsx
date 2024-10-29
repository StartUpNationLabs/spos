import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { PreparationDto } from '@spos/clients-dining';
import { PreparationItem } from './preparationItem';

export function PreparationTable(props: { preparation: PreparationDto[] }) {
  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell>shouldBeReadyAt</TableCell>
          <TableCell>action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.preparation.map((preparation) => (
          <PreparationItem
            key={preparation._id}
            preparation={preparation}
          ></PreparationItem>
        ))}
      </TableBody>
    </Table>
  );
}
