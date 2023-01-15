import { useEffect, useState } from "react";
import { useGetAllProductsQuery, useGetProductQuery } from "../redux/apiSlice";
import IProduct from "../interfaces/product";
import ProductsTable from "../components/productsTable";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
  id: number;
}

export const ProductList = (props: any) => {
  const { data: product, isLoading } = useGetProductQuery(props.id);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!product?.data) {
    return <div>No posts:(</div>;
  }

  return (
    <div>
      <ProductsTable product={product.data} id={props.id} />
    </div>
  );
};
