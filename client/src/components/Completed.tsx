import { MouseEventHandler } from "react";
import { MdFileDownloadDone } from "react-icons/md";
const Completed = (props: { onClick: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div
      onClick={props.onClick}
      className="bg-green-300 flex items-center justify-between gap-12 border px-6 py-3 rounded-lg w-[500px] cursor-pointer"
    >
      <div className="bg-white p-2 rounded-lg">
        <img src="./lifting.png" alt="" width={35} />
      </div>
      <p className="font-bold transform -translate-x-16">Task Compleated</p>
      <div className="bg-green-600 p-2 rounded-lg">
        <MdFileDownloadDone className="text-2xl text-green-300" />
      </div>
    </div>
  );
};

export default Completed;
