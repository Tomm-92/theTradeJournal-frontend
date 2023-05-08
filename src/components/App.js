import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/app.css";
import NavBar from "./NavBar";
import AddTradeEntry from "./AddTradeEntry";
import MyTrades from "./MyTrades";
import Signin from "./auth/Signin.jsx";
import SignUp from "./auth/SignUp.jsx";
import { auth } from "../firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [trades, setTrades] = useState("");

  const getData = async () => {
    const response = await Axios.get("http://localhost:3000/getData");
    setData(response.data);
  };

  const getTrades = async () => {
    const response = await Axios.get("http://localhost:3000/tradeHistory");
    setTrades(response.data);
  };

  useEffect(() => {
    getData();
    getTrades();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserID(firebaseUser.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleEdit = (tradeId) => {
    const trade = trades.find((trade) => trade.id === tradeId);
    console.log("Editing trade:", trade);
  };

  const handleSaveUpdate = async (tradeId, updatedData) => {
    try {
      await Axios.patch(
        `http://localhost:3000/tradeHistory/${tradeId}`,
        updatedData
      );

      const updatedTrades = trades.map((trade) => {
        if (trade.id === tradeId) {
          return { ...trade, ...updatedData };
        }
        return trade;
      });
      setTrades(updatedTrades);

      console.log("Trade updated successfully");
    } catch (error) {
      console.log("Error updating trade:", error);
      console.log(tradeId);
      console.log(updatedData);
    }
  };

  const handleDelete = async (tradeId) => {
    try {
      await Axios.delete(`http://localhost:3000/tradehistory/${tradeId}`);
      const updatedTrades = trades.filter((trade) => trade.id !== tradeId);
      setTrades(updatedTrades);

      console.log("Trade deleted successfully");
    } catch (error) {
      console.log("Error deleting trade:", error);
    }
  };

  if (!user)
    return (
      <Router>
        <div className="">
          <div>Hello</div>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/add-trade-entry" element={<Signin />} />
            <Route path="/my-trades" element={<Signin />} />
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
          <Route
            path="/add-trade-entry"
            element={<AddTradeEntry userID={userID} />}
          />
          <Route
            path="/my-trades"
            element={
              <MyTrades
                trades={trades}
                handleEdit={handleEdit}
                handleSaveUpdate={handleSaveUpdate}
                handleDelete={handleDelete}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
