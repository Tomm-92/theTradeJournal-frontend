import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/the-trade-journal.png";
import AuthDetails from "./authDetails";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="app-logo" className="navbar-logo" />
      </div>
      <div className="navbar-links">
        <Link to="/add-trade-entry">
          <h1>Add Trade Entry </h1>
        </Link>
        <Link to="/my-trades">
          <h1>My Trades </h1>{" "}
        </Link>
        <Link to="/dashboard">
          <h1> Dashboard </h1>{" "}
        </Link>
      </div>
      <div className="right-content">
        <AuthDetails />
      </div>
    </div>
  );
};

export default NavBar;
