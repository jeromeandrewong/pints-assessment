import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

const PORT = 5001,
  app = express();

app.use(cors());
app.use(bodyParser.json());
const symbolArr = ["AAPL", "NFLX", "GOOG", "AMZN", "TSLA"];
app.get("/api/v1", async (req: Request, res: Response) => {
  const apiKey = process.env.IEX_API_TOKEN;

  try {
    const iexResponse = await axios.get(
      `https://apis.iex.cloud/v1/data/CORE/QUOTE/aapl,nflx,goog,amzn,tsla?token=${apiKey}`
    );
    const logoUrlArr = symbolArr.map(
      (symbol) => `https://storage.googleapis.com/iex/api/logos/${symbol}.png`
    );

    res.json([...iexResponse.data, logoUrlArr]);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
