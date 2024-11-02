import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type SummararyTableProps = {
  cart: {
    itemId: string;
    shortName: string;
    quantity: number;
    price: number;
  }[];
};

export function SummaryTable(props: SummararyTableProps) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 20,
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(name: string, quantity: number, price: number) {
    return { name, quantity, price };
  }

  const rows = props.cart.map((element) =>
    createData(element.shortName, element.quantity, element.price)
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: '20px', marginBottom: '20px' }}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" width="30%">
              Name
            </StyledTableCell>
            <StyledTableCell align="center" width="30%">
              Quantity
            </StyledTableCell>
            <StyledTableCell align="center" width="30%">
              Price &nbsp;($)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" align="center" scope="row"  width="30%">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center"  width="30%">
                {row.quantity}
              </StyledTableCell>
              <StyledTableCell align="center" width="30%">
                {row.quantity * row.price}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SummaryTable;
