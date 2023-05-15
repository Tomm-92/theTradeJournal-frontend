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
    if (e.target.value === "Ethereum") {
      newArray = currencies.filter(function (currency) {
        return currency.currency_crypto === e.target.value;
      });
      console.log("newArray", newArray);
      showFilteredTrades(newArray);
    } else if (e.target.value === "EUR/USD") {
      newArray = currencies.filter(function (currency) {
        return currency.currency_crypto === e.target.value;
      });
      console.log("newArray", newArray);
      showFilteredTrades(newArray);
    } else {
      showFilteredTrades(currencies);
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
