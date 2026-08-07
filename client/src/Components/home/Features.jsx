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
      "Sign up and securely manage multiple resumes from one dashboard.",
  },
  {
    icon: FileText,
    title: "Build Resume",
    description:
      "Fill in your education, experience, projects and skills.",
  },
  {
    icon: Sparkles,
    title: "Enhance with AI",
    description:
      "Generate professional summaries and improve your resume with AI.",
  },
  {
    icon: Download,
    title: "Download & Share",
    description:
      "Export your resume as PDF or share it with a public link.",
  },
];

export default function ProcessSection() {
 return (
  <section id="features" className="py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">

      <div className="text-center">
        <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium">
          Simple Process
        </span>

        <h2 className="text-5xl font-bold mt-6 text-gray-900">
          Build Your Resume in
          <span className="text-indigo-600"> 4 Easy Steps</span>
        </h2>

        <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-8">
          Everything you need—from creating your resume to enhancing it
          with AI and downloading a professional PDF.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 mt-20">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <Icon className="text-indigo-600" size={28} />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {step.description}
              </p>

              <div className="absolute top-6 right-6 text-5xl font-bold text-gray-100">
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-24 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
        <img
          src="/resume-preview.png"
          alt="Resume Builder"
          className="w-full"
        />
      </div>

    </div>
  </section>
);
}