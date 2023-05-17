import React from "react";

const Filter = ({ showFilteredTrades, userId, trades }) => {
  const filteredList = [
    ...new Set(trades.map((currency) => currency.currency_crypto)),
  ];

  const handleDropdownValue = (e) => {
    let newArray;
    switch (e.target.value) {
      case "EUR/USD":
      case "USD/JPY":
      case "GBP/USD":
      case "USD/CHF":
      case "USD/CAD":
      case "AUD/USD":
      case "NZD/USD":
      case "Bitcoin":
      case "Ethereum":
      case "Tether":
      case "BNB":
      case "USD Coin":
      case "XRP":
      case "Cardano":
      case "Dogecoin":
      case "Polygon":
      case "Solana":
        newArray = trades.filter(function (currency) {
          return currency.currency_crypto === e.target.value;
        });
        console.log("newArray", newArray);
        showFilteredTrades(newArray);
        break;
      default:
        showFilteredTrades(trades);
        break;
    }
  };
  return (
    <div>
      <select onChange={handleDropdownValue}>
        <option></option>
        {trades
          ? filteredList.map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
};

export default Filter;
