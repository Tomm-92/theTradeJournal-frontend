import React from "react";
import { render } from "@testing-library/react";
import MyTrades from "../components/MyTrades";
import { MemoryRouter } from "react-router-dom";

describe("MyTrades", () => {
    const validProps = {
            id: 1,
            currency_crypto: "BTC",
            trade_outcome: "Win",
            trade_open_date: "2023-05-01",
            trade_close_date: "2023-05-05",
            entry_price: 50000,
            exit_price: 55000,
            observations: "Some observation",
        };

    it("renders trades correctly", () => {

        const {asFragment} = render(
            <MemoryRouter>
                <MyTrades trades={validProps}/>
            </MemoryRouter>);
        expect(asFragment()).toMatchSnapshot();
    });
});