import React, { useEffect, useState } from "react";
import Axios from "axios";

const Filter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [id, setID] = useState([]);

  const getFilteredTrades = async () => {
    const response = await Axios.get(
      `http://localhost:3000/tradeHistory/${id}`
    );
    setCurrencies(response.data);
    console.log(response);
  };

  useEffect(() => {
    getFilteredTrades();
  }, []);

  console.log(id);

  return (
    <div>
      <select onChange={(e) => setID(e.target.value)}>
        <option></option>
        {currencies
          ? currencies.map((trade) => {
              return (
                <option key={trade.id} value={trade.id}>
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
