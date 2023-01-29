import { useGetProductQuery } from "../redux/apiSlice";
import ProductsTable from "../components/productsTable";
interface Props {
  id: number;
}
export const ProductDetail = (props: Props) => {
  const { data: product, isLoading, error } = useGetProductQuery(props.id);

  //Loading data
  if (isLoading) {
    return <div>Loading</div>;
  }

  //If data is empty
  if (!product?.data) {
    return <div>No posts:</div>;
  }

  //Handling errors
  if (error && error.status === 404) {
    return <div>Product not found</div>;
  } else if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ProductsTable product={product.data} id={props.id} />
    </div>
  );
};
