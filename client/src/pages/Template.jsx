import { useSearchParams, Link } from "react-router-dom";

import Navbar from "../component/Navbar";

import ModernTemplate from "../component/template/ModernTemplate";
import ProfessionalTemplate from "../component/template/ProfessionalTemplate";
import MinimalTemplate from "../component/template/MinimalTemplate";

function Template() {
  const [searchParams] = useSearchParams();

  const selectedTemplate =
    searchParams.get("type") || "modern";

  const previewResume = {
    template: selectedTemplate,

    personalInfo: {
      firstName: "Shravani",
      lastName: "More",
      email: "shravani@example.com",
      phone: "+91 9876543210",
      location: "Pune, Maharashtra",
      jobTitle: "Computer Engineering Student",
      linkedin: "linkedin.com/in/shravani",
      github: "github.com/shravani",
    },

    summary:
      "Computer Engineering student interested in full-stack development and building modern web applications. Skilled in React, Node.js, MongoDB, and JavaScript.",

    education: [
      {
        degree: "Bachelor of Engineering in Computer Engineering",
        institution: "Siddhant College of Engineering",
        startYear: "2023",
        endYear: "2027",
        description:
          "Focused on software development, web technologies, and computer engineering.",
      },
    ],

    experience: [
      {
        jobTitle: "Full Stack Developer",
        company: "Personal Projects",
        startDate: "2025",
        endDate: "Present",
        description:
          "Built responsive web applications using React, Node.js, Express, and MongoDB.",
      },
    ],

    skills: {
      frontend: [
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
      ],

      backend: [
        "Node.js",
        "Express.js",
      ],

      database: [
        "MongoDB",
        "MySQL",
      ],

      tools: [
        "Git",
        "GitHub",
        "VS Code",
      ],
    },

    projects: [
      {
        name: "AI Resume Builder",
        technologies:
          "React, Node.js, Express, MongoDB, Gemini AI",
        description:
          "An AI-powered resume builder that helps users create resumes, analyze resume quality, and check job compatibility.",
        githubUrl: "",
        liveLink: "",
      },
    ],

    certification: [
      {
        name: "Web Development",
        issuer: "Online Learning Platform",
        issueDate: "2026",
      },
    ],

    languages: [
      "English",
      "Hindi",
      "Marathi",
    ],
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "professional":
        return (
          <ProfessionalTemplate
            resume={previewResume}
          />
        );

      case "minimal":
        return (
          <MinimalTemplate
            resume={previewResume}
          />
        );

      case "modern":
      default:
        return (
          <ModernTemplate
            resume={previewResume}
          />
        );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-12">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-10 text-center">

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
              Resume Templates
            </span>

            <h1 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
              {selectedTemplate === "modern" &&
                "Modern Resume Template"}

              {selectedTemplate === "professional" &&
                "Professional Resume Template"}

              {selectedTemplate === "minimal" &&
                "Minimal Resume Template"}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Preview the template before creating your
              professional resume.
            </p>

          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/template?type=modern"
              className={`rounded-lg px-6 py-3 font-medium transition ${
                selectedTemplate === "modern"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 shadow-sm hover:bg-gray-100"
              }`}
            >
              Modern
            </Link>

            <Link
              to="/template?type=professional"
              className={`rounded-lg px-6 py-3 font-medium transition ${
                selectedTemplate === "professional"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 shadow-sm hover:bg-gray-100"
              }`}
            >
              Professional
            </Link>

            <Link
              to="/template?type=minimal"
              className={`rounded-lg px-6 py-3 font-medium transition ${
                selectedTemplate === "minimal"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 shadow-sm hover:bg-gray-100"
              }`}
            >
              Minimal
            </Link>

          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-xl">

            <div className="overflow-auto">

              <div className="min-w-[794px]">
                {renderTemplate()}
              </div>

            </div>

          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to={`/createresume?template=${selectedTemplate}`}
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Use This Template →
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}

export default Template;