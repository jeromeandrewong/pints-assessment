import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();

  const urlWithProxy = `/api/v1`;

  useEffect(() => {
    axios
      .get(urlWithProxy)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center py-10">
      <p className="py-5">{data}</p>
    </div>
  );
}

export default App;
