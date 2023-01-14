import { useState } from "react";
import { useGetAllProductsQuery } from "../redux/apiSlice";
import IProduct from "../interfaces/product";
import ProductsTable from "../components/productsTable";

export const ProductsList = () => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(page);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!products?.data) {
    return <div>No posts:(</div>;
  }

  return (
    <div>
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <ProductsTable products={products.data} page={1} />
    </div>
  );
};
