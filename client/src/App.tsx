import { useState } from "react";
import Addnewtask from "./components/Addnewtask";
import Completed from "./components/Completed";
import Heading from "./components/Heading";
import Progress from "./components/Progress";
import Taskwillnotdo from "./components/Taskwillnotdo";

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="bg-gradient rounded-lg p-[3px]">
        <div className="p-[100px] bg-white rounded-lg flex items-center flex-col gap-6 relative overflow-hidden">
          <Heading />
          <Progress />
          <Completed />
          <Taskwillnotdo />
          <Addnewtask onClick={handleClick} />

          {isOpen && (
            <div className="bg-gradient absolute right-0 h-full top-0 w-3/5 p-2">
              <form className="p-4">
                <label className="block mb-2 text-white font-bold">
                  Task Name
                </label>
                <input
                  type="text"
                  className="border p-2 mb-4 w-full rounded-lg"
                />
                <label className="block mb-2 text-white font-bold">
                  Task Description
                </label>
                <textarea className="border p-2 w-full rounded-lg"></textarea>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
