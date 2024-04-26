import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import TodoModel from "./models/Todo";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

interface TodoRequestBodyType {
  title: string;
  details: string;
}

app.post(
  "/create",
  async (req: Request<any, any, TodoRequestBodyType>, res: Response) => {
    const newTodo = await TodoModel.create({
      title: req.body.title,
      details: req.body.details,
    });
    res.json(newTodo);
  }
);

app.get("/", async (req: Request, res: Response) => {
  const response = await TodoModel.find({});
  res.json(response);
});

mongoose.connect("mongodb://localhost:27017/todo").then(() => {
  app.listen(PORT, () => {
    console.log("server Running on ...", PORT);
  });
});
