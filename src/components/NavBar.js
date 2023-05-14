import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/tradejournal.png";
import AuthDetails from "./authDetails";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="app-logo" className="navbar-logo" />
      </div>
      <div className="navbar-links">
        <Link to="/add-trade-entry">Add Trade Entry </Link>
        <Link to="/my-trades">My Trades </Link>
      </div>
      <div className="right-content">
        <AuthDetails />
      </div>
    </div>
  );
};

export default NavBar;
