import * as React from "react";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import IProduct from "../interfaces/product";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

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
  maxPage?: number;
  products?: [];
  product?: IProduct;
};

export default function ProductsTable(props: Props) {
  const [productsData, setProductsData] = useState([]);
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [maxPage, setMaxPage] = useState<number>();
  //Navigation and url parameters
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  //Props
  const [page, setPage] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>();
  const [activeProduct, setActiveProduct] = useState<IProduct>();
  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (product: IProduct) => {
    setOpen(true);
    setActiveProduct(product);
  };
  const handleClose = () => setOpen(false);

  //Product Id state
  useEffect(() => {
    console.log(props.id + "passed prop");
    if (props.id) {
      setProductId(props.id);
    } else setProductId(null);
  }, [props.id]);

  //Page state and url changing
  useEffect(() => {
    if (params.get("page")) {
      setPage(Number(params.get("page")));
    } else if (!params.get("id") && !props.id) navigate(`/products?page=1`);
  }, [location]);

  //Setting Table Data : Products
  useEffect(() => {
    if (props.products) {
      setProductsData(props.products);
      setMaxPage(props.maxPage);
    }
  }, [props.products]);

  //Setting Table Data : Product
  useEffect(() => {
    if (props.product) {
      setProductData(props.product);
    }
  }, [props.product]);

  //Increment page number
  const increasePage = () => {
    if (page && maxPage && page < maxPage) {
      navigate(`/products?page=${page + 1}`);
    }
  };
  //Decrease page number
  const decreasePage = () => {
    if (page && page > 1) {
      navigate(`/products?page=${page - 1}`);
    }
  };

  //Modal styling
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "#FFFFFF",
    border: "2px solid #000",
    borderRadius: "14px",
    boxShadow: 24,
    p: 2,
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

              productsData.map((product: IProduct) => (
                <StyledTableRow
                  key={product.id}
                  className="hover:border-r-4  hover:border-green-300"
                  onClick={() => handleOpen(product)}
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
        <div className="justify-center text-white gap-2 flex border-b-2 m-2 pb-2 align-middle">
          <button
            onClick={decreasePage}
            className="bg-black rounded-md w-16 hover:bg-gray-500"
          >
            <NavigateBeforeIcon />
          </button>
          <span className="text-black">
            {page} of {maxPage}
          </span>
          <button
            onClick={increasePage}
            className="bg-black  rounded-md  w-16 hover:bg-gray-500"
          >
            <NavigateNextIcon />
          </button>
        </div>
      ) : null}
      {activeProduct ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              className="float-left w-10 h-10"
              style={{ backgroundColor: activeProduct.color }}
            ></div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <b>{activeProduct.name.toUpperCase()}</b>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Color</b>: {activeProduct.color}
            </Typography>
            <Typography id="modal-modal-description">
              <b> Year</b>: {activeProduct.year}
            </Typography>
            <Typography id="modal-modal-description">
              <b> Pantone Value</b>: {activeProduct.pantone_value}
            </Typography>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
