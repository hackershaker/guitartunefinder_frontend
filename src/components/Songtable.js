import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const Songtable = (props) => {
  const columns = [
    { id: "name", label: "Song", minWidth: 200 },
    { id: "artist", label: "Artist", minWidth: 100 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [refresh, setRefresh] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  // useEffect(() => {
  //   setRefresh(!refresh)
  // }, [props.rowdata]);

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rowdata
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow role="row" hover tabIndex="-1">
                    {columns.map((column) => {
                      return <TableCell>{row[column["id"]]}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          count={props.rowdata.length} //The total number of rows.
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage} // Callback fired when the page is changed.
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent:"flex-end" }}
        />
    </Paper>
  );
};

export default Songtable;
