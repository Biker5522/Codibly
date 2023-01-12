import * as React from "react";
import { createMuiTheme, makeStyles, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id: number, name: string, year: number, color: string) {
  return { id, name, year, color };
}

const rows = [
  createData(1, "example 1", 2010, "#98B2D1"),
  createData(2, "example 2", 2012, "#FFFFF"),
  createData(3, "example 3", 2013, "#98B2D1"),
];
type Props = {
  id?: number;
};

export default function ProductsTable({ id }: Props) {
  return (
    <div className="w-[30em] ">
      <TableContainer component={Paper}>
        <Table aria-label="product table">
          <TableHead className="bg-emerald-400 ">
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Year</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {id
              ? rows
                  .filter((product) => product.id === Number(id))
                  .map((row) => (
                    <StyledTableRow
                      key={row.id}
                      className={`bg-[${row.color}]`}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.year}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
              : rows.map((row) => (
                  <StyledTableRow key={row.id} className={`bg-[${row.color}]`}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">{row.year}</StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
