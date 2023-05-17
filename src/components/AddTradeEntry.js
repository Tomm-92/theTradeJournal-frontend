import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "./Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/addTrades1.css";
import icon from "../images/iconblack.png";

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

  useEffect(() => {
    setTimeout(() => {
      setAlert({ message: "" });
    }, 30000);
  });

  const handleAddTrade = (event) => {
    event.preventDefault();
    console.log("User ID:", userID);
    axios
      .post("http://localhost:3000/tradeHistory/", {
        ...fields,
        firebase_uid: userID,
      })
      .then(() => {
        setAlert({
          message: "Trade Added",
          isSuccess: true,
        });
        setFields(initialState.fields);
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

  const [data, setData] = useState();

  const handleUpload = (e) => {
    setData(e.target.files[0]);
    console.log(e.target.files);
    console.log(e.target.files[0]);
  };

  const uploadToServer = () => {
    const formData = new FormData();
    formData.append("file", data);
    //const body = { form: formData, firebase_uid: userID };
    return axios
      .post("http://localhost:3000/tradehistory/csv/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="add-trades-wrapper">
      <div className="add-trades-container">
        <img className="icon" src={icon} alt="app-logo" />
        <form className="form" onSubmit={handleAddTrade}>
          <Alert message={alert.message} success={alert.isSuccess} />
          <div>
            <label className="btn btn-default">
              <input type={"file"} accept={".csv"} onChange={handleUpload} />
            </label>

            <button className="btn btn-success" onClick={uploadToServer}>
              Upload
            </button>
          </div>
          <label className="label1" htmlFor="currency_crypto">
            Currency/Crypto
            <select
              className="label1"
              type="text"
              required
              id="currency_crypto"
              name="currency_crypto"
              value={fields.currency_crypto}
              onChange={handleFieldChange}
            >
              <option value=""></option>
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
          <label className="label2" htmlFor="trade_direction">
            Trade Direction
            <select
              className="label2"
              type="text"
              required
              id="trade_direction"
              name="trade_direction"
              value={fields.trade_direction}
              onChange={handleFieldChange}
            >
              {" "}
              <option value=""></option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
          </label>
          <label className="label3" htmlFor="trade_outcome">
            Trade Outcome
            <select
              className="label3"
              type="text"
              required
              id="trade_outcome"
              name="trade_outcome"
              value={fields.trade_outcome}
              onChange={handleFieldChange}
            >
              <option value=""></option>
              <option value="Win">Win</option>
              <option value="Lose">Lose</option>
            </select>
          </label>
          <label className="label4" htmlFor="trade_open_date">
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
          <label className="label5" htmlFor="trade_open_time">
            Trade Open Time
            <input
              type="time"
              required
              id="trade_open_time"
              name="trade_open_time"
              value={fields.trade_open_time}
              onChange={handleFieldChange}
            />
          </label>
          <label className="label6" htmlFor="trade_close_date">
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
          <label className="label7" htmlFor="trade_close_time">
            Trade Close Time
            <input
              type="time"
              required
              id="trade_close_time"
              name="trade_close_time"
              value={fields.trade_close_time}
              onChange={handleFieldChange}
            />
          </label>
          <label className="label8" htmlFor="entry_price">
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
          <label className="label9" htmlFor="exit_price">
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
          <label className="label10" htmlFor="observations">
            Observations
            <input
              className="observations-field"
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
            <FontAwesomeIcon icon="fa-brands fa-twitter" /> |
          </a>
          <a href="https://facebook.com/" alt="Facebook">
            <FontAwesomeIcon icon="fa-brands fa-facebook" /> |
          </a>
          <a href="https://instagram.com/" alt="Instagram">
            <FontAwesomeIcon icon="fa-brands fa-square-instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddTradeEntry;
