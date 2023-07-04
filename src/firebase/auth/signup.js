import React, { useRef } from "react";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import logo from "../../images/the-trade-journal-black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/signup.css";
import "../../index.css";

const SignUp = () => {
  const emailRef = useRef();
  const first_nameRef = useRef();
  const last_nameRef = useRef();
  const psdRef = useRef();

  const { registerUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const first_name = first_nameRef.current.value;
    const last_name = last_nameRef.current.value;
    const password = psdRef.current.value;
    if (email && first_name && last_name && password)
      registerUser(email, first_name, last_name, password);
  };

  return (
    <div className="sign-up-page-wrapper">
      <div className="sign-up-container">
        <form onSubmit={onSubmit}>
          <img src={logo} alt="app-logo" />
          <label className="label">
            First Name
            <input
              type="text"
              placeholder="Barry"
              minLength="1"
              maxLength="50"
              pattern="[\p{L}\p{M}\s]{1,50}"
              title="Please only use letters and spaces"
              required
              id="first_name"
              name="first_name"
              ref={first_nameRef}
            ></input>
          </label>
          <label className="label">
            Last Name
            <input
              type="text"
              placeholder="White"
              minLength="1"
              maxLength="50"
              pattern="[\p{L}\p{M}\s]{1,50}"
              title="Please only use letters and spaces"
              required
              id="last_name"
              name="last_name"
              ref={last_nameRef}
            ></input>
          </label>
          <label className="label">
            Email Address
            <input
              type="email"
              required
              placeholder="user@example.com"
              title="Please enter a valid email address e.g. user@example.com"
              ref={emailRef}
            ></input>
          </label>
          <label className="label">
            Password
            <input
              type="password"
              required
              minLength="10"
              maxLength="50"
              placeholder="10-50 characters"
              ref={psdRef}
            ></input>
          </label>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <Link to="/">
          <div className="already-signed-up"></div>
          <h2>Already signed up? </h2>
          <p>Log in here</p>
        </Link>
        <div className="social-media-icons">
          <a href="https://twitter.com/" alt="twitter">
            <FontAwesomeIcon icon="fa-brands fa-twitter" /> |
          </a>
          <a href="https://facebook.com/" alt="Facebook">
            <FontAwesomeIcon icon="fa-brands fa-facebook" /> |
          </a>
          <a href="https://instagram.com/" alt="Instagram">
            <FontAwesomeIcon icon="fa-brands fa-square-instagram fa-10x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
