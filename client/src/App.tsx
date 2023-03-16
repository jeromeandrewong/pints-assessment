import axios from "axios";
import { useState, useEffect } from "react";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
function App() {
  const [data, setData] = useState();
  const [stockData, setStockData] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const urlWithProxy = `/api/v1`;

  const handleGet = async () => {
    await axios
      .get(urlWithProxy)
      .then((res) => {
        setData(res.data);
        console.log("test", res.data);
        setStockData(res.data.slice(0, 5));
        setImageUrl(res.data[5]);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("unexpected error:", err);
        }
      });
  };
  useEffect(() => {
    handleGet();
  }, []);
  console.log(" stock data", stockData, imageUrl);
  return (
    <div className="flex flex-col items-center py-10">
      {stockData.map((stock, ind) => {
        return (
          <div
            key={ind}
            className="flex items-center justify-center border-b-2 p-3"
          >
            <div className="mr-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-4  bg-gray-200">
              <img src={imageUrl[ind]} />
            </div>
            <div className="flex h-12 w-32 flex-col justify-between">
              <div className="text-xl font-semibold">{stock["symbol"]}</div>
              <div className="truncate text-ellipsis text-sm text-gray-400">
                {stock["companyName"]} Common Stock Price
              </div>
            </div>
            <div className="flex  h-12 w-32 flex-col justify-between">
              <div className="text-xl font-semibold">
                ${stock["latestPrice"]}
              </div>
              <div
                className={`flex justify-between text-xs ${
                  stock["change"] < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                <div className="flex items-center">
                  {stock["change"] < 0 ? <HiArrowSmDown /> : <HiArrowSmUp />}
                  {stock["change"].toFixed(2)}
                </div>
                <div>{(stock["changePercent"] * 100).toFixed(2)}%</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
