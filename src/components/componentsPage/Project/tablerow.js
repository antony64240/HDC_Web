import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { CONFIG }  from '../../enum-list/enum-list';


const getDevis = row => {
    fetch(`${CONFIG.URLAPI}download`, {
      method: "GET",
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          url : "devis",
          name : row,
          token : localStorage.getItem('token')
      }
    }).then(response => {
      response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = 'devis.pdf';
          a.click();
      });
    })  
}


const columns = [
  { id: 'Name', label: 'Name', minWidth: 170 , format: (value) => value },
  { id: 'Description', label: 'Description', minWidth: 100 , format: (value) => value},
  {
    id: 'Date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
    format: (value) => `${new Date(value).getDate()}/${new Date(value).getUTCMonth()+1}/${new Date(value).getUTCFullYear()}`,
  },
  {
    id: 'DateExp',
    label: 'Date de livraison',
    minWidth: 170,
    align: 'right',
    format: (value) =>{ value = parseInt(value); return `${new Date(value).getDate()}/${new Date(value).getUTCMonth()+1}/${new Date(value).getUTCFullYear()}`}
  },
  {
    id: 'Valider',
    label: 'Validation',
    minWidth: 170,
    align: 'right',
    format: (value) => (value)?"Traité":"Projet pas encore traité."
  },
  { id: 'Devis', label: 'Devis', minWidth: 100 , format: (value, row)  =>  (value)? <button onClick={() => getDevis(row._id)}>Devis</button> : ""}
];

const useStyles = makeStyles({
  root: {
    width: '100%',
   
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({rows}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format(value , row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
