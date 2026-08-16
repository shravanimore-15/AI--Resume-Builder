
function CertificationForm({
  certifications,
  setCertifications,
}) {
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedCertifications = [...certifications];

    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [name]: value,
    };

    setCertifications(updatedCertifications);
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        name: "",
        organization: "",
        issueDate: "",
        credentialId: "",
        credentialUrl: "",
      },
    ]);
  };

  const removeCertification = (index) => {
    const updatedCertifications = certifications.filter(
      (_, i) => i !== index
    );

    setCertifications(updatedCertifications);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Certifications
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add certifications, courses, and professional credentials.
        </p>
      </div>
      <div className="mt-6 space-y-6">

        {certifications.map((certification, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between">

              <h3 className="font-semibold text-gray-800">
                Certification {index + 1}
              </h3>

              {certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeCertification(index)
                  }
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}

            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Certification Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={certification.name}
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                  placeholder="AWS Certified Cloud Practitioner"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Issuing Organization
                </label>

                <input
                  type="text"
                  name="organization"
                  value={certification.organization}
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                  placeholder="Amazon Web Services"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Issue Date
                </label>

                <input
                  type="month"
                  name="issueDate"
                  value={certification.issueDate}
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Credential ID
                </label>

                <input
                  type="text"
                  name="credentialId"
                  value={certification.credentialId}
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                  placeholder="ABC123456"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Credential URL
                </label>

                <input
                  type="url"
                  name="credentialUrl"
                  value={certification.credentialUrl}
                  onChange={(e) =>
                    handleChange(index, e)
                  }
                  placeholder="https://example.com/certificate"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>

          </div>
        ))}

      </div>
      <button
        type="button"
        onClick={addCertification}
        className="mt-6 rounded-lg border border-blue-600 px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"
      >
        + Add Certification
      </button>

    </div>
  );
}

export default CertificationForm;
