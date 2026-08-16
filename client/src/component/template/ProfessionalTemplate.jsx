function ProfessionalTemplate({ resume }) {
  if (!resume) {
    return (
      <div className="bg-white p-8 text-center text-gray-500">
        No resume data available.
      </div>
    );
  }

  const personalInfo = resume.personalInfo || {};
  const education = resume.education || [];
  const experience = resume.experience || [];
  const skills = resume.skills || {};
  const projects = resume.projects || [];
  const certifications = resume.certification || [];
  const languages = resume.languages || [];

  return (
    <div className="mx-auto w-full max-w-4xl bg-white px-10 py-8 shadow-lg">

      <header className="border-b border-gray-400 pb-5 text-center">

        <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900">
          {personalInfo.firstName || "Your"}{" "}
          {personalInfo.lastName || "Name"}
        </h1>

        {personalInfo.jobTitle && (
          <p className="mt-2 text-sm font-medium text-gray-700">
            {personalInfo.jobTitle}
          </p>
        )}

        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">

          {personalInfo.email && (
            <span>{personalInfo.email}</span>
          )}

          {personalInfo.phone && (
            <span>{personalInfo.phone}</span>
          )}

          {personalInfo.location && (
            <span>{personalInfo.location}</span>
          )}

        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm text-gray-700">

          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          )}

          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          )}

        </div>

      </header>


      <main className="space-y-7 py-7">
        {resume.summary && (
          <section>
            <ProfessionalHeading title="PROFESSIONAL SUMMARY" />

            <p className="text-sm leading-6 text-gray-700">
              {resume.summary}
            </p>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <ProfessionalHeading title="EDUCATION" />

            <div className="space-y-4">

              {education.map((item, index) => (
                <div key={index}>

                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-4">

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.degree}
                      </h3>

                      <p className="text-gray-700">
                        {item.institution}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm text-gray-600">
                      {item.startYear} - {item.endYear}
                    </p>

                  </div>

                  {item.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {item.description}
                    </p>
                  )}

                </div>
              ))}

            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <ProfessionalHeading title="PROFESSIONAL EXPERIENCE" />

            <div className="space-y-5">

              {experience.map((item, index) => (
                <div key={index}>

                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-4">

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.jobTitle}
                      </h3>

                      <p className="text-gray-700">
                        {item.company}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm text-gray-600">
                      {item.startDate} - {item.endDate || "Present"}
                    </p>

                  </div>

                  {item.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {item.description}
                    </p>
                  )}

                </div>
              ))}

            </div>
          </section>
        )}

        {Object.values(skills).some(
          (value) =>
            Array.isArray(value) && value.length > 0
        ) && (
          <section>
            <ProfessionalHeading title="SKILLS" />

            <div className="space-y-2">

              {Object.entries(skills).map(
                ([category, skillList]) => {

                  if (
                    !Array.isArray(skillList) ||
                    skillList.length === 0
                  ) {
                    return null;
                  }

                  return (
                    <p
                      key={category}
                      className="text-sm leading-6 text-gray-700"
                    >
                      <span className="font-bold capitalize">
                        {category}:
                      </span>{" "}
                      {skillList.join(" • ")}
                    </p>
                  );
                }
              )}

            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <ProfessionalHeading title="PROJECTS" />

            <div className="space-y-5">

              {projects.map((project, index) => (
                <div key={index}>

                  <h3 className="font-bold text-gray-900">
                    {project.name}
                  </h3>

                  {project.technologies && (
                    <p className="mt-1 text-sm text-gray-600">
                      <strong>Technologies:</strong>{" "}

                      {Array.isArray(project.technologies)
                        ? project.technologies.join(", ")
                        : project.technologies}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      {project.description}
                    </p>
                  )}

                  <div className="mt-2 flex gap-4 text-sm">

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-800 hover:underline"
                      >
                        GitHub
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-800 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}

                  </div>

                </div>
              ))}

            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <ProfessionalHeading title="CERTIFICATIONS" />

            <div className="space-y-3">

              {certifications.map((item, index) => (
                <div key={index}>

                  <h3 className="font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-700">
                    {item.issuer || item.organization}
                  </p>

                  {item.issueDate && (
                    <p className="text-sm text-gray-600">
                      {item.issueDate}
                    </p>
                  )}

                </div>
              ))}

            </div>
          </section>
        )}
        {languages.length > 0 && (
          <section>
            <ProfessionalHeading title="LANGUAGES" />

            <p className="text-sm text-gray-700">
              {languages
                .map((item) => {
                  if (typeof item === "string") {
                    return item;
                  }

                  return item.proficiency
                    ? `${item.language} (${item.proficiency})`
                    : item.language;
                })
                .join(" • ")}
            </p>

          </section>
        )}

      </main>

    </div>
  );
}

function ProfessionalHeading({ title }) {
  return (
    <h2 className="mb-4 border-b border-gray-400 pb-1 text-sm font-bold tracking-widest text-gray-900">
      {title}
    </h2>
  );
}

export default ProfessionalTemplate;