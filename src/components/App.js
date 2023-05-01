import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/app.css";

const App = () => {
  const [data, setData] = useState("");

  const getData = async () => {
    const response = await Axios.get("http://localhost:3000/getData");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>Hello {data}</div>;
};

export default App;
