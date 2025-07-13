"use client";

import React from "react";
import Image from "next/image";
import { useGetUsersQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  ExportCsv,
  FilterPanelTrigger,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  Toolbar,
} from "@mui/x-data-grid";
import {
  dataGridClassNames,
  dataGridSxStyles,
} from "@/lib/utils";
import { Loader2, AlertTriangle } from "lucide-react";

const CustomToolbar = () => (
  <Toolbar className="flex items-center justify-between px-4 py-2">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <FilterPanelTrigger />
      <ExportCsv />
    </div>
    <p className="text-xs text-gray-400 hidden sm:block">Manage and export user data</p>
  </Toolbar>
);

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <div className="flex w-full justify-center">
        <div className="h-9 w-9 overflow-hidden rounded-full border border-gray-200 shadow-sm">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    ),
  },
  { field: "teamId", headerName: "Team ID", width: 100 },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex w-full flex-col gap-6 p-8">
      <Header name="Users" />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-gray-600">
          <Loader2 className="animate-spin mr-2" />
          Loading users...
        </div>
      )}

      {/* Error State */}
      {isError || !users ? (
        <div className="flex items-center justify-center py-20 text-red-500">
          <AlertTriangle className="mr-2" />
          Error fetching users. Please try again later.
        </div>
      ) : (
        // Data Grid
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <DataGrid
            rows={users || []}
            columns={columns}
            // each row needs a unique ID
            getRowId={(row) => row.userId}
            pagination
            disableRowSelectionOnClick
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