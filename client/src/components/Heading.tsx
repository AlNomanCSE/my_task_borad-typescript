import { FaLayerGroup } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
const Heading = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <FaLayerGroup className="text-amber-300 text-2xl" />
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-3xl tx-gradient">My Task Board</h1>
          <p className="text-gray-500">Task to keep organised</p>
        </div>
        <FaPencilAlt  className="text-white"/>
      </div>
    </div>
  );
};

export default Heading;
