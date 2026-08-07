import {
  UserPlus,
  FileText,
  Sparkles,
  Download,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description:
      "Sign up securely and manage multiple resumes from one dashboard.",
  },
  {
    icon: FileText,
    title: "Build Your Resume",
    description:
      "Add your education, experience, projects and skills with an intuitive editor.",
  },
  {
    icon: Sparkles,
    title: "Enhance with AI",
    description:
      "Generate ATS-friendly summaries and improve job descriptions instantly.",
  },
  {
    icon: Download,
    title: "Download & Share",
    description:
      "Export your resume as a professional PDF or share it using a public link.",
  },
];

const ProcessSection = () => {
  return (
    <section
      id="process"
      className="py-24 bg-gradient-to-b from-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-4 py-2 font-medium">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            Build Your Resume in
            <span className="text-indigo-600"> 4 Easy Steps</span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-8">
            Everything you need—from creating your resume to enhancing it
            with AI and downloading a professional PDF.
          </p>

        </div>

        {/* Steps */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Step Number */}

                <div className="absolute top-6 right-6 text-5xl font-bold text-gray-100">
                  {index + 1}
                </div>

                {/* Icon */}

                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                  <Icon size={28} className="text-indigo-600" />
                </div>

                {/* Title */}

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="mt-3 text-gray-600 leading-7">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Product Preview */}

        <div className="mt-20 rounded-3xl overflow-hidden border border-gray-200 shadow-2xl">

          <img
            src="/resume-preview.png"
            alt="Resume Builder Preview"
            className="w-full object-cover"
          />

        </div>

      </div>
    </section>
  );
};

export default ProcessSection;