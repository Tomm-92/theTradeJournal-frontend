import React, { useState } from "react";

const DynamicSelectOption = () => {
  const [value, setValue] = useState("");
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
    </div>
  );
};

export default DynamicSelectOption;
