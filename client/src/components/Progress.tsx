import { HiClock } from "react-icons/hi";

const Progress = () => {
  return (
    <div className="bg-yellow-300 flex items-center justify-between gap-12 border px-6 py-3 rounded-lg w-[500px] cursor-pointer">
      <div className="bg-white p-2 rounded-lg">
        <img src="./clock.png" alt="" width={35} />
      </div>
      <p className="font-bold transform -translate-x-16">Task in Progress</p>
      <div className="bg-yellow-600 p-2 rounded-lg">
        <HiClock className="text-2xl text-yellow-300" />
      </div>
    </div>
  );
};

export default Progress;
