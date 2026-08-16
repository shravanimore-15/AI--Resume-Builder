import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MinimalTemplate from "../component/template/MinimalTemplate";
import ProfessionalTemplate from "../component/template/ProfessionalTemplate";
import ModernTemplate from "../component/template/ModernTemplate";

import html2pdf from "html2pdf.js";

import {
  getResumeById,
  analyzeResume,
  analyzeJobMatch,
  getJobMatchHistory,
  deleteJobMatch,
  getJobMatchById,
} from "../services/resumeServices";

function ResumeView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null)

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [downloading, setDownloading] = useState(false);

  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [jobMatch, setJobMatch] = useState(null);
  const [matchingJob, setMatchingJob] = useState(false);
  const [showJobMatch, setShowJobMatch] = useState(false);

  const [jobMatchHistory, setJobMatchHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [selectedJobMatch, setSelectedJobMatch] = useState(null);

  const [loadingJobMatchDetails, setLoadingJobMatchDetails] =
    useState(false);
  useEffect(() => {
    loadResume();
    loadJobMatchHistory();
  }, [id]);

  const loadResume = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getResumeById(id);

      console.log("Resume:", data);

      setResume(data);

    } catch (error) {
      console.error(
        "Failed to load resume:",
        error
      );

      setError(
        error.message ||
        "Failed to load resume"
      );

    } finally {
      setLoading(false);
    }
  };

  const loadJobMatchHistory = async () => {
    try {
      setLoadingHistory(true);

      const data =
        await getJobMatchHistory(id);

      console.log(
        "Job Match History:",
        data
      );

      setJobMatchHistory(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(
        "Failed to load job match history:",
        error
      );

    } finally {
      setLoadingHistory(false);
    }
  };

  const handleViewJobMatch = async (
    jobMatchId
  ) => {
    try {
      setLoadingJobMatchDetails(true);

      const data =
        await getJobMatchById(jobMatchId);

      console.log(
        "Selected Job Match:",
        data
      );

      setSelectedJobMatch(data);

    } catch (error) {
      console.error(
        "Failed to load job match details:",
        error
      );

      alert(
        error.message ||
        "Failed to load job match details"
      );

    } finally {
      setLoadingJobMatchDetails(false);
    }
  };

  const handleAnalyzeResume = async () => {
    if (!resume) return;

    try {
      setAnalyzing(true);

      const data =
        await analyzeResume(resume._id);

      console.log(
        "Analysis:",
        data
      );

      setAnalysis(data.analysis);

    } catch (error) {
      console.error(
        "Failed to analyze resume:",
        error
      );

      alert(
        error.message ||
        "Failed to analyze resume"
      );

    } finally {
      setAnalyzing(false);
    }
  };

  const handleJobMatch = async () => {
    if (!jobDescription.trim()) {
      alert(
        "Please enter a job description"
      );

      return;
    }

    if (!resume) {
      return;
    }

    try {
      setMatchingJob(true);
      setJobMatch(null);

      const data =
        await analyzeJobMatch(
          resume._id,
          jobDescription
        );

      console.log(
        "Job Match Result:",
        data
      );

      setJobMatch(data.result);

      setJobDescription("");

      await loadJobMatchHistory();

    } catch (error) {
      console.error(
        "Job Match Error:",
        error
      );

      alert(
        error.message ||
        "Failed to analyze job match"
      );

    } finally {
      setMatchingJob(false);
    }
  };

  const handleDeleteJobMatch = async (
    jobMatchId
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this job match analysis?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteJobMatch(jobMatchId);

      setJobMatchHistory((previous) =>
        previous.filter(
          (item) =>
            item._id !== jobMatchId
        )
      );
      if (
        selectedJobMatch &&
        selectedJobMatch._id === jobMatchId
      ) {
        setSelectedJobMatch(null);
      }

      alert(
        "Job match deleted successfully"
      );

    } catch (error) {
      console.error(
        "Failed to delete job match:",
        error
      );

      alert(
        error.message ||
        "Failed to delete job match"
      );
    }
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current || !resume) {
      return;
    }

    let container = null;

    try {
      setDownloading(true);

      const element =
        resumeRef.current.cloneNode(true);

      container =
        document.createElement("div");

      container.style.position = "fixed";
      container.style.left = "-10000px";
      container.style.top = "0";
      container.style.width = "794px";
      container.style.backgroundColor =
        "#ffffff";

      container.appendChild(element);

      document.body.appendChild(
        container
      );

      const allElements =
        container.querySelectorAll("*");

      allElements.forEach((el) => {
        const style =
          window.getComputedStyle(el);

        if (
          style.color.includes("oklch")
        ) {
          el.style.color = "#000000";
        }

        if (
          style.backgroundColor.includes(
            "oklch"
          )
        ) {
          el.style.backgroundColor =
            "#ffffff";
        }

        if (
          style.borderColor.includes(
            "oklch"
          )
        ) {
          el.style.borderColor =
            "#d1d5db";
        }
      });

      const firstName =
        resume.personalInfo?.firstName ||
        "resume";

      const lastName =
        resume.personalInfo?.lastName ||
        "";

      const fileName =
        `${firstName}-${lastName}-resume`
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase();

      const options = {
        margin: 0,

        filename: `${fileName}.pdf`,

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },

        pagebreak: {
          mode: ["css", "legacy"],
        },
      };

      await html2pdf()
        .set(options)
        .from(element)
        .save();

    } catch (error) {
      console.error(
        "PDF ERROR:",
        error
      );

      alert(
        error.message ||
        "Failed to download PDF"
      );

    } finally {
      if (
        container &&
        document.body.contains(container)
      ) {
        document.body.removeChild(
          container
        );
      }

      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-gray-500">
            Loading resume...
          </p>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">

        <div className="rounded-xl bg-white p-8 text-center shadow-sm">

          <div className="text-4xl">
            ⚠️
          </div>

          <h2 className="mt-4 text-xl font-semibold">
            Unable to load resume
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  if (!resume) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6">

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          ← Back to Dashboard
        </button>

        <div className="flex flex-wrap gap-3">

          <Link
            to={`/resume/edit/${resume._id}`}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700"
          >
            Edit Resume
          </Link>

          <button
            onClick={handleAnalyzeResume}
            disabled={analyzing}
            className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {analyzing
              ? "Analyzing..."
              : "🤖 Analyze Resume"}
          </button>

          <button
            onClick={() =>
              setShowJobMatch(
                !showJobMatch
              )
            }
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white"
          >
            {showJobMatch
              ? "Close Job Match"
              : "🎯 Check Job Match"}
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {downloading
              ? "Generating PDF..."
              : "📥 Download PDF"}
          </button>

        </div>
      </div>

      {showJobMatch && (
        <section className="mx-auto mb-8 max-w-5xl px-6">

          <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              🎯 Job Match Analysis
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Paste a job description and compare it
              with your resume.
            </p>

            <textarea
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }
              placeholder="Paste the job description here..."
              rows={10}
              className="mt-6 w-full rounded-xl border border-gray-300 p-4 text-sm outline-none focus:border-green-500"
            />

            <button
              onClick={handleJobMatch}
              disabled={matchingJob}
              className="mt-4 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {matchingJob
                ? "Analyzing Job Match..."
                : "Analyze Job Match"}
            </button>

          </div>

        </section>
      )}

      <div ref={resumeRef}>

        {resume.template ===
          "professional" && (
          <ProfessionalTemplate
            resume={resume}
          />
        )}

        {resume.template ===
          "minimal" && (
          <MinimalTemplate
            resume={resume}
          />
        )}

        {(!resume.template ||
          resume.template ===
            "modern") && (
          <ModernTemplate
            resume={resume}
          />
        )}

      </div>

      {analysis && (
        <section className="mx-auto mt-8 max-w-5xl px-6">

          <div className="rounded-2xl border border-purple-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              🤖 AI Resume Analysis
            </h2>

            <div className="mt-6 whitespace-pre-line rounded-xl bg-gray-50 p-5 text-sm leading-7 text-gray-700">
              {analysis}
            </div>

          </div>

        </section>
      )}

      {jobMatch &&
        typeof jobMatch === "object" && (

        <section className="mx-auto mt-8 max-w-5xl px-6">

          <JobMatchDetails
            jobMatch={jobMatch}
            title="🎯 Current Job Match Result"
          />

        </section>
      )}

      <section className="mx-auto mt-8 max-w-5xl px-6">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                📊 Job Match History
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your previous job match analyses
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {jobMatchHistory.length} Analyses
            </span>

          </div>

          {loadingHistory && (
            <p className="mt-6 text-sm text-gray-500">
              Loading job match history...
            </p>
          )}

          {!loadingHistory &&
            jobMatchHistory.length === 0 && (

            <div className="mt-8 rounded-xl border border-dashed border-gray-300 p-8 text-center">

              <div className="text-4xl">
                🎯
              </div>

              <h3 className="mt-3 font-semibold">
                No job match history yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Analyze your resume against a job
                description to see results here.
              </p>

            </div>
          )}

          <div className="mt-6 space-y-4">

            {jobMatchHistory.map((item) => (

              <div
                key={item._id}
                className="rounded-xl border border-gray-200 p-5"
              >

                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      Job Match Analysis
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {item.jobDescription}
                    </p>

                    <p className="mt-3 text-xs text-gray-400">

                      Analyzed on{" "}

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                  <div className="flex gap-3">

                    <div className="rounded-lg bg-blue-50 px-4 py-3 text-center">

                      <p className="text-xs text-gray-500">
                        Match
                      </p>

                      <p className="text-xl font-bold text-blue-600">
                        {item.matchScore}/100
                      </p>

                    </div>

                    <div className="rounded-lg bg-purple-50 px-4 py-3 text-center">

                      <p className="text-xs text-gray-500">
                        ATS
                      </p>

                      <p className="text-xl font-bold text-purple-600">
                        {item.atsScore}/100
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-4 flex justify-end gap-3">

                  <button
                    onClick={() =>
                      handleViewJobMatch(
                        item._id
                      )
                    }
                    disabled={
                      loadingJobMatchDetails
                    }
                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 disabled:opacity-50"
                  >
                    {loadingJobMatchDetails
                      ? "Loading..."
                      : "View Details"}
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteJobMatch(
                        item._id
                      )
                    }
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {selectedJobMatch && (

        <section className="mx-auto mt-8 max-w-5xl px-6">

          <div className="mb-3 flex justify-end">

            <button
              onClick={() =>
                setSelectedJobMatch(null)
              }
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm"
            >
              Close Details
            </button>

          </div>

          <JobMatchDetails
            jobMatch={selectedJobMatch}
            title="🎯 Saved Job Match Details"
            showJobDescription={true}
          />

        </section>
      )}

    </div>
  );
}

