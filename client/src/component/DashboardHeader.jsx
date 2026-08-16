import { Link, useNavigate } from "react-router-dom";

function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage and create your resumes.
        </p>
      </div>
      <div className="flex items-center gap-4">

        <Link
          to="/profile" className="text-sm font-medium text-gray-700 hover:text-blue-600">
        Profile
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default DashboardHeader;