import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-10 py-5">

      <Link
        to="/"
        className="text-2xl font-bold text-gray-900"
      >
        ResumeAI
      </Link>
       <div className="flex items-center gap-8">

        <Link
          to="/"
          className="text-gray-600 hover:text-blue-600">
          Home
        </Link>

        <Link
          to="/template"
          className="text-gray-600 hover:text-blue-600">
          Templates
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600">
              Login
            </Link>

            <Link
              to="/signup"
              className="text-gray-600 hover:text-blue-600">
              Sign Up
            </Link>

            <Link
              to="/login"
              className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800">
              Get Started
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>

            <Link
              to="/createresume"
              className="text-gray-600 hover:text-blue-600">
              Create Resume
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700">
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;