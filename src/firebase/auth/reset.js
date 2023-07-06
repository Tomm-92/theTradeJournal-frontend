import React, { useRef, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import logo from "../../images/the-trade-journal-black.png";
import Alert from "../../components/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/signin.css";

const ResetPassword = () => {
  const emailRef = useRef();
  const [alert, setAlert] = useState({ message: "", isSuccess: false });
  const { forgotPassword } = useUserContext();

  const passwordReset = (e) => {
    const email = emailRef.current.value;
    e.preventDefault();
    if (email)
      forgotPassword(email)
        .then(() => (emailRef.current.value = ""))
        .then(() => {
          setAlert({
            message: "Password reset email sent!",
            isSuccess: true,
          });
        });
  };

  return (
    <div className="sign-in-page-wrapper">
      <div className="sign-in-container">
        <form onSubmit={passwordReset}>
          <img className="sign-in-image" src={logo} alt="app-logo" />
          <label className="label">
            Email Address
            <input
              type="email"
              required
              placeholder="user@example.com"
              ref={emailRef}
            ></input>
          </label>
          <button type="submit">Reset your password</button>
        </form>
        <div className="not-registered">
          <Link to="/">
            <h2>Sign in </h2>
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
        <br></br>
        <Alert message={alert.message} success={alert.isSuccess} />
      </div>
    </div>
  );
};

export default ResetPassword;
