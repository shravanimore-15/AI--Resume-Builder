
import { useState } from "react";
import { generateProjectDescription } from "../services/resumeServices";

function ProjectsForm({ projects, setProjects }) {
  const [generatingIndex, setGeneratingIndex] = useState(null);
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedProjects = [...projects];

    updatedProjects[index] = {
      ...updatedProjects[index],
      [name]: value,
    };

    setProjects(updatedProjects);
  };
  const handleGenerateDescription = async (index) => {
    const project = projects[index];

    if (!project.name.trim()) {
      alert("Please enter the project name first.");
      return;
    }

    if (!project.technologies.trim()) {
      alert("Please enter the technologies first.");
      return;
    }

    try {
      setGeneratingIndex(index);

      const data = await generateProjectDescription(
        project.name,
        project.technologies
      );

      const updatedProjects = [...projects];

      updatedProjects[index] = {
        ...updatedProjects[index],
        description: data.description,
      };

      setProjects(updatedProjects);
    } catch (error) {
      console.error("AI Project Description Error:", error);

      alert(
        error.message || "Failed to generate project description"
      );
    } finally {
      setGeneratingIndex(null);
    }
  };
  const addProject = () => {
    setProjects([
      ...projects,
      {
        name: "",
        technologies: "",
        description: "",
        githubUrl: "",
        liveUrl: "",
      },
    ]);
  };
  const removeProject = (index) => {
    const updatedProjects = projects.filter(
      (_, i) => i !== index
    );

    setProjects(updatedProjects);
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Projects
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add projects that demonstrate your technical skills and
          experience.
        </p>
      </div>
      <div className="mt-6 space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Project {index + 1}
              </h3>

              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="mt-5 space-y-5">
              {/* Project Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="AI Resume Builder"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Technologies
                </label>

                <input
                  type="text"
                  name="technologies"
                  value={project.technologies}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="React, Node.js, Express, MongoDB"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Separate technologies with commas.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleGenerateDescription(index)
                    }
                    disabled={generatingIndex === index}
                    className="rounded-lg border border-purple-500 px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {generatingIndex === index
                      ? "Generating..."
                      : "✨ Generate with AI"}
                  </button>
                </div>

                <textarea
                  name="description"
                  rows={5}
                  value={project.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Describe what you built, the problem it solves, and your contribution..."
                  className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 leading-6 outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {/* GitHub */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    name="githubUrl"
                    value={project.githubUrl}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    placeholder="https://github.com/username/project"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Live Demo URL
                  </label>

                  <input
                    type="url"
                    name="liveUrl"
                    value={project.liveUrl}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    placeholder="https://your-project.com"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addProject}
        className="mt-6 rounded-lg border border-blue-600 px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"
      >
        + Add Project
      </button>
    </div>
  );
}

export default ProjectsForm;
