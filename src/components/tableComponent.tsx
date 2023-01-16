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
  const [page, setPage] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.get("page")) {
      setPage(Number(params.get("page")));
    } else {
      setPage(1);
    }
    if (Number(params.get("id")) && props.id == undefined && props.id != null) {
      console.log(props.id + "iddddd");
      console.log("switch 1");
      setId(Number(params.get("id")));
    } else if (props.id != null && props.id != Number(params.get("id"))) {
      console.log("switch 2");
      navigate(`/products?id=${props.id}`);
    } else if (props.id == undefined && params.get("id")) {
      console.log("switch 3");
      setId(Number(params.get("id")));
    } else if (props.id == null && !params.get("id")) {
      console.log("switch 3");
      setId(null);
    } else if (params.get("id") && props.id != null) {
      console.log("switch 4");
      setId(Number(params.get("id")));
    } else {
      console.log("switch 5");
      setId(null);
      navigate(`/products?page=1`);
    }
  }, [params, location]);

  return (
    <div>
      {!id ? <ProductsDetails page={page} /> : <ProductDetail id={id} />}
    </div>
  );
};
