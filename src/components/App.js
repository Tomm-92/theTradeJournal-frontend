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
  const [userID, setUserID] = useState("");

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

  if (!user)
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/add-trade-entry" element={<Signin alert={alert} />} />
          <Route path="/my-trades" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    );

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MyTrades />} />
        <Route path="/sign-up" element={<AddTradeEntry />} />
        <Route
          path="/add-trade-entry"
          element={<AddTradeEntry userID={userID} />}
        />
        <Route path="/my-trades" element={<MyTrades />} />
      </Routes>
    </Router>
  );
};

export default App;
