import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";

const Dashboard = () => {
  const getUSDBase = async () => {
    const response = await Axios.get(
      "https://api.exchangerate.host/latest?base=USD&symbols=JPY,CHF,CAD"
    );
    console.log(response);
  };

  const getEURBase = async () => {
    const response = await Axios.get(
      "https://api.exchangerate.host/latest?base=EUR&symbols=USD"
    );
    console.log(response);
  };

  const getGBPBase = async () => {
    const response = await Axios.get(
      "https://api.exchangerate.host/latest?base=GBP&symbols=USD"
    );
    console.log(response);
  };

  useEffect(() => {
    getUSDBase();
  }, []);

  return (
    <div>
      Dashboard
      <div></div>
      <div>
        <a
          className="twitter-timeline"
          href="https://twitter.com/Newsquawk?ref_src=twsrc%5Etfw"
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
    </div>
  );
};

export default Dashboard;
