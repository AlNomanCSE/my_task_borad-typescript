import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: String,
  details: String,
});

const TodoModel = mongoose.model("todo", todoSchema);
export default TodoModel;
