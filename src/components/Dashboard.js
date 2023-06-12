import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Table from "./coinTable/CoinTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      fontWeightLight: 800,
      fontWeightRegular: 900,
      fontWeightMedium: 800,
    },
  });

  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("news");

  useEffect(() => {
    fetch(
      `https://api.newscatcherapi.com/v2/latest_headlines?&topic=${category}&lang=en&page_size=9&countries=uk,us`,
      {
        headers: {
          "x-api-key": process.env.REACT_APP_NEWSCATCHER_API,
        },
      }
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
            href="https://twitter.com/Newsquawk?ref_src=twsrc%5Etfw"
            data-width="350"
            data-height="1770"
            data-chrome="transparent"
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
          <Menu
            active={active}
            setActive={setActive}
            setCategory={setCategory}
          />
          <NewsGrid items={items} />
        </div>
        <div className="dashboard-page-footer">
          <div className="dashboard-media-footer">
            <a href="https://twitter.com/" alt="twitter">
              <FontAwesomeIcon icon="fa-brands fa-twitter" /> |
            </a>
            <a href="https://facebook.com/" alt="Facebook">
              <FontAwesomeIcon icon="fa-brands fa-facebook" /> |
            </a>
            <a href="https://instagram.com/" alt="Instagram">
              <FontAwesomeIcon icon="fa-brands fa-square-instagram" />
            </a>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
