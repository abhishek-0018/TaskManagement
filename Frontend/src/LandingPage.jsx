import { Motion } from "./Motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white px-6">
      <Motion>
        <div className="text-center p-10 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl max-w-3xl w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-8">
            Organize. Prioritize. <br /> Conquer your day with ease.
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10">
            <Link to="/Login">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg py-3 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105">
                Login
              </button>
            </Link>

            <Link to="/SignUp">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-3 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </Motion>
    </div>
  );
};

export default LandingPage;
