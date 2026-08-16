
function PersonalInfoForm({ personalInfo, setPersonalInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Personal Information
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Add your basic contact and professional information.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        <div>
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            placeholder="Shravani"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            placeholder="More"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="9876543210"
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
            value={personalInfo.location}
            onChange={handleChange}
            placeholder="Pune, Maharashtra"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Job Title
          </label>

          <input
            type="text"
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleChange}
            placeholder="Full Stack Developer"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            LinkedIn
          </label>

          <input
            type="text"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/username"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            GitHub
          </label>

          <input
            type="text"
            name="github"
            value={personalInfo.github}
            onChange={handleChange}
            placeholder="github.com/username"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

      </div>
    </div>
  );
}

export default PersonalInfoForm;

