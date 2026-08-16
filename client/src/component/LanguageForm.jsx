
function LanguagesForm({ languages, setLanguages }) {
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedLanguages = [...languages];

    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [name]: value,
    };

    setLanguages(updatedLanguages);
  };

  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        language: "",
        proficiency: "Intermediate",
      },
    ]);
  };

  const removeLanguage = (index) => {
    const updatedLanguages = languages.filter(
      (_, i) => i !== index
    );

    setLanguages(updatedLanguages);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">

      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Languages
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add languages you can speak or communicate in.
        </p>
      </div>
      <div className="mt-6 space-y-4">

        {languages.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-5"
          >

            <div className="flex items-center justify-between">

              <h3 className="font-semibold text-gray-800">
                Language {index + 1}
              </h3>

              {languages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}

            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Language
                </label>

                <input
                  type="text"
                  name="language"
                  value={item.language}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="English"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Proficiency
                </label>

                <select
                  name="proficiency"
                  value={item.proficiency}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>

                  <option value="Fluent">
                    Fluent
                  </option>

                  <option value="Native">
                    Native
                  </option>
                </select>
              </div>

            </div>

          </div>
        ))}

      </div>
      <button
        type="button"
        onClick={addLanguage}
        className="mt-6 rounded-lg border border-blue-600 px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"
      >
        + Add Language
      </button>

    </div>
  );
}

export default LanguagesForm;