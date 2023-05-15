import React, { useEffect, useState } from "react";
import Axios from "axios";

const Filter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [eventValue, setEventValue] = useState();

  const getFilteredTrades = async () => {
    const response = await Axios.get(`http://localhost:3000/tradeHistory/`);
    setCurrencies(response.data);
    console.log(response);
    console.log(response.data);
  };

  useEffect(() => {
    getFilteredTrades();
  }, []);

  console.log(eventValue);

  return (
    <div>
      <select onChange={(e) => setEventValue(e.target.value)}>
        <option></option>
        {currencies
          ? currencies.map((trade) => {
              return (
                <option key={trade.id} value={trade.currency_crypto}>
                  {trade.currency_crypto}
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
};

export default Filter;
