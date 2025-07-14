"use client";

import React from "react";
import { useGetTeamsQuery } from "@/state/api";
// import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  ExportCsv,
  FilterPanelTrigger,
  GridColDef,
  Toolbar,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { Loader2, AlertTriangle } from "lucide-react";

const CustomToolbar = () => (
  <Toolbar className="flex items-center justify-between px-4 py-2">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <FilterPanelTrigger />
      <ExportCsv />
    </div>
    <p className="hidden text-xs text-gray-400 sm:block">
      Manage and export user data
    </p>
  </Toolbar>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },

  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },

  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Users = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();

  return (
    <div className="flex w-full flex-col gap-6 p-8">
      <Header name="Teams" />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-gray-600">
          <Loader2 className="mr-2 animate-spin" />
          Loading teams...
        </div>
      )}

      {/* Error State */}
      {isError || !teams ? (
        <div className="flex items-center justify-center py-20 text-red-500">
          <AlertTriangle className="mr-2" />
          Error fetching teams. Please try again later.
        </div>
      ) : (
        // Data Grid
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <DataGrid
            rows={teams || []}
            columns={columns}
            // each row needs a unique ID
            pagination
            // disableRowSelectionOnClick
            slots={{ toolbar: CustomToolbar }}
            className={`${dataGridClassNames} `}
            sx={dataGridSxStyles}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