function JobMatchDetails({
  jobMatch,
  title,
  showJobDescription = false,
}) {
  return (
    <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        <div className="rounded-xl bg-blue-50 p-6 text-center">

          <p className="text-sm text-gray-500">
            Job Match Score
          </p>

          <p className="mt-2 text-5xl font-bold text-blue-600">
            {jobMatch.matchScore ?? 0}
            <span className="text-xl">
              /100
            </span>
          </p>

        </div>

        <div className="rounded-xl bg-purple-50 p-6 text-center">

          <p className="text-sm text-gray-500">
            ATS Compatibility
          </p>

          <p className="mt-2 text-5xl font-bold text-purple-600">
            {jobMatch.atsScore ?? 0}
            <span className="text-xl">
              /100
            </span>
          </p>

        </div>

      </div>
      {showJobDescription && (
        <div className="mt-8">

          <h3 className="text-lg font-semibold">
            📄 Job Description
          </h3>

          <div className="mt-3 whitespace-pre-line rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
            {jobMatch.jobDescription}
          </div>

        </div>
      )}
      <div className="mt-8">

        <h3 className="text-lg font-semibold">
          ✅ Matched Skills
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">

          {jobMatch.matchedSkills?.length > 0 ? (

            jobMatch.matchedSkills.map(
              (skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                >
                  {skill}
                </span>
              )
            )

          ) : (

            <p className="text-sm text-gray-500">
              No matched skills found.
            </p>

          )}

        </div>

      </div>
      <div className="mt-8">

        <h3 className="text-lg font-semibold">
          ❌ Missing Skills
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">

          {jobMatch.missingSkills?.length > 0 ? (

            jobMatch.missingSkills.map(
              (skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                >
                  {skill}
                </span>
              )
            )

          ) : (

            <p className="text-sm text-gray-500">
              No missing skills found.
            </p>

          )}

        </div>

      </div>
      <div className="mt-8">

        <h3 className="text-lg font-semibold">
          💪 Strengths
        </h3>

        <div className="mt-3 space-y-2">

          {jobMatch.strengths?.length > 0 ? (

            jobMatch.strengths.map(
              (strength, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-green-50 p-3 text-sm"
                >
                  {strength}
                </div>
              )
            )

          ) : (

            <p className="text-sm text-gray-500">
              No strengths available.
            </p>

          )}

        </div>

      </div>
      <div className="mt-8">

        <h3 className="text-lg font-semibold">
          💡 Suggestions
        </h3>

        <div className="mt-3 space-y-2">

          {jobMatch.suggestions?.length > 0 ? (

            jobMatch.suggestions.map(
              (suggestion, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-yellow-50 p-3 text-sm"
                >
                  {suggestion}
                </div>
              )
            )

          ) : (

            <p className="text-sm text-gray-500">
              No suggestions available.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default ResumeView;