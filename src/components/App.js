import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Axios from "axios";
import "../styles/app.css";
import NavBar from "./NavBar";
import AddTradeEntry from "./AddTradeEntry";
import MyTrades from "./MyTrades";
import Signin from "./auth/Signin.jsx";
import SignUp from "./auth/SignUp.jsx";
import { auth } from "../firebase";

const App = () => {
  const [data, setData] = useState("");
  const [user, setUser] = useState(null);
  const [trades, setTrades] = useState("");

  const getData = async () => {
    const response = await Axios.get("http://localhost:3000/getData");
    setData(response.data);
  };

  const getTrades = async () => {
    const response = await Axios.get("http://localhost:3000/tradeHistory");
    setTrades(response.data)
  }

  useEffect(() => {
    getData();
    getTrades();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  if (!user)
    return (
      <Router>
        <div className="">
          <div>Hello {data}</div>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    );

  return (
    <Router>
      <div className="">
        <div>Hello {trades.length > 0 && trades[0].id}</div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MyTrades />} />
          <Route path="/add-trade-entry" element={<AddTradeEntry />} />
          <Route path="/my-trades" element={<MyTrades trades={trades} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
