import React from "react";
import { useGetUserPerformanceQuery } from "state/api";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
// import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
  console.log(data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return params.value.length;
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      <Box
        mt="40px"
        height={"75vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            // backgroundColor: theme.palette.primary.light,
            width: "0.5rem",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
            background: "none",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          //   components={{
          //     ColumnMenu: CustomColumnMenu,
          //   }}
        />
      </Box>
    </Box>
  );
};

export default Performance;
