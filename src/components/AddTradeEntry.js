import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import "../styles/addTradeEntry.css";

const AddTradeEntry = ({ userID }) => {
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
  const [trades, setTrades] = useState("");

  const handleAddTrade = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/tradeHistory/", fields)
      .then(({ data }) => {
        setTrades(data.id);
      })
      .then(() => {
        axios.patch(`http://localhost:3000/tradeHistory/${trades}`, {
          fireBaseId: userID,
        });
      })
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

  /* if (handleAddTrade) {
    axios.patch(`http://localhost:3000/tradeHistory/${trades}`, {
      fireBaseId: `${userID}`,
    });
  } */

  return (
    <div className="add-trade">
      Add Trade Entry Page
      <form onSubmit={handleAddTrade}>
        <Alert message={alert.message} success={alert.isSuccess} />
        <label>
          Currency/Crypto
          <input
            id="currency_crypto"
            name="currency_crypto"
            value={fields.currency_crypto}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Trade Direction
          <input
            id="trade_direction"
            name="trade_direction"
            value={fields.trade_direction}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Trade Outcome
          <input
            id="trade_outcome"
            name="trade_outcome"
            value={fields.trade_outcome}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Trade Open Date
          <input
            id="trade_open_date"
            name="trade_open_date"
            value={fields.trade_open_date}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Trade Open Time
          <input
            id="trade_open_time"
            name="trade_open_time"
            value={fields.trade_open_time}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Trade Close Date
          <input
            id="trade_close_date"
            name="trade_close_date"
            value={fields.trade_close_date}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Trade Close Time
          <input
            id="trade_close_time"
            name="trade_close_time"
            value={fields.trade_close_time}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Entry Price
          <input
            id="entry_price"
            name="entry_price"
            value={fields.entry_price}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Exit Price
          <input
            id="exit_price"
            name="exit_price"
            value={fields.exit_price}
            onChange={handleFieldChange}
          />
        </label>
        <label>
          Observations
          <input
            id="observations"
            name="observations"
            value={fields.observations}
            onChange={handleFieldChange}
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
