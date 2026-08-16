import { useState } from "react";
import { generateProfessionalSummary } from "../services/resumeServices";

function SummaryForm({
  summary,
  setSummary,
  resumeData,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleImproveWithAI = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await generateProfessionalSummary(resumeData);

      setSummary(data.summary);

    } catch (error) {
      console.error(error);

      setError(
        error.message || "Failed to generate summary"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Professional Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Write a short introduction that highlights your strengths,
          experience, and career goals.
        </p>
      </div>
      <div className="mt-6">

        <label className="text-sm font-medium text-gray-700">
          Your Summary
        </label>

        <textarea
          value={summary}
          onChange={handleChange}
          rows={8}
          maxLength={500}
          placeholder="Example: Computer Engineering student with experience in MERN stack development..."
          className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 leading-6 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>
            Keep your summary concise and professional.
          </span>

          <span>
            {summary.length}/500
          </span>
        </div>

      </div>
      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="font-semibold text-gray-900">
              ✨ Improve with AI
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Let AI make your summary more professional and impactful.
            </p>
          </div>

          <button
            type="button"
            onClick={handleImproveWithAI}
            disabled={loading}
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "✨ Generating..."
              : "✨ Improve with AI"}
          </button>

        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

      </div>

    </div>
  );
}

export default SummaryForm;