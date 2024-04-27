import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Addnewtask from "./components/Addnewtask";
import Completed from "./components/Completed";
import Heading from "./components/Heading";
import Progress from "./components/Progress";
import TaskList from "./components/TaskList";

type DataType = {
  __v: number;
  _id: string;
  details: string;
  title: string;
  done: boolean;
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
  const [isCompleateTask, setIsCompleateTask] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [todos, setTodos] = useState<DataType[]>([]);
  const [doneTodos, setDoneTodos] = useState<DataType[]>([]);
  function handleClickTask() {
    setIsTaskOpen(!isTaskOpen);
  }
  function handleCompleateTask() {
    setIsCompleateTask(!isCompleateTask);
  }
  function handleClickList() {
    setIsListOpen(!isListOpen);
  }

  //?--------------- CREATE TODO ----------------//
  const onSubmit: SubmitHandler<DataType> = async (data: DataType) => {
    await fetch("http://localhost:5000/create", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        details: data.details,
        done: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await fetch("http://localhost:5000/todos");
    const Data: DataType[] = await response.json();
    setTodos(Data);
    reset();
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 1000);
  };
  //?-------------- Use for GET all TODOS ------------//
  useEffect(() => {
    async function fatchData() {
      const response = await fetch("http://localhost:5000/todos");
      const data: DataType[] = await response.json();
      setTodos(data);
      setDoneTodos(data.filter((datum) => datum.done === true));
    }
    fatchData();
  }, []);

  //?---------------- DELETE TODO by ID -----------------//
  async function handelete(id: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMassage = await response.text();
        throw new Error(errorMassage || "Failed to delet todo");
      }
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      setDoneTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:");
    }
  }

  //?--------------- UPDATE one Property of TODO by ID -----------//
  //*------------ Done Task ---------------//

  async function handleDone(id: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:5000/updatedone/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: true,
        }),
      });
      if (!response.ok) {
        const errorMassage = await response.text();
        throw new Error(errorMassage || "Failed to Update todo");
      }
      // const updatedTodo = await response.json();
      // setDoneTodos((prev) => [...prev, updatedTodo]);
    } catch (error) {
      console.error("Error Updating ...");
    }
  }
  console.log(doneTodos);

  return (
    <section className="h-screen flex items-center justify-center bg-black">
      <div className="bg-gradient rounded-lg p-[3px]">
        <div className="p-[100px] bg-slate-900 rounded-lg flex items-center flex-col gap-6 relative overflow-hidden ">
          <Heading />
          <Progress />
          <Completed onClick={handleCompleateTask} />
          <TaskList onClick={handleClickList} />
          <Addnewtask onClick={handleClickTask} />
          {isAlertVisible && (
            <Alert className="bg-green-700 z-10 fixed top-[40%] w-[300px] shadow-2xl">
              <AlertTitle>Successfully!</AlertTitle>
              <AlertDescription>Added todo...</AlertDescription>
            </Alert>
          )}
          {isCompleateTask && (
            <div className="bg-[#8DECB4] absolute right-0 h-full top-0 w-3/5 p-2 overflow-y-auto">
              {doneTodos.map((todo, index) => (
                <div
                  key={index}
                  className="border-[3px] border-green-700 rounded-lg p-3 my-2 mx-4 flex flex-col gap-4"
                >
                  <div className="font-bold flex justify-between relative">
                    <p> {todo.title}</p>
                  </div>
                  <div className="font-extralight">{todo.details}</div>
                  <img
                    width="48"
                    height="48"
                    src="https://img.icons8.com/doodle/48/checkmark.png"
                    alt="checkmark"
                    className="absolute left-1 transform translate-y-3 "
                  />
                </div>
              ))}
            </div>
          )}
          {isListOpen && (
            <div className="bg-[#E59BE9] absolute right-0 h-full top-0 w-3/5 p-2 overflow-y-auto">
              {todos.map((todo, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 my-2 mx-4 flex flex-col gap-4"
                >
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
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-[#8DECB4] text-[black] font-bold flex gap-2 cursor-pointer rounded-lg p-2 pr-4 shadow-[2px_1px_5px_white]"
                      onClick={() => handleDone(todo._id)}
                    >
                      <img
                        width="0"
                        height="0"
                        src="https://img.icons8.com/fluency/48/checkmark--v1.png"
                        alt="checkmark--v1"
                        className="w-[20px] object-contain"
                      />
                      <p>Done</p>
                    </button>
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/plasticine/100/filled-trash.png"
                      alt="filled-trash"
                      onClick={() => handelete(todo._id)}
                      className="cursor-pointer w-[30px] object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {isTaskOpen && (
            <div className="bg-[#A3D8FF] absolute right-0 h-full top-0 w-3/5 p-2">
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
