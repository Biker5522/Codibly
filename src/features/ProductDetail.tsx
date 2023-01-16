import { useGetProductQuery } from "../redux/apiSlice";
import ProductsTable from "../components/productsTable";
// interface Props {
//   id: number;
// }
export const ProductDetail = (props: any) => {
  const { data: product, isLoading, error } = useGetProductQuery(props.id);
  console.log(props.id);
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!product?.data) {
    return <div>No posts:</div>;
  }
  if (product.error) {
    return <div>{product.error}</div>;
  }
  if (error && error.status === 404) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductsTable product={product.data} id={props.id} />
    </div>
  );
};
