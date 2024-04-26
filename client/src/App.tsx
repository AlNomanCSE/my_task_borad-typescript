import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Addnewtask from "./components/Addnewtask";
import Completed from "./components/Completed";
import Heading from "./components/Heading";
import Progress from "./components/Progress";
import Taskwillnotdo from "./components/Taskwillnotdo";

type InputsType = {
  title: string;
  details: string;
};
export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleClick() {
    setIsOpen(!isOpen);
  }
  const onSubmit: SubmitHandler<InputsType> = async (data: InputsType) => {
    await fetch("http://localhost:5000/create", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        details: data.details,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <section className="h-screen flex items-center justify-center bg-black">
      <div className="bg-gradient rounded-lg p-[3px]">
        <div className="p-[100px] bg-slate-900 rounded-lg flex items-center flex-col gap-6 relative overflow-hidden ">
          <Heading />
          <Progress />
          <Completed />
          <Taskwillnotdo />
          <Addnewtask onClick={handleClick} />

          {isOpen && (
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
