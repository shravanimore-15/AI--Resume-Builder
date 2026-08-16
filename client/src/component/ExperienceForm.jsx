
function ExperienceForm({ experience, setExperience }) {

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    const updatedExperience = [...experience];

    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: type === "checkbox" ? checked : value,
    };

    setExperience(updatedExperience);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    const updatedExperience = experience.filter(
      (_, i) => i !== index
    );

    setExperience(updatedExperience);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Work Experience
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add your internships, jobs, and other relevant work experience.
        </p>
      </div>
      <div className="mt-6 space-y-6">

        {experience.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between">

              <h3 className="font-semibold text-gray-800">
                Experience {index + 1}
              </h3>

              {experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}

            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Job Title
                </label>

                <input
                  type="text"
                  name="jobTitle"
                  value={item.jobTitle}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Full Stack Developer Intern"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={item.company}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="ABC Technologies"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={item.location}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Pune, Maharashtra"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>

                <input
                  type="month"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>

                <input
                  type="month"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleChange(index, e)}
                  disabled={item.currentlyWorking}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>
              <div className="flex items-center gap-3 md:mt-7">

                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={item.currentlyWorking}
                  onChange={(e) => handleChange(index, e)}
                  className="h-4 w-4"
                />

                <label className="text-sm text-gray-700">
                  I currently work here
                </label>

              </div>
              <div className="md:col-span-2">

                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  rows={5}
                  value={item.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Describe your responsibilities, achievements, and contributions..."
                  className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 leading-6 outline-none focus:border-blue-500"
                />

              </div>

            </div>

          </div>
        ))}

      </div>
      <button
        type="button"
        onClick={addExperience}
        className="mt-6 rounded-lg border border-blue-600 px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"
      >
        + Add Experience
      </button>

    </div>
  );
}

export default ExperienceForm;