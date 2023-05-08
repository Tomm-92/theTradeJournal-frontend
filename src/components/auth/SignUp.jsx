import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Enter your first name"
          id="first_name"
          name="first_name"
          value={fields.first_name}
          onChange={handleFieldChange}
        ></input>
        <input
          type="text"
          placeholder="Enter your last name"
          id="last_name"
          name="last_name"
          value={fields.last_name}
          onChange={handleFieldChange}
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
