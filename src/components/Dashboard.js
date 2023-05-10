import React from "react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div>
        <a
          class="twitter-timeline"
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
