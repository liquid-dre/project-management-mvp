// utils.ts or utils.tsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const dataGridClassNames =
  "border border-gray-200 bg-white shadow-sm rounded-xl transition-shadow duration-300 hover:shadow-md ";

export const dataGridSxStyles = () => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      color: ` ""}`,
      '& [role="row"] > *': {
        backgroundColor: `${"white"}`,
        borderColor: ` ""}`,
      },
    },
    "& .MuiIconbutton-root": {
      color: `${""}`,
    },
    "& .MuiTablePagination-root": {
      color: `${""}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${""}`,
    },
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${"e5e7eb"}`,
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${"e5e7eb"}`,
    },
  };
};