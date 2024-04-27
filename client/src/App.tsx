import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import Addnewtask from "./components/Addnewtask";
import Completed from "./components/Completed";
import Heading from "./components/Heading";
import Progress from "./components/Progress";
import TaskList from "./components/TaskList";
import { Link } from "react-router-dom";

type DataType = {
  __v: number;
  _id: string;
  details: string;
  title: string;
};
export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DataType>();
  const [isTaskOpen, setIsTaskOpen] = useState<boolean>(false);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [todos, setTodos] = useState<DataType[]>([]);
  function handleClickTask() {
    setIsTaskOpen(!isTaskOpen);
  }
  function handleClickList() {
    setIsListOpen(!isListOpen);
  }

  const onSubmit: SubmitHandler<DataType> = async (data: DataType) => {
    await fetch("http://localhost:5000/todo/create", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        details: data.details,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reset();
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };
  useEffect(() => {
    async function fatchData() {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTodos(data);
    }
    fatchData();
  }, []);
  async function handelete(id: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMassage = await response.text();
        throw new Error(errorMassage || "Failed to delet todo");
      }
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:");
    }
  }
  return (
    <section className="h-screen flex items-center justify-center bg-black">
      <div className="bg-gradient rounded-lg p-[3px]">
        <div className="p-[100px] bg-slate-900 rounded-lg flex items-center flex-col gap-6 relative overflow-hidden ">
          <Heading />
          <Progress />
          <Completed />
          <TaskList onClick={handleClickList} />
          <Addnewtask onClick={handleClickTask} />
          {isAlertVisible && (
            <Alert className="bg-green-700 z-10 fixed top-[40%] w-[300px] shadow-2xl">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>Successfully added todo...</AlertDescription>
            </Alert>
          )}
          {isListOpen && (
            <div className="bg-gradient absolute right-0 h-full top-0 w-3/5 p-2">
              {todos.map((todo, index) => (
                <div key={index} className="border rounded-lg p-2 my-2 mx-4">
                  <div className="font-bold flex justify-between">
                    <p> {todo.title}</p>
                    <img
                      width="0"
                      height="0"
                      src="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-edit-websites-soft-fill-soft-fill-juicy-fish.png"
                      alt="external-edit-websites-soft-fill-soft-fill-juicy-fish"
                      className="w-[23px] object-contain"
                    />
                  </div>
                  <div className="font-extralight">{todo.details}</div>
                  <div className="flex  justify-end">
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/plasticine/100/filled-trash.png"
                      alt="filled-trash"
                      onClick={() => handelete(todo._id)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {isTaskOpen && (
            <div className="bg-gradient absolute right-0 h-full top-0 w-3/5 p-2">
              <form
                className="p-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <label className="block mb-2 text-white font-bold">
                  Task Name
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: { value: true, message: "Title is required" },
                    maxLength: {
                      value: 20,
                      message: "Title should be under 20 charecter",
                    },
                  })}
                  className="border p-2 mb-4 w-full rounded-lg"
                />
                <p className="text-red-500">{errors.title?.message}</p>
                <label className="block mb-2 text-white font-bold">
                  Task Details
                </label>
                <textarea
                  {...register("details", {
                    required: { value: true, message: "Detailes is required" },
                    minLength: {
                      value: 15,
                      message: "Details should be More then 20 charecter",
                    },
                  })}
                  className="border p-2 w-full rounded-lg"
                ></textarea>
                <p className="text-red-500">{errors.details?.message}</p>
                <div className="flex justify-end">
                  <Button className="bg-white text-gray-900 font-bold shadow-2xl my-4 hover:text-white transition-colors duration-200">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
