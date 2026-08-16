
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
            AI-Powered Resume Builder
          </p>

          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Build a Resume That
            <span className="text-blue-600"> Gets You Noticed</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Create a professional, ATS-friendly resume with the help of AI.
            Build your resume, improve your content, and choose a professional
            template in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/createresume"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Create My Resume
            </Link>

            <Link
              to="/template"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              View Templates
            </Link>

          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">
            <span>✓ AI Assistance</span>
            <span>✓ ATS Friendly</span>
            <span>✓ Professional Templates</span>
          </div>
        </div>
        <div className="flex justify-center">

          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="border-b border-gray-200 pb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Shravani More
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Computer Engineering Student
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Pune, Maharashtra • email@example.com
              </p>
            </div>
            <div className="mt-5">
              <h3 className="text-sm font-bold uppercase text-gray-800">
                Profile
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Computer Engineering student interested in full-stack
                development and building modern web applications.
              </p>
            </div>
            <div className="mt-5">
              <h3 className="text-sm font-bold uppercase text-gray-800">
                Skills
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded bg-gray-100 px-3 py-1 text-xs">
                  React
                </span>

                <span className="rounded bg-gray-100 px-3 py-1 text-xs">
                  Node.js
                </span>

                <span className="rounded bg-gray-100 px-3 py-1 text-xs">
                  MongoDB
                </span>

                <span className="rounded bg-gray-100 px-3 py-1 text-xs">
                  JavaScript
                </span>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-sm font-bold uppercase text-gray-800">
                Experience
              </h3>

              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-800">
                  Full Stack Developer
                </p>

                <p className="text-xs text-gray-500">
                  StayNest • 2026
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
