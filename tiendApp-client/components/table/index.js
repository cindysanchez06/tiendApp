import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import styles from "./styles.module.css";


const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {},
});

export default function StickyHeadTable({ data, columns, handleEdit, handleDelete }) {
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
                  align={'left'}
                  style={{ minWidth: 170 }}
                >
                  {column.label}
                </TableCell>
              ))}
               <TableCell
                  align={'left'}
                  style={{ minWidth: 170 }}
                >
                  Acciones
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>

                      );
                    })}
                    <TableCell align={'left'} >
                      <Button
                        className={styles.button}
                        type="button"
                        variant="contained"
                        color="default"
                        onClick={() => handleEdit(row.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        className={styles.button}
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(row.id)}
                      >
                        Eliminar
                      </Button>
                      </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
