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
          <select
            id="currency_crypto"
            name="currency_crypto"
            value={fields.currency_crypto}
            onChange={handleFieldChange}
            required
          >
            <option value="EUR/USD">EUR/USD</option>
            <option value="USD/JPY">USD/JPY</option>
            <option value="GBP/USD">GBP/USD</option>
            <option value="USD/CHF">USD/CHF</option>
            <option value="USD/CAD">USD/CAD</option>
            <option value="AUD/USD">AUD/USD</option>
            <option value="NZD/USD">NZD/USD</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Tether">Tether</option>
            <option value="BNB">BNB</option>
            <option value="USD Coin">USD Coin</option>
            <option value="XRP">XRP</option>
            <option value="Cardano">Cardano</option>
            <option value="Dogecoin">Dogecoin</option>
            <option value="Polygon">Polygon</option>
            <option value="Solana">Solana</option>
          </select>
        </label>
        <label htmlFor="trade_direction">
          Trade Direction
          <select
            id="trade_direction"
            name="trade_direction"
            value={fields.trade_direction}
            onChange={handleFieldChange}
            required
          >
            <option value="Long">Long</option>
            <option value="Short">Short</option>
          </select>
        </label>
        <label htmlFor="trade_outcome">
          Trade Outcome
          <select
            id="trade_outcome"
            name="trade_outcome"
            value={fields.trade_outcome}
            onChange={handleFieldChange}
            required
          >
            <option value="Win">Win</option>
            <option value="Lose">Lose</option>
          </select>
        </label>
        <label htmlFor="trade_open_date">
          Trade Open Date
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            id="trade_open_date"
            name="trade_open_date"
            value={fields.trade_open_date}
            onChange={handleFieldChange}
            required
          />
        </label>
        <label htmlFor="trade_open_time">
          Trade Open Time
          <input
            id="trade_open_time"
            name="trade_open_time"
            value={fields.trade_open_time}
            onChange={handleFieldChange}
            type="time"
          />
        </label>
        <label htmlFor="trade_close_date">
          Trade Close Date
          <input
            id="trade_close_date"
            name="trade_close_date"
            value={fields.trade_close_date}
            onChange={handleFieldChange}
            type="date"
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </label>
        <label htmlFor="trade_close_time">
          Trade Close Time
          <input
            id="trade_close_time"
            name="trade_close_time"
            value={fields.trade_close_time}
            onChange={handleFieldChange}
            type="time"
          />
        </label>
        <label htmlFor="entry_price">
          Entry Price
          <input
            id="entry_price"
            name="entry_price"
            value={fields.entry_price}
            onChange={handleFieldChange}
            type="number"
            required
          />
        </label>
        <label htmlFor="exit_price">
          Exit Price
          <input
            id="exit_price"
            name="exit_price"
            value={fields.exit_price}
            onChange={handleFieldChange}
            type="number"
            required
          />
        </label>
        <label htmlFor="observations">
          Observations
          <input
            type="text"
            id="observations"
            name="observations"
            value={fields.observations}
            onChange={handleFieldChange}
            placeholder="Maximum 500 characters"
            maxLength="500"
          />
        </label>
        <button>Add Row</button>
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
