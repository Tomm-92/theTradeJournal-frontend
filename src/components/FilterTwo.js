import React, { useEffect, useState } from "react";
import Axios from "axios";

const FilterTwo = () => {
  const [currencies, setCurrencies] = useState([]);
  const [records, setRecords] = useState([]);
  const [id, setID] = useState([]);

  const getFilteredTrades = async () => {
    const response = await Axios.get(
      `http://localhost:3000/tradeHistory/${id}`
    );
    setCurrencies(response.data);
    setRecords(response.data);
    console.log(response);
  };

  useEffect(() => {
    getFilteredTrades();
  }, []);

  /*const filter = (event) => {
    setRecords(currencies.filter((trade) => 18 === event.target.value));
    setRecords(records);
    console.log(currencies.id);
  }; */

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

export default FilterTwo;
