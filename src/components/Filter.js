import React, { useEffect, useState } from "react";
import Axios from "axios";

const Filter = ({ showFilteredTrades }) => {
  const [currencies, setCurrencies] = useState([]);

  const getFilteredTrades = async () => {
    const response = await Axios.get(
      `http://localhost:3000/tradeHistory?firebase_uid=LuWXjwALnhNqYxk0bKuIoUXwJag2`
    );
    setCurrencies(response.data);
  };

  useEffect(() => {
    getFilteredTrades();
  }, []);

  const filteredList = [
    ...new Set(currencies.map((currency) => currency.currency_crypto)),
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
        newArray = currencies.filter(function (currency) {
          return currency.currency_crypto === e.target.value;
        });
        console.log("newArray", newArray);
        showFilteredTrades(newArray);
        break;
      default:
        showFilteredTrades(currencies);
        break;
    }
  };
  return (
    <div>
      <select onChange={handleDropdownValue}>
        <option></option>
        {currencies
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
