import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Table from "./coinTable/CoinTable";
import "../styles/dashboard.css";
import Menu from "./news/Menu";
import NewsGrid from "./news/NewsGrid";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: `"Nunito", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 800,
    },
  });

  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("business");

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pagesize=9&apikey=021baff830cb4c8fa2c688eefdd78b46`
    )
      .then((res) => res.json())
      .then((data) => setItems(data.articles));
  }, [category]);

  return (
    <ThemeProvider theme={theme}>
      <div className="page">
        <div className="twitter">
          <a
            className="twitter-timeline"
            data-theme="dark"
            href="https://twitter.com/Newsquawk?ref_src=twsrc%5Etfw"
            data-width="385"
            data-height="1415"
          >
            Tweets by Newsquawk
          </a>{" "}
          <Helmet>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"
            ></script>
          </Helmet>
        </div>
        <div className="coin-table">
          <Table />
        </div>

        <div className="App">
          <NewsGrid items={items} />
          <Menu
            active={active}
            setActive={setActive}
            setCategory={setCategory}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
