
function EducationForm({ education, setEducation }) {

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedEducation = [...education];

    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value,
    };

    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    const updatedEducation = education.filter(
      (_, i) => i !== index
    );

    setEducation(updatedEducation);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Education
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add your educational qualifications.
        </p>
      </div>
      <div className="mt-6 space-y-6">

        {education.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between">

              <h3 className="font-semibold text-gray-800">
                Education {index + 1}
              </h3>

              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}

            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Degree
                </label>

                <input
                  type="text"
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="B.E. Computer Engineering"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Institution
                </label>

                <input
                  type="text"
                  name="institution"
                  value={item.institution}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Siddhant College of Engineering"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Start Year
                </label>

                <input
                  type="text"
                  name="startYear"
                  value={item.startYear}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="2023"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  End Year
                </label>

                <input
                  type="text"
                  name="endYear"
                  value={item.endYear}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="2027"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">

                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  rows={4}
                  value={item.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Add relevant coursework, achievements, activities, etc."
                  className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

            </div>

          </div>
        ))}

      </div>
      <button
        type="button"
        onClick={addEducation}
        className="mt-6 rounded-lg border border-blue-600 px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"
      >
        + Add Education
      </button>

    </div>
  );
}

export default EducationForm;
