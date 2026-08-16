
const features = [
  {
    icon: "🤖",
    title: "AI-Powered Suggestions",
    description:
      "Improve your resume content with AI-generated summaries, descriptions, and professional bullet points.",
  },
  {
    icon: "📄",
    title: "ATS-Friendly Resumes",
    description:
      "Create clean and professional resumes designed to work well with Applicant Tracking Systems.",
  },
  {
    icon: "🎨",
    title: "Professional Templates",
    description:
      "Choose from modern, professional, and minimal resume templates for different career needs.",
  },
  {
    icon: "⚡",
    title: "Quick Resume Creation",
    description:
      "Build your resume quickly by entering your information through an easy step-by-step builder.",
  },
  {
    icon: "📊",
    title: "Resume Analysis",
    description:
      "Analyze your resume and get useful suggestions to improve its quality and effectiveness.",
  },
  {
    icon: "📥",
    title: "Download as PDF",
    description:
      "Download your completed resume as a professional PDF that is ready to share with recruiters.",
  },
];

function Features() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Everything You Need to Build a Better Resume
          </h2>

          <p className="mt-4 text-gray-600">
            Create, improve, analyze, and download your resume using
            powerful tools designed to make resume building easier.
          </p>

        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
             >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 leading-6 text-gray-600">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;

