function ModernTemplate({ resume }) {
  if (!resume) {
    return (
      <div className="mx-auto max-w-4xl bg-white p-8 text-center text-gray-500">
        No resume data available.
      </div>
    );
  }

  const personalInfo = resume.personalInfo || {};
  const education = resume.education || [];
  const experience = resume.experience || [];
  const skills = resume.skills || {};
  const projects = resume.projects || [];
  const certifications =
    resume.certifications || resume.certification || [];
  const languages = resume.languages || [];

  const fullName =
    `${personalInfo.firstName || ""} ${
      personalInfo.lastName || ""
    }`.trim() || "Your Name";

  return (
    <div className="mx-auto w-full max-w-4xl bg-white shadow-lg">

      {/* HEADER */}
      <header className="border-b-4 border-blue-600 px-8 py-8">

        <h1 className="text-4xl font-bold text-gray-900">
          {fullName}
        </h1>

        {personalInfo.jobTitle && (
          <p className="mt-2 text-lg text-gray-600">
            {personalInfo.jobTitle}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">

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

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-blue-600">

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


      <main className="space-y-8 px-8 py-8">
        {resume.summary && (
          <section>

            <SectionTitle title="Profile" />

            <p className="text-sm leading-6 text-gray-700">
              {resume.summary}
            </p>

          </section>
        )}
        {education.length > 0 && (
          <section>

            <SectionTitle title="Education" />

            <div className="space-y-5">

              {education.map((item, index) => {

                if (
                  !item.degree &&
                  !item.institution
                ) {
                  return null;
                }

                return (
                  <div key={index}>

                    <div className="flex flex-col justify-between md:flex-row">

                      <div>

                        <h3 className="font-semibold text-gray-900">
                          {item.degree}
                        </h3>

                        <p className="text-sm text-gray-600">
                          {item.institution}
                        </p>

                      </div>

                      <p className="text-sm text-gray-500">
                        {item.startYear} - {item.endYear}
                      </p>

                    </div>

                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                    )}

                  </div>
                );
              })}

            </div>

          </section>
        )}
        {experience.length > 0 && (
          <section>

            <SectionTitle title="Experience" />

            <div className="space-y-6">

              {experience.map((item, index) => {

                if (
                  !item.jobTitle &&
                  !item.company
                ) {
                  return null;
                }

                return (
                  <div key={index}>

                    <div className="flex flex-col justify-between md:flex-row">

                      <div>

                        <h3 className="font-semibold text-gray-900">
                          {item.jobTitle}
                        </h3>

                        <p className="text-gray-700">
                          {item.company}
                        </p>

                      </div>

                      <p className="text-sm text-gray-500">
                        {item.startDate} - {item.endDate}
                      </p>

                    </div>

                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-gray-700">
                        {item.description}
                      </p>
                    )}

                  </div>
                );
              })}

            </div>

          </section>
        )}
        {Object.values(skills).some(
          (category) =>
            Array.isArray(category) && category.length > 0
        ) && (
          <section>

            <SectionTitle title="Skills" />

            <div className="space-y-3">

              {Object.entries(skills).map(
                ([category, skillList]) => {

                  if (
                    !Array.isArray(skillList) ||
                    skillList.length === 0
                  ) {
                    return null;
                  }

                  return (
                    <div key={category}>

                      <p className="text-sm font-semibold capitalize text-gray-700">
                        {category}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">

                        {skillList.map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
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

          </section>
        )}
        {projects.length > 0 && (
          <section>

            <SectionTitle title="Projects" />

            <div className="space-y-6">

              {projects.map((project, index) => {

                if (!project.name) {
                  return null;
                }

                return (
                  <div key={index}>

                    <h3 className="font-semibold text-gray-900">
                      {project.name}
                    </h3>

                    {project.technologies && (
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        {Array.isArray(project.technologies)
                          ? project.technologies.join(", ")
                          : project.technologies}
                      </p>
                    )}

                    {project.description && (
                      <p className="mt-2 text-sm leading-6 text-gray-700">
                        {project.description}
                      </p>
                    )}

                    <div className="mt-2 flex gap-4 text-sm text-blue-600">

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </a>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          </section>
        )}
        {certifications.length > 0 && (
          <section>

            <SectionTitle title="Certifications" />

            <div className="space-y-4">

              {certifications.map((item, index) => {

                if (!item.name) {
                  return null;
                }

                return (
                  <div key={index}>

                    <h3 className="font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    {(item.organization || item.issuer) && (
                      <p className="text-sm text-gray-600">
                        {item.organization || item.issuer}
                      </p>
                    )}

                    {item.issueDate && (
                      <p className="text-sm text-gray-500">
                        {item.issueDate}
                      </p>
                    )}

                  </div>
                );
              })}

            </div>

          </section>
        )}

        {languages.length > 0 && (
          <section>

            <SectionTitle title="Languages" />

            <div className="flex flex-wrap gap-3">

              {languages.map((item, index) => {

                if (typeof item === "string") {
                  return (
                    <span
                      key={index}
                      className="rounded bg-gray-100 px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  );
                }

                if (!item.language) {
                  return null;
                }

                return (
                  <span
                    key={index}
                    className="rounded bg-gray-100 px-3 py-1 text-sm"
                  >
                    {item.language}
                    {item.proficiency &&
                      ` - ${item.proficiency}`}
                  </span>
                );
              })}

            </div>

          </section>
        )}

      </main>

    </div>
  );
}


function SectionTitle({ title }) {
  return (
    <h2 className="mb-4 border-b-2 border-blue-600 pb-2 text-lg font-bold uppercase tracking-wide text-gray-900">
      {title}
    </h2>
  );
}

export default ModernTemplate;