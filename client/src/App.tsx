import Addnewtask from "./components/Addnewtask";
import Completed from "./components/Completed";
import Heading from "./components/Heading";
import Progress from "./components/Progress";
import Taskwillnotdo from "./components/Taskwillnotdo";

export default function App() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="bg-gradient rounded-lg p-1">
        <div className="p-3 bg-white rounded-lg flex items-center flex-col gap-6">
          <Heading />
          <Progress />
          <Completed />
          <Taskwillnotdo />
          <Addnewtask />
        </div>
      </div>
    </section>
  );
}
