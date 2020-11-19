import React , {useEffect , useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Button from '@material-ui/core/Button';
import axios from 'axios';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(name, place, phno, date) {
//   return { name, place, phno, date};
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  const [roe , setRoe] = useState([])

  useEffect( () => {
    async function fetchData() {
        const result = await axios(
        'http://localhost:5000/api/visitor/',
        );

        await setRoe(result.data) 
    }

    fetchData()
    
  }, [roe]);

  const deleted = (id) => {
    const url = 'http://localhost:5000/api/visitor/';

    // preventDefault();

    axios.delete(url + id)
    .then(res => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    })

  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Place</StyledTableCell>
            <StyledTableCell align="right">Phone Number&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Date&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Time&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Edit&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Delete&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roe.map((res) => (
            <StyledTableRow key={res.id}>
              <StyledTableCell component="th" scope="row">
                {res.name}
              </StyledTableCell>
              <StyledTableCell align="right">{res.place}</StyledTableCell>
              <StyledTableCell align="right">{res.phno}</StyledTableCell>
              <StyledTableCell align="right">{new Date(res.created_at).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{new Date(res.created_at).toLocaleTimeString()}</StyledTableCell>
              <StyledTableCell align="right">{<Button onClick={() => { alert('clicked') }}><EditSharpIcon color="primary" /></Button>}</StyledTableCell>
              <StyledTableCell align="right">{<Button onClick={() => deleted(res.id) }><DeleteSharpIcon color="secondary" /></Button>}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
