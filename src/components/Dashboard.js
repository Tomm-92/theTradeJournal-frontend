import { createTheme, ThemeProvider } from "@mui/material";
import Table from "./coinTable/CoinTable";
import Table1 from "./fxTable/FxTable";
import "../styles/dashboard.css";

const Dashboard = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="coin-table">
          <Table />
          <Table1 />
        </div>
      </ThemeProvider>
      <div>
        Dashboard
        <div></div>
      </div>
    </>
  );
};

export default Dashboard;
