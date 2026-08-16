
const steps = [
  {
    number: "01",
    title: "Enter Your Details",
    description:
      "Add your personal information, education, experience, skills, projects, and certifications.",
  },
  {
    number: "02",
    title: "Improve With AI",
    description:
      "Use AI to improve your summary, generate professional bullet points, and enhance your resume content.",
  },
  {
    number: "03",
    title: "Choose a Template",
    description:
      "Select a professional and ATS-friendly template that matches your career and personal style.",
  },
  {
    number: "04",
    title: "Download Your Resume",
    description:
      "Preview your completed resume and download it as a professional PDF ready to share with recruiters.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            How It Works
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Create Your Resume in Four Simple Steps
          </h2>

          <p className="mt-4 text-gray-600">
            Our resume builder makes it simple to create a professional
            resume without starting from scratch.
          </p>

        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-6 text-gray-600">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;

