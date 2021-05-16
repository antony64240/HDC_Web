import React, { useEffect , useState } from 'react';
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
import LogoPdf from '../../../image/Logopdf.png';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import ListFolder from '../Folder/ListFolder';
import TodoList from '../todo/TodoList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
  
  },
  container: {
    maxHeight: 600,
  },
  });


export default function StickyHeadTable({rows}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [files, setfiles] = useState();
  const [filesLoad, setfilesLoad ] = useState(Boolean);
  const [currentFolder, setcurrentFolder ] = useState(String);
  const [openDialog , setopenDialog] = useState(Boolean);
  const [idSelected , setIdSelected ] = useState(String);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openDial = (id) => {
    setIdSelected(id);
    setopenDialog(true);
  }
  const closeDial = () =>{
      setopenDialog(false)
  }

  
    const getDocument = row => {
      const event = window.event;

      fetch(`${CONFIG.URLAPI}ListFichier`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            urlrequest : row,
            token : localStorage.getItem('token')
        }
      }).then(response => response.json())
      .then(res=>{
          setcurrentFolder(row)
          setfiles(res.list)
          setfilesLoad(true)
      })

    }


    const getDevis = row => {
      fetch(`${CONFIG.URLAPI}download`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            url : "devis",
            name : `${row}.pdf`,
            token : localStorage.getItem('token')
        }
      }).then(response => {
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `Devis_${row}.pdf`;
            a.click();
        });
      })  
    }

  const columns = [
    { id: 'Description', width:'100px', label: 'Description',  minWidth: 400 , format: (value) => value},
    {
      id: 'Date',
      label: 'Date',
      minWidth: 10,
      format: (value) => `${new Date(value).getDate()}/${new Date(value).getUTCMonth()+1}/${new Date(value).getUTCFullYear()}`,
    },
    {
      id: 'DateExp',
      label: 'Délais de livraison',
      minWidth: 180,
      align:'center',
      format: (value) =>{ value = parseInt(value); return `${new Date(value).getDate()}/${new Date(value).getUTCMonth()+1}/${new Date(value).getUTCFullYear()}`}
    },
    {
      id: 'Valider',
      label: 'Validation',
      minWidth: 100,
      format: (value) => (value)?"Validé":"En attente"
    },
    { id: 'Devis', label: 'Devis', minWidth: 30 , format: (value, row)  =>  (value)? <img style={{height:30+"px" , cursor:"pointer"}} src={LogoPdf} onClick={() => getDevis(row._id)}/> : ""},
    { id: 'Fichier', label: 'Fichier', align:'center' , minWidth: 10 , format: (value, row)  =>  <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} onClick={(e) => { e.stopPropagation();getDocument(row.Date)} } />
  }
  ];

  return (
    <React.Fragment>
      <ListFolder files={files} setfilesLoad={setfilesLoad} filesLoad={filesLoad} currentFolder={currentFolder}  />
      <Dialog open={openDialog}  aria-labelledby="form-dialog-title">
                  <TodoList data={ rows }  dataSelected={ idSelected } />
                            <DialogActions>
                            <Button onClick={() => closeDial()}  color="primary">
                                Fermer
                            </Button>
                        </DialogActions>
      </Dialog>  
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                return (
                  <TableRow tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell style={{cursor:"pointer"}} key={column.id} align={column.align} onClick={() => openDial(row._id)}>
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}
