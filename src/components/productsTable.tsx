import * as React from "react";
import { createMuiTheme, makeStyles, styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router";
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
import { Navigate } from "react-router-dom";

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
  page: number;
  products?: [];
};

export default function ProductsTable(props: Props) {
  const [tableData, setTableData] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [page, setPage] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>();

  console.log("ProductTable............" + page);
  //Check when id changes and set product id
  useEffect(() => {
    if (props.id) {
      setProductId(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    if (params.get("page")) {
      console.log("Set page to params");
      setPage(Number(params.get("page")));
    } else navigate(`/products?page=1`);
  }, [location]);

  useEffect(() => {
    if (props.products) {
      setTableData(props.products);
      //console.log(props.products);
    }
  }, [props.products]);
  const navigate = useNavigate();
  //let { data: Product, error: ProductError } = useGetProductQuery(1);
  const increasePage = () => {
    if (page) {
      navigate(`/products?page=${page + 1}`);
    }
  };
  const decreasePage = () => {
    if (page && page > 1) {
      navigate(`/products?page=${page - 1}`);
    }
  };

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
        <div>
          <button onClick={decreasePage}>Previous</button>
          <button onClick={increasePage}>Next</button>
        </div>
      </TableContainer>
    </div>
  );
}
