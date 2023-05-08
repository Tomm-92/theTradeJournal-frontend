import React, { useState } from "react";
import "../styles/mytrades.css";

const MyTrades = ({ trades, handleEdit, handleSaveUpdate, handleDelete }) => {

  const [editingTradeId, setEditingTradeId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  if(!trades || trades.length === 0){
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
    if(Object.keys(updatedFields).length === 0) {
      setEditingTradeId(null);
      return;;
    }

    handleSaveUpdate(tradeId, updatedFields);
    setEditingTradeId(null);
    setUpdatedFields({});
  };

  const handleDeleteClick = (tradeId) => {
    handleDelete(tradeId);
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
                  defaultValue={updatedFields.currency_crypto || trade.currency_crypto}
                  onChange={(e) => handleFieldChange('currency_crypto', e.target.value)}
                  />
                <input
                  type="text"
                  defaultValue={updatedFields.trade_outcome || trade.trade_outcome}
                  onChange={(e) => handleFieldChange('trade_outcome', e.target.value)}
                  />
                <input
                  type="text"
                  defaultValue={updatedFields.trade_close_date || trade.trade_close_date}
                  onChange={(e) => handleFieldChange('trade_close_date', e.target.value)}
                  />
                <input
                  type="text"
                  defaultValue={updatedFields.entry_price || trade.entry_price}
                  onChange={(e) => handleFieldChange('entry_price', e.target.value)}
                  />
                <input
                  type="text"
                  defaultValue={updatedFields.exit_price || trade.exit_price}
                  onChange={(e) => handleFieldChange('exit_price', e.target.value)}
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
                Currency Pair/Crypto: {" "}
                  <span className="card-title">
                    {trade.currency_crypto}
                    </span> {" "} |
                Trade Outcome: {" "}
                  <span className={`trade-outcome-${trade.trade_outcome.toLowerCase()}`}>
                    {trade.trade_outcome}
                  </span>{" "}
                  | 
                      Trade Close Date: <span className="trade-close-date">
                       {trade.trade_close_date}
                    </span>{" "}
                  | Entry Price: {" "}
                  <span className="entry-price">{trade.entry_price}</span> | Exit Price: {" "}
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
