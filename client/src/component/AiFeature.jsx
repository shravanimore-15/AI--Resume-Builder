
const aiFeatures = [
  {
    icon: "✨",
    title: "Generate Professional Summary",
    description:
      "Let AI create a professional summary based on your education, skills, experience, and career goals.",
  },
  {
    icon: "✍️",
    title: "Improve Resume Content",
    description:
      "Improve your existing resume content and make your descriptions clearer, stronger, and more professional.",
  },
  {
    icon: "🚀",
    title: "Generate Experience Bullet Points",
    description:
      "Turn your work experience into strong, action-oriented bullet points that highlight your achievements.",
  },
  {
    icon: "💡",
    title: "Suggest Relevant Skills",
    description:
      "Get skill suggestions based on your projects, experience, education, and target job role.",
  },
  {
    icon: "📊",
    title: "Analyze Your Resume",
    description:
      "Get an AI-powered analysis of your resume with suggestions for improving content, skills, and structure.",
  },
];

function AIFeatures() {
  return (
    <section className="bg-gray-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            AI-Powered
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Build a Better Resume With AI
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            Get intelligent suggestions and improvements while creating your
            resume. Let AI help you write stronger and more professional content.
          </p>

        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {aiFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition hover:-translate-y-1 hover:border-gray-500 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700 text-2xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="mt-3 leading-6 text-gray-400">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default AIFeatures;

