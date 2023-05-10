import AddTradeEntry from "../components/AddTradeEntry";

jest.mock("../components/AddTradeEntry");

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST request", () => {
    it("should successfully post data to the backend database", async () => {
      const fields = {
        currency_crypto: "USD/JPY",
        trade_direction: "Long",
        trade_outcome: "Win",
        trade_open_date: "2023-05-06",
        trade_open_time: "11:11:11",
        trade_close_date: "2023-05-07",
        trade_close_time: "12:12:12",
        entry_price: "1000",
        exit_price: "2000",
        observations: "test observation",
      };

      const userID = "mock_UID";

      const expectedResponse = {
        status: 200,
        data: {
          currency_crypto: "USD/JPY",
          trade_direction: "Long",
          trade_outcome: "Win",
          trade_open_date: "2023-05-06",
          trade_open_time: "11:11:11",
          trade_close_date: "2023-05-07",
          trade_close_time: "12:12:12",
          entry_price: "1000",
          exit_price: "2000",
          observations: "test observation",
          firebase_uid: "xzy123456",
        },
      };

      AddTradeEntry.mockResolvedValue(expectedResponse); // Move this line here

      const response = await AddTradeEntry(userID);
      console.log(response);

      expect(response).toEqual(expectedResponse);

      /* expect(AddTradeEntry).toHaveBeenCalledWith(
        "http://localhost:3000/tradeHistory/",
        {
          ...fields,
          firebase_uid: userID,
        }
      ); */
    });
  });
});
