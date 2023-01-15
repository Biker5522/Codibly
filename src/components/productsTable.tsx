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

//Props
type Props = {
  id?: number | null;
  page?: number;
  products?: [];
  product?: IProduct;
};

export default function ProductsTable(props: Props) {
  const [tableData, setTableData] = useState([]);
  const [productData, setProductData] = useState<IProduct | null>(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [page, setPage] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>();
  const navigate = useNavigate();
  //console.log("ProductTable............" + page);
  //Check when id changes and set product id
  useEffect(() => {
    console.log(props.id);
    if (props.id) {
      setProductId(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    if (params.get("page")) {
      console.log("Set page to params");
      setPage(Number(params.get("page")));
    } else if (!params.get("id") && !props.id) navigate(`/products?page=1`);
  }, [location]);

  useEffect(() => {
    if (props.products) {
      setTableData(props.products);
      //console.log(props.products);
    }
  }, [props.products]);

  useEffect(() => {
    if (props.product) {
      setProductData(props.product);
      console.log(props.products);
    }
  }, [props.product]);

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
            {!productId ? (
              //Table body
              tableData.map((product: IProduct) => (
                <StyledTableRow
                  key={product.id}
                  //className={`bg-[${product.color}]`}
                  //className={`bg-[${product.color}]`}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ backgroundColor: product.color }}
                  >
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
            ) : //Table body
            productData ? (
              <StyledTableRow
                key={productData.id}
                className={`bg-blue`}
                style={{ backgroundColor: productData.color }}
              >
                <StyledTableCell component="th" scope="row">
                  {productData.id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {productData.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {productData.year}
                </StyledTableCell>
              </StyledTableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      {!productId ? (
        <div className="justify-center text-white gap-2 flex border-b-2 m-2 pb-2">
          <button
            onClick={decreasePage}
            className="bg-black rounded-md p-[3px] hover:bg-gray-500"
          >
            Previous
          </button>
          <button
            onClick={increasePage}
            className="bg-black  rounded-md p-[3px] hover:bg-gray-500"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
