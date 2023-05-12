import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import logo from "../../images/avault.png";
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
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <img src={logo} alt="app-logo" />
        <h1>Log In to your Account</h1>
        <label className="email-label">
          Email Address
          <input
            type="email"
            required
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label className="password-label">
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
        <Link to="/sign-up">Not registered? Sign up here </Link>
      </div>
      <div className="social-media">
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

export default SignIn;
