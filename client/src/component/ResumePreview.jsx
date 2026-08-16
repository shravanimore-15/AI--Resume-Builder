function ResumePreview({
  personalInfo,
  summary,
  education,
  experience,
  skills,
  projects,
  certifications,
  languages,
}) {

  const selectedTemplate =
    localStorage.getItem("selectedTemplate") || "modern";

  const resumeData = {
    personalInfo,
    summary,
    education,
    experience,
    skills,
    projects,
    certification: certifications,
    languages,
    template: selectedTemplate,
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8">
        <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Live Preview
        </p>
        <div className="border-b border-gray-200 pb-6">
  
          <h1 className="text-3xl font-bold text-gray-900">
            {personalInfo.firstName || "First"}{" "}
            {personalInfo.lastName || "Last"}
          </h1>
  
          <p className="mt-2 text-lg text-gray-600">
            {personalInfo.jobTitle || "Your Job Title"}
          </p>
  
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
  
            {personalInfo.email && (
              <span>{personalInfo.email}</span>
            )}
  
            {personalInfo.phone && (
              <span>{personalInfo.phone}</span>
            )}
  
            {personalInfo.location && (
              <span>{personalInfo.location}</span>
            )}
  
            {personalInfo.linkedin && (
              <span>{personalInfo.linkedin}</span>
            )}
  
            {personalInfo.github && (
              <span>{personalInfo.github}</span>
            )}
  
          </div>
  
        </div>
        {summary && (
          <div className="mt-6">
  
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Profile
            </h2>
  
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {summary}
            </p>
  
          </div>
        )}
        {education?.some(
          (item) =>
            item.degree ||
            item.institution ||
            item.startYear ||
            item.endYear ||
            item.description
        ) && (
          <div className="mt-6">
  
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Education
            </h2>
  
            <div className="mt-4 space-y-5">
  
              {education.map((item, index) => {
  
                if (
                  !item.degree &&
                  !item.institution &&
                  !item.startYear &&
                  !item.endYear &&
                  !item.description
                ) {
                  return null;
                }
  
                return (
                  <div key={index}>
  
                    {item.degree && (
                      <h3 className="font-semibold text-gray-900">
                        {item.degree}
                      </h3>
                    )}
  
                    {item.institution && (
                      <p className="mt-1 text-sm text-gray-600">
                        {item.institution}
                      </p>
                    )}
  
                    {(item.startYear || item.endYear) && (
                      <p className="mt-1 text-xs text-gray-400">
                        {item.startYear} - {item.endYear}
                      </p>
                    )}
  
                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>
                    )}
  
                  </div>
                );
              })}
  
            </div>
  
          </div>
        )}
        {experience?.some(
          (item) =>
            item.jobTitle ||
            item.company ||
            item.startDate ||
            item.endDate ||
            item.description
        ) && (
          <div className="mt-6">
  
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Experience
            </h2>
  
            <div className="mt-4 space-y-5">
  
              {experience.map((item, index) => {
  
                if (
                  !item.jobTitle &&
                  !item.company &&
                  !item.startDate &&
                  !item.endDate &&
                  !item.description
                ) {
                  return null;
                }
  
                return (
                  <div key={index}>
  
                    {item.jobTitle && (
                      <h3 className="font-semibold text-gray-900">
                        {item.jobTitle}
                      </h3>
                    )}
  
                    {item.company && (
                      <p className="mt-1 text-sm text-gray-600">
                        {item.company}
                      </p>
                    )}
  
                    {(item.startDate || item.endDate) && (
                      <p className="mt-1 text-xs text-gray-400">
                        {item.startDate} - {item.endDate}
                      </p>
                    )}
  
                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>
                    )}
  
                  </div>
                );
              })}
  
            </div>
  
          </div>
        )}
        {skills &&
          Object.values(skills).some(
            (categorySkills) => categorySkills.length > 0
          ) && (
            <div className="mt-6">
  
              <h2 className="text-sm font-bold uppercase text-gray-800">
                Skills
              </h2>
  
              <div className="mt-4 space-y-3">
  
                {Object.entries(skills).map(
                  ([category, categorySkills]) => {
  
                    if (categorySkills.length === 0) {
                      return null;
                    }
  
                    return (
                      <div key={category}>
  
                        <p className="text-xs font-semibold uppercase text-gray-400">
                          {category}
                        </p>
  
                        <div className="mt-2 flex flex-wrap gap-2">
  
                          {categorySkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                            >
                              {skill}
                            </span>
                          ))}
  
                        </div>
  
                      </div>
                    );
                  }
                )}
  
              </div>
  
            </div>
          )}
        {projects?.some(
          (project) =>
            project.name ||
            project.technologies ||
            project.description ||
            project.githubUrl ||
            project.liveUrl
        ) && (
          <div className="mt-6">
  
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Projects
            </h2>
  
            <div className="mt-4 space-y-5">
  
              {projects.map((project, index) => {
  
                if (
                  !project.name &&
                  !project.technologies &&
                  !project.description &&
                  !project.githubUrl &&
                  !project.liveUrl
                ) {
                  return null;
                }
  
                return (
                  <div key={index}>
  
                    {project.name && (
                      <h3 className="font-semibold text-gray-900">
                        {project.name}
                      </h3>
                    )}
  
                    {project.technologies && (
                      <p className="mt-1 text-xs font-medium text-gray-500">
                        {project.technologies}
                      </p>
                    )}
  
                    {project.description && (
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {project.description}
                      </p>
                    )}
  
                    <div className="mt-2 flex gap-4 text-xs">
  
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
  
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
  
                    </div>
  
                  </div>
                );
              })}
  
            </div>
  
          </div>
        )}
        {certifications?.some(
          (certification) =>
            certification.name ||
            certification.organization ||
            certification.issueDate ||
            certification.credentialId ||
            certification.credentialUrl
        ) && (
          <div className="mt-6">
  
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Certifications
            </h2>
  
            <div className="mt-4 space-y-5">
  
              {certifications.map((certification, index) => {
  
                if (
                  !certification.name &&
                  !certification.organization &&
                  !certification.issueDate &&
                  !certification.credentialId &&
                  !certification.credentialUrl
                ) {
                  return null;
                }
  
                return (
                  <div key={index}>
  
                    {certification.name && (
                      <h3 className="font-semibold text-gray-900">
                        {certification.name}
                      </h3>
                    )}
  
                    {certification.organization && (
                      <p className="mt-1 text-sm text-gray-600">
                        {certification.organization}
                      </p>
                    )}
  
                    {certification.issueDate && (
                      <p className="mt-1 text-xs text-gray-400">
                        Issued: {certification.issueDate}
                      </p>
                    )}
  
                    {certification.credentialId && (
                      <p className="mt-1 text-xs text-gray-500">
                        Credential ID: {certification.credentialId}
                      </p>
                    )}
  
                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline"
                      >
                        View Credential
                      </a>
                    )}
  
                  </div>
                );
              })}
  
            </div>
  
          </div>
        )}
        {languages?.some((item) => item.language) && (
          <div className="mt-6">
  
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Languages
            </h2>
  
            <div className="mt-4 space-y-3">
  
              {languages.map((item, index) => {
  
                if (!item.language) {
                  return null;
                }
  
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
  
                    <span className="font-medium text-gray-800">
                      {item.language}
                    </span>
  
                    <span className="text-gray-500">
                      {item.proficiency}
                    </span>
  
                  </div>
                );
              })}
  
            </div>
  
          </div>
        )}
  
      </div>
    );
  }
  
  export default ResumePreview;