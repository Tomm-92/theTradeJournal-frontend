import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Enter your first name"
          minLength="1"
          maxLength="50"
          pattern="[\p{L}\p{M}\s]{1,50}"
          title=""
          required
        ></input>
        <input
          type="text"
          placeholder="Enter your last name"
          minLength="1"
          maxLength="50"
          pattern="[\p{L}\p{M}\s]{1,50}"
          required
        ></input>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input type="password" placeholder="Confirm your password"></input>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/">Already Signed up? Log in here</Link>
    </div>
  );
};

export default SignUp;
