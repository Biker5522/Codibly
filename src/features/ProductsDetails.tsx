import { useGetProductsQuery } from "../redux/apiSlice";
import ProductsTable from "../components/productsTable";

interface Props {
  page?: number;
}

export const ProductsDetails = (props: Props) => {
  const { data: products, isLoading, error } = useGetProductsQuery(props.page);
  //Loading data
  if (isLoading) {
    return <div>Loading</div>;
  }
  //If data is null
  if (!products?.data) {
    return <div>No posts:(</div>;
  }
  //Handling errors
  if (error && error.status === 404) {
    return <div>Product not found</div>;
  } else if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ProductsTable
        products={products.data}
        page={props.page}
        maxPage={products.total_pages}
      />
    </div>
  );
};
