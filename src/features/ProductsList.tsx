import { useEffect, useState } from "react";
import { useGetAllProductsQuery, useGetProductsQuery } from "../redux/apiSlice";
import IProduct from "../interfaces/product";
import ProductsTable from "../components/productsTable";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
  page: number;
}

export const ProductsList = (props: any) => {
  const { data: products, isLoading } = useGetProductsQuery(props.page);
  console.log("ProductsList" + props.page);
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!products?.data) {
    return <div>No posts:(</div>;
  }

  return (
    <div>
      <ProductsTable products={products.data} page={props.page} />
    </div>
  );
};
