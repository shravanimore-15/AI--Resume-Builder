import { Link, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "My Resumes",
      path: "/resumeview",
      icon: "📄",
    },
    {
      name: "Templates",
      path: "/template",
      icon: "🎨",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        hidden
        h-screen
        w-64
        border-r
        border-gray-200
        bg-white
        md:flex
        md:flex-col
      "
    >

      <div className="flex h-20 items-center border-b border-gray-200 px-6">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900"
        >
          Resume<span className="text-blue-600">AI</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {

            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <span className="text-lg">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>

              </Link>
            );
          })}

        </div>

      </nav>
      <div className="border-t border-gray-200 p-4">

        <p className="px-3 text-xs text-gray-400">
          AI Resume Builder
        </p>

      </div>

    </aside>
  );
}

export default DashboardSidebar;