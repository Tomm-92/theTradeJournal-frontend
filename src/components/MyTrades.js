import React, { useState } from "react";
import "../styles/mytrades.css";

const MyTrades = ({ trades, handleEdit, handleSaveUpdate, handleDelete }) => {

  const [editingTradeId, setEditingTradeId] = useState(null);

  if(!trades || trades.length === 0){
    return null;
  }

  const handleEditClick = (tradeId) => {
    setEditingTradeId(tradeId);
  };

  const handleSaveUpdateClick = (tradeId, updatedOutcome) => {
    const updatedData = {
      trade_outcome: updatedOutcome,
    };
    handleSaveUpdate(tradeId, updatedData);
    setEditingTradeId(null);
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
                  defaultValue={trade.trade_outcome}
                  ref={(input) => input && input.focus()}
                  onBlur={(e) => handleSaveUpdateClick(trade.id, e.target.value)}
                  />
               </>
            ) : (
              <h5 className="card-title">{trade.currency_crypto}</h5>
            )}
              <h6 className="card-subtitle">{trade.trade_data_open}</h6>            
              <p className="card-text">
                Trade Outcome: {" "}
                  <span className={`trade-outcome-${trade.trade_outcome.toLowerCase()}`}>
                    {trade.trade_outcome}
                  </span>{" "}
                  | Trade Close Date: {trade.trade_close_date} | Entry Price: {" "}
                  <span className="entry-price">{trade.entry_price}</span> | Exit Price: {" "}
                  <span className="exit-price">{trade.exit_price}</span>
              </p>
                  <div className="button-container">
                    {editingTradeId === trade.id ? (
                      <button className="save-button" onClick={() => handleSaveUpdateClick(trade.id)}>
                      Save
                    </button>
                    ) : (
                      <button className="edit-button" onClick={() => handleEditClick(trade.id)}>
                        Edit
                      </button> 
                    )}
                    <button className="delete-button" onClick={() => handleDeleteClick(trade.id)}>
                      Delete
                    </button>
                  </div>
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
