import { useGetProductQuery } from "../redux/apiSlice";
import ProductsTable from "../components/productsTable";
// interface Props {
//   id: number;
// }
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
