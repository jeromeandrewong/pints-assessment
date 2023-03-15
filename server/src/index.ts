import express, { Request, Response } from "express";
import axios from "axios";

const PORT = 5001,
  app = express();

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("hello Backend");
});

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
