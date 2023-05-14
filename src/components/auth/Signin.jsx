import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import logo from "../../images/the-trade-journal-black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log(userCredential.user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-page-wrapper">
      <div className="sign-in-container">
        <form onSubmit={signIn}>
          <img class="sign-in-image" src={logo} alt="app-logo" />
          <label className="label">
            Email Address
            <input
              type="email"
              required
              placeholder="user@example.com"
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
          <button type="submit">Log In</button>
        </form>
        <div className="not-registered">
          <Link to="/sign-up">
            <h2>Not registered?</h2>
            <p> Sign up here </p>
          </Link>
        </div>
        <div className="social-icons">
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

export default SignIn;
