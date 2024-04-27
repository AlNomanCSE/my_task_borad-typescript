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
  done: boolean;
}

app.post(
  "/create",
  async (req: Request<any, any, TodoRequestBodyType>, res: Response) => {
    const newTodo = await TodoModel.create({
      title: req.body.title,
      details: req.body.details,
      done: req.body.done,
    });

    res.json(newTodo);
  }
);

app.get("/todos", async (req: Request, res: Response) => {
  const response = await TodoModel.find({});
  res.json(response);
});

app.put(
  "/updatedone/:id",
  async (
    req: Request<{ id: string }, any, { done: boolean }>,
    res: Response
  ) => {
    const id: string = req.params.id;
    const { done } = req.body;
    try {
      const updatedTodo = await TodoModel.findByIdAndUpdate(
        { _id: id },
        { done },
        { new: true }
      );
      if (!updatedTodo)
        res.status(404).send({ error: "No todo Found with this id" });
      else res.status(200).send(updatedTodo);
    } catch (error) {
      res.status(500).send({ error: "Server Error ...!" });
    }
  }
);
app.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const id: string = req.params.id;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete({ _id: id });
    if (!deletedTodo)
      res.status(404).send({ error: "No todo Found with this id" });
    else res.status(200).send(deletedTodo);
  } catch (error) {
    res.status(500).send({ error: "Server Error ...!" });
  }
});

mongoose.connect("mongodb://localhost:27017/todo").then(() => {
  app.listen(PORT, () => {
    console.log("server Running on ...", PORT);
  });
});
