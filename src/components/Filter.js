import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

const Filter = () => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  const buildQueryString = (operation, valueObj) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });

    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentQueryParams[operation] || "{}"),
        ...valueObj,
      }),
    };

    return qs.stringify(newQueryParams, {
      addQueryPrefix: true,
      encode: false,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const newQueryString = buildQueryString("query", {
      currency_crypto: { $regex: query },
    });
    navigate(newQueryString);
  };

  return (
    <div className="select-parent">
      <div className="select-child">
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          <option value=""></option>
          <option>Select</option>
          <option value="EUR/USD">EUR/USD</option>
          <option value="USD/JPY">USD/JPY</option>
          <option value="GBP/USD">GBP/USD</option>
          <option value="USD/CHF">USD/CHF</option>
          <option value="USD/CAD">USD/CAD</option>
          <option value="AUD/USD">AUD/USD</option>
          <option value="NZD/USD">NZD/USD</option>
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Tether">Tether</option>
          <option value="BNB">BNB</option>
          <option value="USD Coin">USD Coin</option>
          <option value="XRP">XRP</option>
          <option value="Cardano">Cardano</option>
          <option value="Dogecoin">Dogecoin</option>
          <option value="Polygon">Polygon</option>
          <option value="Solana">Solana</option>
        </select>
        <h1>{value}</h1>
      </div>
      <div className="link-test">
        <Link to={buildQueryString("query", { currency_crypto: "BNB" })}>
          BNB
        </Link>
      </div>
      <div className="search">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Enter Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" type="submit"></button>
        </form>
      </div>
    </div>
  );
};

export default Filter;
