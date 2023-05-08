import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import "../styles/mytrades.css";

const MyTrades = () => {
  const [editingTradeId, setEditingTradeId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [trades, setTrades] = useState("");
  const location = useLocation();

  const getTrades = async () => {
    const response = await Axios.get("http://localhost:3000/tradeHistory");
    setTrades(
      response.data.sort(
        (tradeA, tradeB) =>
          new Date(tradeB.createdAt) - new Date(tradeA.createdAt)
      )
    );
  };

  useEffect(() => {
    getTrades();
  }, [location]);

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
      console.log(updatedTrade);

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

      console.log("Trade updated successfully");
    } catch (error) {
      console.log("Error updating trade:", error);
      console.log(tradeId);
      console.log(updatedData);
    }
  };

  const handleDelete = async (tradeId) => {
    try {
      await Axios.delete(`http://localhost:3000/tradehistory/${tradeId}`);
      const updatedTrades = trades.filter((trade) => trade.id !== tradeId);
      setTrades(updatedTrades);

      console.log("Trade deleted successfully");
    } catch (error) {
      console.log("Error deleting trade:", error);
    }
  };

  return (
    <>
      <div>
        {trades.map((trade) => (
          <div className="card" key={trade.id}>
            <div className="card-body">
              {editingTradeId === trade.id ? (
                <>
                  <input
                    type="text"
                    defaultValue={
                      updatedFields.currency_crypto || trade.currency_crypto
                    }
                    onChange={(e) =>
                      handleFieldChange("currency_crypto", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    defaultValue={
                      updatedFields.trade_outcome || trade.trade_outcome
                    }
                    onChange={(e) =>
                      handleFieldChange("trade_outcome", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    defaultValue={
                      updatedFields.trade_close_date || trade.trade_close_date
                    }
                    onChange={(e) =>
                      handleFieldChange("trade_close_date", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    defaultValue={
                      updatedFields.entry_price || trade.entry_price
                    }
                    onChange={(e) =>
                      handleFieldChange("entry_price", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    defaultValue={updatedFields.exit_price || trade.exit_price}
                    onChange={(e) =>
                      handleFieldChange("exit_price", e.target.value)
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
                  <p className="card-text">
                    Currency Pair/Crypto:{" "}
                    <span className="card-title">{trade.currency_crypto}</span>{" "}
                    | Trade Outcome:{" "}
                    <span
                      className={`trade-outcome-${trade.trade_outcome.toLowerCase()}`}
                    >
                      {trade.trade_outcome}
                    </span>{" "}
                    | Trade Close Date:{" "}
                    <span className="trade-close-date">
                      {trade.trade_close_date}
                    </span>{" "}
                    | Entry Price:{" "}
                    <span className="entry-price">{trade.entry_price}</span> |
                    Exit Price:{" "}
                    <span className="exit-price">{trade.exit_price}</span>
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
      <div>
        My Trades Page
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
    </>
  );
};

export default MyTrades;
