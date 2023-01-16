import { useGetProductsQuery } from "../redux/apiSlice";
import ProductsTable from "../components/productsTable";

// interface Props {
//   page?: number;
// }

export const ProductsDetails = (props: any) => {
  const { data: products, isLoading } = useGetProductsQuery(props.page);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (!products?.data) {
    return <div>No posts:(</div>;
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
