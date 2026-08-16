
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 px-6 py-12 text-gray-300">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              ResumeAI
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Build professional, ATS-friendly resumes with the help of AI
              and get ready for your next career opportunity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">
              Product
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  to="/templates"
                  className="transition hover:text-white"
                >
                  Templates
                </Link>
              </li>

              <li>
                <Link
                  to="/create-resume"
                  className="transition hover:text-white"
                >
                  Create Resume
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="transition hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">
              Account
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  to="/login"
                  className="transition hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="transition hover:text-white"
                >
                  Sign Up
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="transition hover:text-white"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold ">
              Connect
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <p>GitHub</p>
              <p>LinkedIn</p>
              <p>Contact Us</p>
            </div>
          </div>

        </div>
        <div className="mt-12 border-t border-gray-800 pt-6">

          <div className="flex flex-col gap-3 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

            <p>
              © 2026 ResumeAI. All rights reserved.
            </p>

            <div className="flex gap-6">
              <span className="cursor-pointer hover:text-white">
                Privacy Policy
              </span>

              <span className="cursor-pointer hover:text-white">
                Terms of Service
              </span>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
