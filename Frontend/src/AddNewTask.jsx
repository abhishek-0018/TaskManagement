import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, priority };
    const access = localStorage.getItem("accessToken");
    const endpoint = "/api/v1/tasks/addTask";

    try {
      const response = await axios.post(
        `http://localhost:8000${endpoint}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("tasks", JSON.stringify(response.data.data));
      navigate("/User");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-violet-800 to-purple-900 px-4 py-10">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
        {/* Title */}
        <h1 className="text-white text-4xl font-extrabold text-center mb-10">
          Add New Task
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Title Input */}
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 bg-white/10 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
            autoComplete="off"
          />

          {/* Description Input */}
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 bg-white/10 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
            autoComplete="off"
          />

          {/* Priority Dropdown */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-4 bg-white/10 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
            required
          >
            <option value="">Select Priority</option>
            <option value="high" className="text-indigo-600">High</option>
            <option value="medium" className="text-indigo-600">Medium</option>
            <option value="low" className="text-indigo-600">Low</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg py-4 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
