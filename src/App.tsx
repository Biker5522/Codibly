import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Provider } from "react-redux";
import { store } from "./store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApi } from "./redux/apiSlice";

import { TableComponent } from "./components/tableComponent";
import { useNavigate } from "react-router-dom";

function App() {
  const [idSearch, setIdSearch] = useState<number | null | undefined>(
    undefined
  );
  const navigate = useNavigate();
  //Prevent from typing "-" and '+' sign
  const handleKeyDown = (event: any) => {
    if (event.key === "-" || event.key === "+") {
      event.preventDefault();
    }
  };

  //Get id value from search input
  const handleChange = (event: any) => {
    if (event.target.value <= 0 || !event.target.value) {
      event.target.value = null;
      setIdSearch(null);
      navigate(`/products?page=1`);
    } else {
      setIdSearch(event.target.value);
    }
  };

  return (
    <Provider store={store}>
      <ApiProvider api={productsApi}>
        <div className="App w-full h-[100vh] lg:p-16 pt-16  ">
          <div className=" lg:w-[40em] m-auto shadow-lg h-[37em]">
            {/* Header  */}
            <div className=" flex flex-col justify-center align-middle items-center gap-2">
              <h2 className="text-5xl border-l-[7px] lg:pl-4 border-emerald-400">
                Products
              </h2>
              {/* Search box */}
              <div className="flex items-end gap-2 w-[9em] mb-4">
                <SearchIcon className="mb-1 scale-125" />
                <TextField
                  id="standard-basic"
                  label="Id"
                  variant="standard"
                  placeholder="Id"
                  type="number"
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                />
              </div>
              {/* Table */}
              <TableComponent id={idSearch} />
            </div>
          </div>
        </div>
      </ApiProvider>
    </Provider>
  );
}

export default App;
