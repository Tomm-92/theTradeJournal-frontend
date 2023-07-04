import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTwitter,
  faFacebook,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";
import AddTradeEntry from "./AddTradeEntry";
import MyTrades from "./MyTrades";
import SignUp from "../firebase/auth/signup";
import SignIn from "../firebase/auth/signin";
import Dashboard from "./Dashboard";
import { auth } from "../firebase/firebase";

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
          <Route path="/" element={<SignIn />} />
          <Route path="/add-trade-entry" element={<SignIn alert={alert} />} />
          <Route path="/my-trades" element={<SignIn />} />
          <Route path="/dashboard" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    );

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-up" element={<AddTradeEntry />} />
        <Route
          path="/add-trade-entry"
          element={<AddTradeEntry userID={userID} />}
        />
        <Route path="/my-trades" element={<MyTrades />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

library.add(fas, faTwitter, faFacebook, faInstagramSquare);

export default App;
