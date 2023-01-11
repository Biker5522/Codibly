import React from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import ProductsTable from "./components/productsTable";

function App() {
  function createData(id: number, name: string, year: number) {
    return { id, name, year };
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "name", width: 130 },
    { field: "year", headerName: "year", width: 130 },
  ];
  const rows = [
    createData(1, "example ", 2000),
    createData(2, "example2", 2010),
  ];
  return (
    <div className="App w-full h-[100vh] p-16">
      <div className="w-[40%] m-auto">
        {/* Header  */}
        <div className=" flex flex-col justify-center align-middle items-center gap-2">
          <h2 className="text-4xl border-l-[7px] pl-4 border-emerald-400">
            Products
          </h2>
          {/* Search box */}
          <div className="flex items-end gap-2   ">
            <SearchIcon className="mb-1 scale-125" />
            <TextField id="standard-basic" label="Id" variant="standard" />
          </div>
          {/* Table */}
          <ProductsTable />
        </div>
      </div>
    </div>
  );
}

export default App;
