import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import DashboardHeader from "../component/DashboardHeader";
import DashboardSidebar from "../component/DashboardSidebar";

import {
  getResumes,deleteResume,} from "../services/resumeServices";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadResumes();
  }, []);
  const loadResumes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getResumes();

      console.log("Dashboard resumes:", data);

      const resumeList = Array.isArray(data)
        ? data
        : data.resumes || [];

      setResumes(resumeList);

    } catch (error) {
      console.error("Failed to load resumes:", error);

      setError(
        error.message || "Failed to load resumes"
      );

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteResume(id);

      setResumes((previousResumes) =>
        previousResumes.filter(
          (resume) => resume._id !== id
        )
      );

    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.message || "Failed to delete resume"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

          <p className="mt-4 text-sm text-gray-500">
            Loading your dashboard...
          </p>

        </div>

      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">

      <DashboardSidebar />

      <div className="ml-64 min-h-screen">
        <DashboardHeader />
        <main className="px-6 py-8">

          <div className="mx-auto max-w-7xl">

            {error && (
              <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4">

                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>

                <button
                  onClick={loadResumes}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Retry
                </button>

              </div>
            )}
            {!error && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-500">
                        Total Resumes
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-gray-900">
                        {resumes.length}
                      </h2>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                      📄
                    </div>

                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    Resumes saved in your account
                  </p>

                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-500">
                        Latest Resume
                      </p>

                      <h2 className="mt-2 truncate text-lg font-bold text-gray-900">

                        {resumes.length > 0
                          ? resumes[0].personalInfo?.jobTitle ||
                            "Untitled Resume"
                          : "No Resume"}

                      </h2>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                      📝
                    </div>

                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    Your most recent resume
                  </p>

                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-500">
                        AI Assistant
                      </p>

                      <h2 className="mt-2 text-lg font-bold text-gray-900">
                        Improve Resume
                      </h2>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
                      ✨
                    </div>

                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    Generate and improve resume content with AI
                  </p>

                </div>

              </div>
            )}

            <section className="mt-10">

              <div>

                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Get started quickly.
                </p>

              </div>


              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  to="/createresume"
                  className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-xl">
                      ➕
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        Create Resume
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Start a new resume
                      </p>

                    </div>

                  </div>

                </Link>
                <Link
                  to="/template"
                  className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-purple-300 hover:shadow-md"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-xl">
                      🎨
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        Templates
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Choose a resume design
                      </p>

                    </div>

                  </div>

                </Link>
                <Link
                  to="/profile"
                  className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-green-300 hover:shadow-md"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-xl">
                      👤
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        My Profile
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Manage your account
                      </p>

                    </div>

                  </div>

                </Link>

              </div>

            </section>
            <section className="mt-10">

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>

                  <h2 className="text-xl font-semibold text-gray-900">
                    My Resumes
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your saved resumes.
                  </p>

                </div>


                <button
                  onClick={loadResumes}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  ↻ Refresh
                </button>

              </div>
              {!error && resumes.length === 0 && (

                <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                    📄
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-gray-900">
                    No resumes yet
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                    Create your first professional resume and
                    start building your career profile.
                  </p>

                  <Link
                    to="/createresume"
                    className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Create Your First Resume
                  </Link>

                </div>

              )}
              {!error && resumes.length > 0 && (

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                  {resumes.map((resume) => (

                    <div
                      key={resume._id}
                      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                      <div className="flex items-start justify-between">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                          📄
                        </div>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                          Saved
                        </span>

                      </div>


                      <h3 className="mt-5 truncate text-lg font-semibold text-gray-900">

                        {resume.personalInfo?.firstName || ""}{" "}

                        {resume.personalInfo?.lastName || ""}

                      </h3>


                      <p className="mt-1 truncate text-sm text-gray-500">

                        {resume.personalInfo?.jobTitle ||
                          "Untitled Resume"}

                      </p>


                      <p className="mt-4 text-xs text-gray-400">

                        Updated{" "}

                        {resume.updatedAt
                          ? new Date(
                              resume.updatedAt
                            ).toLocaleDateString()
                          : resume.createdAt
                          ? new Date(
                              resume.createdAt
                            ).toLocaleDateString()
                          : "Recently"}

                      </p>


                      <div className="mt-6 flex gap-2">

                        <button
                          onClick={() =>
                            navigate(
                              `/resumeview/${resume._id}`
                            )
                          }
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          View
                        </button>


                        <button
                          onClick={() =>
                            navigate(
                              `/resume/edit/${resume._id}`
                            )
                          }
                          className="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          Edit
                        </button>


                        <button
                          onClick={() =>
                            handleDelete(resume._id)
                          }
                          className="rounded-lg border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </section>

            <section className="mt-10 rounded-2xl bg-gray-900 p-6 text-white md:p-8">

              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                <div>

                  <p className="text-sm font-medium text-blue-300">
                    ✨ AI Resume Assistant
                  </p>

                  <h2 className="mt-2 text-xl font-bold md:text-2xl">
                    Make your resume stronger with AI.
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                    Improve your professional summary, generate
                    project descriptions and analyze your resume.
                  </p>

                </div>


                <Link
                  to="/createresume"
                  className="shrink-0 rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-100"
                >
                  Try AI Features
                </Link>

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;