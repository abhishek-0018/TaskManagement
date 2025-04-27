import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Task from "./Task";
import axios from "axios";
import useFilteredTasks from "./useFilteredTask.jsx";

const User = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filteredTasks = useFilteredTasks(tasks, filter);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (!storedUser) {
      navigate("/");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      localStorage.removeItem("userData");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const endpoint = "/api/v1/tasks/getTasks";
        const response = await axios.get(`http://localhost:8000${endpoint}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const fetchedTasks = response.data.data;
        localStorage.setItem("tasks", JSON.stringify(fetchedTasks));
        setTasks(fetchedTasks);
      } catch (error) {
        console.error(
          "Error fetching tasks:",
          error.response?.data?.message || error.message
        );
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const Logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  if (!user) {
    return <p className="text-center mt-20 text-white text-xl">Redirecting to login...</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">{user.name}'s Dashboard</h1>
          <p className="text-2xl font-light mt-1">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={Logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-8">
        <span className="text-lg font-medium">Filter:</span>
        {["all", "complete", "incomplete"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`py-2 px-5 rounded-full shadow-md font-semibold transition-all duration-300
              ${
                filter === type
                  ? "bg-white text-purple-700"
                  : "bg-violet-500 hover:bg-violet-600 text-white"
              }
            `}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-10">
        <Link to="/AddNewTask">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
            + Add New Task
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Task key={task._id} resData={task} />
          ))
        ) : (
          <div className="col-span-full text-center text-xl font-medium opacity-80">
            No tasks found.
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
