import { useEffect, useState } from "react";
import { useGetAllProductsQuery, useGetProductsQuery } from "../redux/apiSlice";
import IProduct from "../interfaces/product";
import ProductsTable from "../components/productsTable";
import { useLocation, useSearchParams } from "react-router-dom";
import { ProductsList } from "../features/ProductsList";

export const TableComponent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [page, setPage] = useState<number | null>(null);

  useEffect(() => {
    console.log(params.get("page") + "TableComponent");
    if (params.get("page")) {
      console.log("Set page to params");
      setPage(Number(params.get("page")));
    } else {
      console.log("Set page to one");
      setPage(1);
    }
  }, [params, location]);

  return (
    <div>
      <ProductsList page={page} />
    </div>
  );
};
