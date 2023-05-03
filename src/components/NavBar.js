import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const NavBar = () => {
  return (
    <div>
      <ul>
        <img src={logo} alt="app-logo" />
        <Link to="/add-trade-entry">Add Trade Entry </Link>
        <Link to="/my-trades">My Trades </Link>
      </ul>
    </div>
  );
};

export default NavBar;
