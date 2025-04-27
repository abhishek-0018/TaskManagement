import { Motion } from "./Motion";
import axios from "axios";

const Task = ({ resData }) => {
  const changeStatus = async (e) => {
    e.preventDefault();
    if (resData.status === "complete") {
      return;
    }
    const endpoint = "/api/v1/tasks/changeStatus";
    try {
      const response = await axios.put(
        `http://localhost:8000${endpoint}`,
        { task: resData._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("tasks", JSON.stringify(response.data.data));
      window.location.reload();
    } catch (err) {
      console.error("Failed to change status:", err);
    }
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    const endpoint = "/api/v1/tasks/deleteTask";

    try {
      const response = await axios.delete(`http://localhost:8000${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { task: resData._id },
      });

      console.log("Deleted task:", response.data);
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const taskClass =
    resData.status === "complete"
      ? "bg-gradient-to-r from-green-500 to-green-700 text-gray-500 line-through"
      : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white";

  const buttonClass =
    resData.status === "complete"
      ? "capitalize bg-gray-500 text-white text-sm font-bold py-2 px-4 rounded-2xl shadow-lg"
      : "capitalize bg-black/80 text-white text-sm font-bold py-2 px-4 rounded-2xl shadow-lg hover:bg-violet-900 hover:shadow-xl transition-transform duration-300";

  return (
    <Motion>
      <div
        className={`flex flex-col m-6 p-6 rounded-3xl w-[450px] min-h-[200px] shadow-lg ${taskClass} transform transition-transform hover:scale-105`}
      >
        <div className="flex gap-3 overflow-hidden justify-between">
          <div>
            <h1 className="font-semibold text-2xl capitalize truncate">
              {resData.title}
            </h1>
            <p className="text-lg capitalize break-words line-clamp-3">
              {resData.description}
            </p>
          </div>
          <div>
            <button
              onClick={changeStatus}
              className={buttonClass}
            >
              {resData.status}
            </button>
          </div>
        </div>
        <hr className="bg-amber-50 my-3" />
        <div className="flex justify-between items-center mt-4">
          <div>
            <h6 className="text-lg font-semibold capitalize text-gray-100">
              Priority: {resData.priority}
            </h6>
            <h6 className="text-sm text-gray-400">
              Created at:{" "}
              {new Date(resData.createdAt).toLocaleDateString("en-IN")}
            </h6>
          </div>
          <div className="flex gap-3">
            <button
              onClick={deleteTask}
              className="capitalize bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-semibold py-2 px-4 rounded-2xl shadow-md hover:scale-105 hover:from-red-500 hover:to-red-700 transition-transform duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default Task;
