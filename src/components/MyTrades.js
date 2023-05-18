import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../images/iconblack.png";
import "../styles/mytrades.css";
import Filter from "./filter";

const MyTrades = () => {
  const [editingTradeId, setEditingTradeId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [firebaseUid, setFirebaseUid] = useState("");
  const [updatedFields, setUpdatedFields] = useState({});
  const [trades, setTrades] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const { uid } = user;
      setFirebaseUid(uid);
      getTrades(uid);
    }
  }, [location]);

  const getTrades = async (firebaseUid) => {
    const response = await Axios.get("http://localhost:3000/tradehistory", {
      params: {
        firebase_uid: firebaseUid,
      },
    });
    setTrades(
      response.data.sort(
        (tradeA, tradeB) =>
          new Date(tradeB.createdAt) - new Date(tradeA.createdAt)
      )
    );
    setFilteredTrades(
      response.data.sort(
        (tradeA, tradeB) =>
          new Date(tradeB.createdAt) - new Date(tradeA.createdAt)
      )
    );
  };

  if (!trades || trades.length === 0) {
    return null;
  }

  const handleEditClick = (tradeId) => {
    setEditingTradeId(tradeId);
  };

  const handleFieldChange = (fieldName, fieldValue) => {
    setUpdatedFields((prevFields) => ({
      ...prevFields,
      [fieldName]: fieldValue,
    }));
  };

  const handleSaveUpdateClick = (tradeId) => {
    if (Object.keys(updatedFields).length === 0) {
      setEditingTradeId(null);
      return;
    }

    handleSaveUpdate(tradeId, updatedFields);
    setEditingTradeId(null);
    setUpdatedFields({});
  };

  const handleDeleteClick = (tradeId) => {
    handleDelete(tradeId);
  };

  const handleSaveUpdate = async (tradeId, updatedData) => {
    try {
      const { data: updatedTrade } = await Axios.patch(
        `http://localhost:3000/tradeHistory/${tradeId}`,
        updatedData
      );

      const updatedTrades = trades
        .map((trade) => {
          if (trade.id === tradeId) {
            return updatedTrade;
          }
          return trade;
        })
        .sort(
          (tradeA, tradeB) =>
            new Date(tradeB.createdAt) - new Date(tradeA.createdAt)
        );
      setTrades(updatedTrades);
      setFilteredTrades(updatedTrades);

    } catch (error) {
      console.log("Error updating trade:", error);

    }
  };

  const handleDelete = async (tradeId) => {
    try {
      await Axios.delete(`http://localhost:3000/tradehistory/${tradeId}`);
      const updatedTrades = trades.filter((trade) => trade.id !== tradeId);
      setTrades(updatedTrades);
      setFilteredTrades(updatedTrades);

      console.log("Trade deleted successfully");
    } catch (error) {
      console.log("Error deleting trade:", error);
    }
  };

  return (
    <>
      <Filter
        showFilteredTrades={setFilteredTrades}
        userId={firebaseUid}
        trades={trades}
      />
      <div className="card-parent">
        {filteredTrades.map((trade) => (
          <div className="card" key={trade.id}>
            <div className="card-body">
              {editingTradeId === trade.id ? (
                <>
                  <label htmlFor={`currency_crypto_${trade.id}`}>
                    Currency Pair/Crypto:
                  </label>
                  <input
                    type="text"
                    id={`currency_crypto_${trade.id}`}
                    defaultValue={
                      updatedFields.currency_crypto || trade.currency_crypto
                    }
                    onChange={(e) =>
                      handleFieldChange("currency_crypto", e.target.value)
                    }
                  />
                  <label htmlFor={`trade_outcome_${trade.id}`}>
                    Trade Outcome:
                  </label>
                  <input
                    type="text"
                    id={`trade_outcome_${trade.id}`}
                    defaultValue={
                      updatedFields.trade_outcome || trade.trade_outcome
                    }
                    onChange={(e) =>
                      handleFieldChange("trade_outcome", e.target.value)
                    }
                  />
                  <label htmlFor={`trade_open_date_${trade.id}`}>
                    Trade Open Date:
                  </label>
                  <input
                    type="text"
                    id={`trade_outcome_${trade.id}`}
                    defaultValue={
                      updatedFields.trade_open_date || trade.trade_open_date
                    }
                    onChange={(e) =>
                      handleFieldChange("trade_open_date", e.target.value)
                    }
                  />
                  <label htmlFor={`trade_close_date_${trade.id}`}>
                    Trade Close Date:
                  </label>
                  <input
                    type="text"
                    id={`trade_outcome_${trade.id}`}
                    defaultValue={
                      updatedFields.trade_close_date || trade.trade_close_date
                    }
                    onChange={(e) =>
                      handleFieldChange("trade_close_date", e.target.value)
                    }
                  />
                  <label htmlFor={`entry_price_${trade.id}`}>
                    Entry Price:
                  </label>
                  <input
                    type="text"
                    id={`trade_outcome_${trade.id}`}
                    defaultValue={
                      updatedFields.entry_price || trade.entry_price
                    }
                    onChange={(e) =>
                      handleFieldChange("entry_price", e.target.value)
                    }
                  />
                  <label htmlFor={`exit_price_${trade.id}`}>Exit Price:</label>
                  <input
                    type="text"
                    id={`trade_outcome_${trade.id}`}
                    defaultValue={updatedFields.exit_price || trade.exit_price}
                    onChange={(e) =>
                      handleFieldChange("exit_price", e.target.value)
                    }
                  />
                  <label htmlFor={`observations_${trade.id}`}>
                    Observations:
                  </label>
                  <textarea
                    id={`observations_${trade.id}`}
                    className="trade-observation-input"
                    defaultValue={
                      updatedFields.observations || trade.observations
                    }
                    onChange={(e) =>
                      handleFieldChange("observations", e.target.value)
                    }
                  />
                  <button
                    className="save-button"
                    onClick={() => handleSaveUpdateClick(trade.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h6 className="card-subtitle">{trade.trade_data_open}</h6>
                  <img className="icon-mytrades" src={icon} alt="app-logo" />
                  <p className="card-text">
                    <span className="label-currency">
                      Currency Pair/Crypto:{" "}
                    </span>
                    <span className="card-title">{trade.currency_crypto}</span>{" "}
                    | <span className="label-outcome">Trade Outcome: </span>
                    <span
                      className={`trade-outcome-${trade.trade_outcome.toLowerCase()}`}
                    >
                      {trade.trade_outcome}
                    </span>{" "}
                    | <span className="label">Trade Open Date: </span>
                    <span className="trade-open-date">
                      {trade.trade_open_date}
                    </span>{" "}
                    | <span className="label">Trade Close Date: </span>
                    <span className="trade-close-date">
                      {trade.trade_close_date}
                    </span>{" "}
                    | <span className="label">Entry Price: </span>
                    <span className="entry-price">
                      {trade.entry_price}
                    </span> | <span className="label">Exit Price: </span>
                    <span className="exit-price">{trade.exit_price}</span>
                  </p>
                  <p className="card-text">
                    <span className="label">Observation: </span>
                    <span className="trade-observation">
                      {trade.observations}
                    </span>
                  </p>
                  <div className="button-container">
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(trade.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(trade.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="my-trades-page-footer">
        <div className="social-media-footer">
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
    </>
  );
};

export default MyTrades;
