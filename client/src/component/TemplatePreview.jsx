import { Link } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Modern",
    description:
      "A clean, modern layout designed for developers, designers, and creative professionals.",
    type: "modern",
  },
  {
    id: 2,
    name: "Professional",
    description:
      "A structured and ATS-friendly design suitable for corporate and professional roles.",
    type: "professional",
  },
  {
    id: 3,
    name: "Minimal",
    description:
      "A simple and elegant layout that keeps the focus on your skills and experience.",
    type: "minimal",
  },
];

function ModernPreview() {
  return (
    <div className="h-full overflow-hidden rounded-sm bg-white shadow-md">
      <div className="bg-blue-600 px-5 py-4">
        <div className="h-3 w-32 rounded bg-white"></div>
        <div className="mt-2 h-2 w-20 rounded bg-blue-200"></div>
      </div>

      <div className="grid grid-cols-[1fr_2fr]">
        <div className="bg-gray-100 p-4">
          <div className="h-2 w-12 rounded bg-blue-600"></div>

          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded bg-gray-300"></div>
            <div className="h-2 w-4/5 rounded bg-gray-300"></div>
          </div>

          <div className="mt-6 h-2 w-12 rounded bg-blue-600"></div>

          <div className="mt-3 space-y-2">
            <div className="h-3 w-10 rounded bg-blue-100"></div>
            <div className="h-3 w-12 rounded bg-blue-100"></div>
            <div className="h-3 w-14 rounded bg-blue-100"></div>
          </div>
        </div>

        <div className="p-4">
          <div className="h-2 w-20 rounded bg-gray-800"></div>

          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded bg-gray-200"></div>
            <div className="h-2 w-5/6 rounded bg-gray-200"></div>
            <div className="h-2 w-4/6 rounded bg-gray-200"></div>
          </div>

          <div className="mt-6 h-2 w-24 rounded bg-gray-800"></div>

          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded bg-gray-200"></div>
            <div className="h-2 w-4/5 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalPreview() {
  return (
    <div className="h-full bg-white p-6 shadow-md">
      <div className="border-b-2 border-gray-800 pb-4 text-center">
        <div className="mx-auto h-4 w-36 rounded bg-gray-900"></div>

        <div className="mx-auto mt-2 h-2 w-24 rounded bg-gray-400"></div>
      </div>

      <div className="mt-5">
        <div className="h-2 w-24 bg-gray-800"></div>

        <div className="mt-3 space-y-2">
          <div className="h-2 w-full rounded bg-gray-200"></div>
          <div className="h-2 w-full rounded bg-gray-200"></div>
          <div className="h-2 w-3/4 rounded bg-gray-200"></div>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-2 w-28 bg-gray-800"></div>

        <div className="mt-3 space-y-2">
          <div className="h-2 w-full rounded bg-gray-200"></div>
          <div className="h-2 w-5/6 rounded bg-gray-200"></div>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-2 w-20 bg-gray-800"></div>

        <div className="mt-3 flex gap-2">
          <div className="h-4 w-12 rounded bg-gray-200"></div>
          <div className="h-4 w-14 rounded bg-gray-200"></div>
          <div className="h-4 w-12 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

function MinimalPreview() {
  return (
    <div className="h-full bg-white p-7 shadow-md">
      <div className="h-4 w-32 rounded bg-gray-900"></div>

      <div className="mt-2 h-2 w-24 rounded bg-gray-300"></div>

      <div className="mt-7 space-y-6">
        <div>
          <div className="h-2 w-16 rounded bg-gray-500"></div>

          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded bg-gray-200"></div>
            <div className="h-2 w-5/6 rounded bg-gray-200"></div>
          </div>
        </div>

        <div>
          <div className="h-2 w-20 rounded bg-gray-500"></div>

          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded bg-gray-200"></div>
            <div className="h-2 w-4/5 rounded bg-gray-200"></div>
          </div>
        </div>

        <div>
          <div className="h-2 w-14 rounded bg-gray-500"></div>

          <div className="mt-3 flex gap-2">
            <div className="h-4 w-10 rounded bg-gray-100"></div>
            <div className="h-4 w-12 rounded bg-gray-100"></div>
            <div className="h-4 w-10 rounded bg-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplatePreview({ type }) {
  if (type === "modern") {
    return <ModernPreview />;
  }

  if (type === "professional") {
    return <ProfessionalPreview />;
  }

  return <MinimalPreview />;
}

function TemplatesPreview() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Resume Templates
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Choose a Template That
            <span className="text-blue-600"> Fits You</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Create a professional resume with a design that matches
            your career and personality.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {templates.map((template) => (
            <div
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="bg-gray-100 p-5">

                <div className="aspect-[3/4] transition duration-300 group-hover:scale-[1.02]">
                  <TemplatePreview type={template.type} />
                </div>

              </div>

              <div className="p-7">

                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {template.name}
                  </h3>

                  <span className="text-xl text-blue-600">
                    →
                  </span>
                </div>

                <p className="mt-3 leading-7 text-gray-600">
                  {template.description}
                </p>

                <Link
                  to={`/template?type=${template.type}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3 hover:text-blue-800"
                >
                  View Template
                  <span>→</span>
                </Link>

              </div>

            </div>
          ))}

        </div>
        <div className="mt-14 text-center">

          <Link
            to="/template"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
          >
            Explore All Templates →
          </Link>

        </div>

      </div>
    </section>
  );
}

export default TemplatesPreview;