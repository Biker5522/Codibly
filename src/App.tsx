import React, { useEffect, useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ProductsTable from "./components/productsTable";
import { Provider } from "react-redux";
import { store } from "./store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApi } from "./redux/apiSlice";
import { ProductsList } from "./features/ProductsList";
import { useLocation, useSearchParams } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { TableComponent } from "./components/tableComponent";

function App() {
  const [idSearch, setIdSearch] = useState<number>();
  //Prevent from typing "-" sign
  const handleKeyDown = (event: any) => {
    if (event.key === "-" || event.key === "+") {
      event.preventDefault();
    }
  };

  //Get id value from search input
  const handleChange = (event: any) => {
    if (event.target.value < 0 || !event.target.value) {
      event.target.value = 0;
    } else {
      setIdSearch(event.target.value);
    }
  };

  return (
    <Router>
      <Provider store={store}>
        <ApiProvider api={productsApi}>
          <div className="App w-full h-[100vh] p-16  ">
            <div className=" w-[40em] m-auto shadow-lg h-[50em]">
              {/* Header  */}
              <div className=" flex flex-col justify-center align-middle items-center gap-2">
                <h2 className="text-5xl border-l-[7px] pl-4 border-emerald-400">
                  Products
                </h2>
                {/* Search box */}
                <div className="flex items-end gap-2 w-[8em] mb-2">
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
    </Router>
  );
}

export default App;
