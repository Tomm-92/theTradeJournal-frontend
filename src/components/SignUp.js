import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      Sign Up here
      <form>
        <label>
          Name: <input placeholder="John Smith" />
        </label>
        <label>
          Email address: <input placeholder="e.g. johnsmith@gmail.com" />
        </label>
        <label>
          Password: <input />
        </label>
        <label>
          Confirm Password <input />
        </label>
        <button>
          Sign Up <Link to="/add-trade-entry"></Link>
        </button>
      </form>
      <Link to="/">Already Signed up? Log in here</Link>
    </div>
  );
};

export default SignUp;
