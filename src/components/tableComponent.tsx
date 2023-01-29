import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsDetails } from "../features/ProductsDetails";
import { ProductDetail } from "../features/ProductDetail";

interface Props {
  id?: number | null;
}

export const TableComponent = (props: Props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [page, setPage] = useState<number>();
  const [id, setId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    //page params
    if (params.get("page")) {
      setPage(Number(params.get("page")));
    } else {
      setPage(1);
    }
    //id from param
    if (params.get("id") && props.id === undefined) {
      setId(Number(params.get("id")));
    }
    //id from props
    else if (props.id && Number(props.id) !== Number(params.get("id"))) {
      navigate(`/products?id=${props.id}`);
    } else if (params.get("id") && props.id) {
      setId(Number(params.get("id")));
    } else {
      setId(null);
    }
  }, [params, location, navigate, props.id]);

  return (
    <div>
      {!id ? <ProductsDetails page={page} /> : <ProductDetail id={id} />}
    </div>
  );
};
