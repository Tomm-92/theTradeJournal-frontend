import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const LogIn = () => {
  return (
    <div>
      Log In Page
      <img src={logo} alt="app-logo" />
      <form>
        <label>
          Email address
          <input placeholder="e.g. johnsmith@gmail.com" />
        </label>
        <label>
          Password
          <input />
        </label>
        <button>
          Sign In <Link to="/my-trades"></Link>
        </button>
      </form>
      <Link to="/sign-up">Not registered? Sign up here </Link>
      <div>
        <a href="https://twitter.com/" alt="twitter">
          Twitter
        </a>
        <a href="https://facebook.com/" alt="Facebook">
          Facebook
        </a>
        <a href="https://instagram.com/" alt="Instagram">
          Instagram
        </a>
      </div>
    </div>
  );
};

export default LogIn;
