import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Table from "./coinTable/CoinTable";
import "../styles/coinTable.css";
import Menu from "./news/Menu";
import NewsGrid from "./news/NewsGrid";

const Dashboard = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apikey=021baff830cb4c8fa2c688eefdd78b46`
    )
      .then((res) => res.json())
      .then((data) => console.log(data.articles));
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="coin-table">
          <Table />
        </div>
      </ThemeProvider>
      <div className="App">
        <h1 className="title"> See the latest news</h1>
        <Menu />
        <NewsGrid />
      </div>
    </>
  );
};

export default Dashboard;
