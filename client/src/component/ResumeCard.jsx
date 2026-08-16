import { useNavigate } from "react-router-dom";

function ResumeCard({ resume }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <h3 className="text-lg font-semibold text-gray-900">

        {resume.personalInfo?.firstName || "Untitled"}{" "}

        {resume.personalInfo?.lastName || "Resume"}

      </h3>

      <p className="mt-2 text-sm text-gray-500">

        {resume.personalInfo?.jobTitle || "No job title"}

      </p>

      <p className="mt-3 text-xs text-gray-400">

        Last updated:{" "}

        {resume.updatedAt
          ? new Date(resume.updatedAt).toLocaleDateString()
          : "Recently"}

      </p>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() =>
            navigate(`/resumeview/${resume._id}`)
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          View
        </button>

        <button
          onClick={() =>
            navigate(`/resume/edit/${resume._id}`)
          }
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
        >
          Edit
        </button>

      </div>

    </div>
  );
}

export default ResumeCard;