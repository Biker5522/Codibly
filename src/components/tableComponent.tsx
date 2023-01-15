import { useEffect, useState } from "react";
import { useGetAllProductsQuery, useGetProductsQuery } from "../redux/apiSlice";
import IProduct from "../interfaces/product";
import ProductsTable from "../components/productsTable";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ProductsList } from "../features/ProductsList";
import { ProductList } from "../features/ProductList";

interface Props {
  id?: number;
}

export const TableComponent = (props: Props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [page, setPage] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (params.get("page")) {
      setPage(Number(params.get("page")));
    } else {
      setPage(1);
    }
    if (props.id && props.id != Number(params.get("id"))) {
      navigate(`/products?id=${props.id}`);
    } else if (props.id == null && !params.get("id")) {
      setId(null);
    } else if (params.get("id")) {
      console.log("id param: " + params.get("id"));
      setId(Number(params.get("id")));
    }
  }, [params, location]);

  return (
    <div>{!id ? <ProductsList page={page} /> : <ProductList id={id} />}</div>
  );
};
