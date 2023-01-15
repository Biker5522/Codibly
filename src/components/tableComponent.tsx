import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsList } from "../features/ProductsDetails";
import { ProductList } from "../features/ProductDetail";

interface Props {
  id?: number | null;
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
    if (props.id != null && props.id != Number(params.get("id"))) {
      navigate(`/products?id=${props.id}`);
    } else if (props.id == null && !params.get("id")) {
      setId(null);
    } else if (params.get("id") && props.id != null) {
      setId(Number(params.get("id")));
    } else {
      setId(null);
      navigate(`/products?page=1`);
    }
  }, [params, location]);

  return (
    <div>{!id ? <ProductsList page={page} /> : <ProductList id={id} />}</div>
  );
};
