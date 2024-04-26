import { IoAddCircle } from "react-icons/io5";
const Addnewtask = () => {
  return (
    <div className="bg-blue-300 flex items-center justify-between gap-12 border px-6 py-3 rounded-lg w-[500px] cursor-pointer">
      <div className="bg-white p-2 rounded-lg">
        <img
          width="35"
          height="35"
          src="https://img.icons8.com/external-bearicons-blue-bearicons/64/000000/external-New-Task-reminder-and-to-do-bearicons-blue-bearicons.png"
          alt="external-New-Task-reminder-and-to-do-bearicons-blue-bearicons"
        />
      </div>
      <p className="font-bold transform -translate-x-16">Add new Task</p>
      <div className="bg-blue-600 p-2 rounded-lg">
        <IoAddCircle className="text-2xl text-blue-300" />
      </div>
    </div>
  );
};

export default Addnewtask;
