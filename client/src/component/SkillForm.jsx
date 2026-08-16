
function SkillsForm({ skills, setSkills }) {
  const addSkill = (category) => {
    const skill = prompt(`Enter ${category} skill:`);

    if (!skill || !skill.trim()) {
      return;
    }

    const newSkill = skill.trim();

    if (skills[category].includes(newSkill)) {
      return;
    }

    setSkills({
      ...skills,
      [category]: [...skills[category], newSkill],
    });
  };

  const removeSkill = (category, skillToRemove) => {
    setSkills({
      ...skills,
      [category]: skills[category].filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  const categories = [
    {
      name: "frontend",
      label: "Frontend",
    },
    {
      name: "backend",
      label: "Backend",
    },
    {
      name: "database",
      label: "Database",
    },
    {
      name: "tools",
      label: "Tools & Technologies",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">

      <h2 className="text-2xl font-semibold text-gray-900">
        Skills
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Add the technical skills that are relevant to your career.
      </p>

      <div className="mt-6 space-y-6">

        {categories.map((category) => (
          <div
            key={category.name}
            className="rounded-lg border border-gray-200 p-5"
          >

            <div className="flex items-center justify-between">

              <h3 className="font-semibold text-gray-800">
                {category.label}
              </h3>

              <button
                type="button"
                onClick={() => addSkill(category.name)}
                className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                + Add Skill
              </button>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              {skills[category.name].length === 0 ? (
                <p className="text-sm text-gray-400">
                  No skills added yet.
                </p>
              ) : (
                skills[category.name].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                  >

                    <span>{skill}</span>

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(category.name, skill)
                      }
                      className="font-bold text-blue-500 hover:text-red-500"
                    >
                      ×
                    </button>

                  </div>
                ))
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SkillsForm;
