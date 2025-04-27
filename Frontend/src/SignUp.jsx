import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !password) {
      alert("Please fill all fields.");
      return;
    }

    const userData = { name, email, password };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        localStorage.setItem("userData", JSON.stringify(response.data.data.user));
        localStorage.setItem("accessToken", response.data.data.accessToken);
        navigate("/Login");
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Something went wrong");
      alert(error.response?.data?.message || "Error during authentication");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 via-violet-800 to-indigo-900">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
        {/* Title */}
        <h2 className="text-white text-4xl font-extrabold text-center mb-8">
          Create Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Name Input */}
          <div className="w-full bg-white/10 rounded-lg flex items-center px-4 focus-within:ring-2 focus-within:ring-violet-400">
            <input
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 w-full bg-transparent outline-none text-white placeholder-gray-300"
              autoComplete="off"
            />
          </div>

          {/* Email Input */}
          <div className="w-full bg-white/10 rounded-lg flex items-center px-4 focus-within:ring-2 focus-within:ring-violet-400">
            <input
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full bg-transparent outline-none text-white placeholder-gray-300"
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <div className="w-full bg-white/10 rounded-lg flex items-center px-4 focus-within:ring-2 focus-within:ring-violet-400">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-full bg-transparent outline-none text-white placeholder-gray-300"
              autoComplete="off"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-lg font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
