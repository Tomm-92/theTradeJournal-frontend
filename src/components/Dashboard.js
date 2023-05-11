import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import Table from "./coinTable/CoinTable";
import "../styles/coinTable.css";

const Dashboard = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="coin-table">
        <Table />
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
