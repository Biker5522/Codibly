import * as React from "react";
import { createMuiTheme, makeStyles, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllProductsQuery, useGetProductQuery } from "../redux/apiSlice";
import { useState, useEffect } from "react";
import IProduct from "../interfaces/product";

//Styling Table
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

//Table Data Structure
function createData(id: number, name: string, year: number, color: string) {
  return { id, name, year, color };
}

//Example data
const rows = [
  createData(1, "example 1", 2010, "#98B2D1"),
  createData(2, "example 2", 2012, "#FFFFF"),
  createData(3, "example 3", 2013, "#98B2D1"),
];
//Props
type Props = {
  id?: number | null;
  page?: number | null;
  products?: [];
};

export default function ProductsTable(props: Props) {
  //const { data: AllProducts, loading: isLoadingProducts } =
  // useGetAllProductsQuery();
  const [tableData, setTableData] = useState([]);
  const [productId, setProductId] = useState<number | null>();

  //Check when id changes and set product id
  useEffect(() => {
    if (props.id) {
      setProductId(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    if (props.products) {
      setTableData(props.products);
      console.log(props.products);
    }
  }, [props.products]);

  //let { data: Product, error: ProductError } = useGetProductQuery(1);

  return (
    <div className="w-[30em] ">
      <TableContainer component={Paper}>
        <Table aria-label="product table">
          {/* Table Header */}
          <TableHead className="bg-emerald-400 ">
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Year</StyledTableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {
              //Table body
              tableData.map((product: IProduct) => (
                <StyledTableRow
                  key={product.id}
                  className={`bg-[${product.color}]`}
                >
                  <StyledTableCell component="th" scope="row">
                    {product.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.year}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
