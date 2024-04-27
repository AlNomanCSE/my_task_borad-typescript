import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: String,
  details: String,
  done: Boolean,
});

const TodoModel = mongoose.model("todo", todoSchema);
export default TodoModel;
