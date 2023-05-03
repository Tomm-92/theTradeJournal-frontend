import React from "react";

const AddTradeEntry = () => {
  return (
    <div>
      Add Trade Entry Page
      <form>
        <label>
          Currency/Crypto
          <input />
        </label>
        <label>
          Trade Open Date
          <input />
        </label>
        <label>
          Trade Open Time
          <input />
        </label>
        <label>
          Trade Close Date
          <input />
        </label>
        <label>
          Trade Close Time
          <input />
        </label>
        <label>
          Entry Price
          <input />
        </label>
        <label>
          Exit Price
          <input />
        </label>
        <label>
          Trade Outcome
          <input />
        </label>
        <label>
          Percentage gain/loss
          <input />
        </label>
        <label>
          Observations
          <input />
        </label>
        <button>Add Row</button>
        <button>Submit</button>
      </form>
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

export default AddTradeEntry;
