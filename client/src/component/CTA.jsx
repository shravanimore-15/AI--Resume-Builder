
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-blue-600 px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-5xl">
          Ready to Build Your Resume?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
          Create a professional resume with AI assistance, choose a
          professional template, and get ready to apply for your next
          opportunity.
        </p>
        <div className="mt-8">
          <Link
            to="/createresume"
            className="inline-block rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Create My Resume
          </Link>
        </div>

      </div>
    </section>
  );
}

export default CTA;
