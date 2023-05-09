import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/signup.css"

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
          .post("http://localhost:3000/users/", {
            email_address: `${userCredential.user.email}`,
            fireBaseUid: `${userCredential.user.uid}`,
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
    <div className="sign-up-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <label htmlFor="first_name">
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
        <label htmlFor="last_name">
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
        <label>
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
        <label>
          Password
        <input
          type="password"
          required
          minLength="12"
          maxLength="50"
          placeholder="12-50 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        </label>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <Link to="/">Already Signed up? Log in here</Link>
    </div>
  );
};

export default SignUp;
