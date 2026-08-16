function MinimalTemplate({ resume }) {
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
    <div className="mx-auto w-full max-w-4xl bg-white px-12 py-10 shadow-lg">

      <header className="pb-8">

        <h1 className="text-4xl font-light tracking-tight text-gray-900">
          {personalInfo.firstName || "Your"}{" "}
          {personalInfo.lastName || "Name"}
        </h1>

        {personalInfo.jobTitle && (
          <p className="mt-2 text-sm text-gray-700">
            {personalInfo.jobTitle}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">

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

        <div className="mt-2 flex gap-4 text-xs text-gray-500">

          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
            >
              LinkedIn
            </a>
          )}

          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
            >
              GitHub
            </a>
          )}

        </div>

      </header>


      <main className="space-y-8">

        {resume.summary && (
          <section>

            <MinimalHeading title="Professional Summary" />

            <p className="text-sm leading-7 text-gray-600">
              {resume.summary}
            </p>

          </section>
        )}

        {education.length > 0 && (
          <section>

            <MinimalHeading title="Education" />

            {education.map((item, index) => (
              <div key={index} className="mb-5">

                <div className="flex flex-col justify-between gap-2 md:flex-row">

                  <div>

                    <h3 className="text-sm font-semibold text-gray-900">
                      {item.degree}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {item.institution}
                    </p>

                  </div>

                  <p className="text-xs text-gray-400">
                    {item.startYear} — {item.endYear}
                  </p>

                </div>

                {item.description && (
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                )}

              </div>
            ))}

          </section>
        )}
        {experience.length > 0 && (
          <section>

            <MinimalHeading title="Experience" />

            {experience.map((item, index) => (
              <div key={index} className="mb-6">

                <div className="flex flex-col justify-between gap-2 md:flex-row">

                  <div>

                    <h3 className="text-sm font-semibold text-gray-900">
                      {item.jobTitle}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {item.company}
                    </p>

                  </div>

                  <p className="text-xs text-gray-400">
                    {item.startDate} — {item.endDate || "Present"}
                  </p>

                </div>

                {item.description && (
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                )}

              </div>
            ))}

          </section>
        )}

        {Object.values(skills).some(
          (value) =>
            Array.isArray(value) && value.length > 0
        ) && (
          <section>

            <MinimalHeading title="Skills" />

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
                      className="text-sm leading-7 text-gray-600"
                    >
                      <span className="font-medium capitalize text-gray-800">
                        {category}:{" "}
                      </span>

                      {skillList.join(" · ")}
                    </p>
                  );
                }
              )}

            </div>

          </section>
        )}
        {projects.length > 0 && (
          <section>

            <MinimalHeading title="Projects" />

            {projects.map((project, index) => (
              <div key={index} className="mb-6">

                <h3 className="text-sm font-semibold text-gray-900">
                  {project.name}
                </h3>

                {project.technologies && (
                  <p className="mt-1 text-xs text-gray-500">

                    {Array.isArray(project.technologies)
                      ? project.technologies.join(" · ")
                      : project.technologies}

                  </p>
                )}

                {project.description && (
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {project.description}
                  </p>
                )}

                <div className="mt-2 flex gap-4 text-xs text-gray-500">

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-gray-900"
                    >
                      GitHub
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-gray-900"
                    >
                      Live Demo
                    </a>
                  )}

                </div>

              </div>
            ))}

          </section>
        )}

        {certifications.length > 0 && (
          <section>

            <MinimalHeading title="Certifications" />

            {certifications.map((item, index) => (
              <div key={index} className="mb-4">

                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>

                <p className="text-xs text-gray-500">
                  {item.issuer || item.organization}
                </p>

                {item.issueDate && (
                  <p className="mt-1 text-xs text-gray-400">
                    {item.issueDate}
                  </p>
                )}

              </div>
            ))}

          </section>
        )}
        {languages.length > 0 && (
          <section>

            <MinimalHeading title="Languages" />

            <p className="text-sm text-gray-600">

              {languages
                .map((item) => {

                  if (typeof item === "string") {
                    return item;
                  }

                  return item.proficiency
                    ? `${item.language} (${item.proficiency})`
                    : item.language;
                })
                .join(" · ")}

            </p>

          </section>
        )}

      </main>

    </div>
  );
}

function MinimalHeading({ title }) {
  return (
    <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
      {title}
    </h2>
  );
}

export default MinimalTemplate;