import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import "../styles/addTradeEntry.css";

const AddTradeEntry = () => {
  const initialState = {
    fields: {
      currency_crypto: "",
      trade_direction: "",
      trade_outcome: "",
      trade_open_date: "",
      trade_open_time: "",
      trade_close_date: "",
      trade_close_time: "",
      entry_price: "",
      exit_price: "",
      observations: "",
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };

  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

  const handleAddTrade = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/tradeHistory/", fields)
      .then(() => {
        setAlert({
          message: "Trade Added",
          isSuccess: true,
        });
      })
      .catch(() =>
        setAlert({
          message: "Server error. Please come back later",
          isSuccess: false,
        })
      );
  };

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  return (
    <div className="add-trade">
      Add Trade Entry Page
      <form onSubmit={handleAddTrade}>
        <Alert message={alert.message} success={alert.isSuccess} />
        <label htmlFor="currency_crypto">
          Currency/Crypto
          <input
            type="text"
            required
            id="currency_crypto"
            name="currency_crypto"
            value={fields.currency_crypto}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="trade_direction">
          Trade Direction
          <input
            id="trade_direction"
            name="trade_direction"
            value={fields.trade_direction}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="trade_outcome">
          Trade Outcome
          <input
            id="trade_outcome"
            name="trade_outcome"
            value={fields.trade_outcome}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="trade_open_date">
          Trade Open Date
          <input
            type="date"
            required
            max={new Date().toISOString().split("T")[0]}
            id="trade_open_date"
            name="trade_open_date"
            value={fields.trade_open_date}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="trade_open_time">
          Trade Open Time
          <input
            type="time"
            id="trade_open_time"
            name="trade_open_time"
            value={fields.trade_open_time}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="trade_close_date">
          Trade Close Date
          <input
            type="date"
            required
            max={new Date().toISOString().split("T")[0]}
            id="trade_close_date"
            name="trade_close_date"
            value={fields.trade_close_date}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="trade_close_time">
          Trade Close Time
          <input
            type="time"
            id="trade_close_time"
            name="trade_close_time"
            value={fields.trade_close_time}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="entry_price">
          Entry Price
          <input
            type="number"
            required
            id="entry_price"
            name="entry_price"
            value={fields.entry_price}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="exit_price">
          Exit Price
          <input
            type="number"
            required
            id="exit_price"
            name="exit_price"
            value={fields.exit_price}
            onChange={handleFieldChange}
          />
        </label>
        <label htmlFor="observations">
          Observations
          <input
            type="text"
            placeholder="Maximum 500 characters"
            maxLength="500"
            id="observations"
            name="observations"
            value={fields.observations}
            onChange={handleFieldChange}
          />
        </label>
        <button type="submit" className="add-trade__submit-button">
          {" "}
          Submit
        </button>
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
