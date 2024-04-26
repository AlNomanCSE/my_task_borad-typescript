import { MouseEventHandler } from "react";
import { FaTasks } from "react-icons/fa";
const TaskList = (props: { onClick: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div
      className="bg-purple-300 flex items-center justify-between gap-12 border px-6 py-3 rounded-lg w-[500px] cursor-pointer"
      onClick={props.onClick}
    >
      <div className="bg-white p-2 rounded-lg">
        <img
          width="35"
          height="35"
          src="https://img.icons8.com/external-filled-outline-wichaiwi/64/external-activities-business-model-canvas-filled-outline-wichaiwi.png"
          alt="external-activities-business-model-canvas-filled-outline-wichaiwi"
        />
      </div>
      <p className="font-bold transform -translate-x-16">See Todo List</p>
      <div className="bg-purple-600 p-2 rounded-lg">
        <FaTasks className="text-2xl text-purple-300" />
      </div>
    </div>
  );
};

export default TaskList;
