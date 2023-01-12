import React, { useEffect, useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import ProductsTable from "./components/productsTable";

function App() {
  const [idSearch, setIdSearch] = useState<number>();
  useEffect(() => {
    console.log(idSearch);
  }, [idSearch, setIdSearch]);

  //Get id value from search input
  const handleChange = (event: any) => {
    setIdSearch(event.target.value);
  };

  return (
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
              onChange={handleChange}
            />
          </div>
          {/* Table */}
          <ProductsTable id={idSearch} />
        </div>
      </div>
    </div>
  );
}

export default App;
