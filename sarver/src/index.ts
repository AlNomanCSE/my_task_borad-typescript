import express, { Request, Response } from "express";
const app = express();
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from Server");
});
app.listen(PORT, () => {
  console.log("server Running on ...", PORT);
});
