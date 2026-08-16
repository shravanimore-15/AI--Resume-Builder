import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PersonalInfoForm from "../component/personalInfo";
import SummaryForm from "../component/SummaryForm";
import EducationForm from "../component/EducationForm";
import ExperienceForm from "../component/ExperienceForm";
import LanguageForm from "../component/LanguageForm";
import SkillForm from "../component/SkillForm";
import ProjectForm from "../component/ProjectForm";
import CertificationForm from "../component/CertificationForm";
import ResumeProgress from "../component/ProgressBar";

import ModernTemplate from "../component/template/ModernTemplate";
import ProfessionalTemplate from "../component/template/ProfessionalTemplate";
import MinimalTemplate from "../component/template/MinimalTemplate";

import { createResume } from "../services/resumeServices";

function CreateResume() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedTemplate =
    searchParams.get("template") || "modern";

  const [currentStep, setCurrentStep] = useState(1);

  const [saving, setSaving] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    linkedin: "",
    github: "",
  });

  const [summary, setSummary] = useState("");

  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    database: [],
    tools: [],
  });

  const [projects, setProjects] = useState([
    {
      name: "",
      technologies: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
    },
  ]);

  const [certifications, setCertifications] = useState([
    {
      name: "",
      organization: "",
      issueDate: "",
      credentialId: "",
      credentialUrl: "",
    },
  ]);

  const [languages, setLanguages] = useState([
    {
      language: "",
      proficiency: "Intermediate",
    },
  ]);

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resumeData = {
    personalInfo,
    summary,
    education,
    experience,
    skills,
    projects,
    certifications,
    languages,
    template: selectedTemplate,
  };

  const handleSaveResume = async () => {
    try {
      setSaving(true);

      console.log("Resume data:", resumeData);

      const result = await createResume(resumeData);

      console.log("Resume saved:", result);

      alert("Resume saved successfully!");
      navigate("/dashboard");

    } catch (error) {
      console.error("Error saving resume:", error);

      alert(
        error.message || "Failed to save resume."
      );

    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
        );

      case 2:
        return (
          <SummaryForm
            summary={summary}
            setSummary={setSummary}
            resumeData={resumeData}
          />
        );

      case 3:
        return (
          <EducationForm
            education={education}
            setEducation={setEducation}
          />
        );

      case 4:
        return (
          <ExperienceForm
            experience={experience}
            setExperience={setExperience}
          />
        );

      case 5:
        return (
          <SkillForm
            skills={skills}
            setSkills={setSkills}
          />
        );

      case 6:
        return (
          <ProjectForm
            projects={projects}
            setProjects={setProjects}
          />
        );

      case 7:
        return (
          <CertificationForm
            certifications={certifications}
            setCertifications={setCertifications}
          />
        );

      case 8:
        return (
          <LanguageForm
            languages={languages}
            setLanguages={setLanguages}
          />
        );

      default:
        return null;
    }
  };

  const renderResumePreview = () => {
    switch (selectedTemplate) {
      case "professional":
        return (
          <ProfessionalTemplate
            resume={resumeData}
          />
        );

      case "minimal":
        return (
          <MinimalTemplate
            resume={resumeData}
          />
        );

      case "modern":
      default:
        return (
          <ModernTemplate
            resume={resumeData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Resume Builder
            </h1>

            <p className="text-sm text-gray-500">
              Build your professional resume step by step.
            </p>
          </div>

          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            Template:{" "}
            <span className="capitalize">
              {selectedTemplate}
            </span>
          </div>
        </div>
      </header>
      <ResumeProgress
        currentStep={currentStep}/>
      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-2">
         <div>

          {renderStep()}

          <div className="mt-6 flex justify-between">

            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40">
              ← Back
            </button>
            {currentStep < 8 ? (<button type="button" onClick={handleNext}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                Next →
              </button>

            ) : (

              <button
                type="button"
                onClick={handleSaveResume}
                disabled={saving}
                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60">
                {saving
                  ? "Saving..."
                  : "Finish Resume ✓"}
              </button>
            )}

          </div>

        </div>

        <div className="lg:sticky lg:top-6 lg:h-fit">

          <div className="mb-3 flex items-center justify-between">

            <h2 className="font-semibold text-gray-800">
              Live Preview
            </h2>

            <span className="rounded-md bg-gray-200 px-3 py-1 text-xs font-medium capitalize text-gray-600">
              {selectedTemplate}
            </span>

          </div>

          <div className="max-h-[calc(100vh-120px)] overflow-auto rounded-xl border border-gray-200 bg-gray-200 p-3 shadow-sm">

            <div className="min-w-[794px] origin-top scale-[0.6]">

              {renderResumePreview()}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CreateResume;