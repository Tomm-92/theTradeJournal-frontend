import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from "axios";
import "../styles/app.css";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import AddTradeEntry from "./AddTradeEntry";
import MyTrades from "./MyTrades";
import SignUp from "./SignUp";

const App = () => {
  const [data, setData] = useState("");

  const getData = async () => {
    const response = await Axios.get("http://localhost:3000/getData");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Router>
      <div className="">
        <div>Hello {data}</div>
        <NavBar />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/add-trade-entry" element={<AddTradeEntry />} />
          <Route path="/my-trades" element={<MyTrades />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
