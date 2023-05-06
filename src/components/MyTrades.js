import React from "react";
import "../styles/mytrades.css";

const MyTrades = ({ trades }) => {

  if(!trades || trades.length === 0){
    return null;
  }
  return (
    <>
    <div>
      {trades.map((trade) => (
        <div className="card" key={trade.id}>
          <div className="card-body">
            <h5 className="card-title">{trade.currency_crypto}</h5>
            <h6 className="card-subtitle">
              {trade.trade_data_open}
            </h6>
            <p className="card-text">
              Trade Outcome: <span className={`trade-outcome-${trade.trade_outcome.toLowerCase()}`}>{trade.trade_outcome}</span> | Trade Close Date: {trade.trade_close_date} | Entry Price: <span className="entry-price">{trade.entry_price}</span> | Exit Price: <span className="exit-price">{trade.exit_price}</span>
            </p>
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
