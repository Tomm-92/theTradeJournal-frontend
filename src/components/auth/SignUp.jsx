import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../images/the-trade-journal-black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/signup.css";
import "../../index.css";

const SignUp = () => {
  const initialState = {
    fields: {
      first_name: "",
      last_name: "",
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fields, setFields] = useState(initialState.fields);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        axios
          .post("https://thetradejournal-backend.onrender.com/users/", {
            email_address: `${userCredential.user.email}`,
            firebase_uid: `${userCredential.user.uid}`,
            first_name: fields.first_name,
            last_name: fields.last_name,
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  return (
    <div className="sign-up-page-wrapper">
      <div className="sign-up-container">
        <form onSubmit={signUp}>
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
              value={fields.first_name}
              onChange={handleFieldChange}
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
              value={fields.last_name}
              onChange={handleFieldChange}
            ></input>
          </label>
          <label className="label">
            Email Address
            <input
              type="email"
              required
              placeholder="user@example.com"
              title="Please enter a valid email address e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
