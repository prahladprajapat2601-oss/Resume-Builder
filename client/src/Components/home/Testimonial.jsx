import {
    Sparkles,
    FileText,
    Download,
    Globe,
    LayoutTemplate,
    Database,
} from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "AI Resume Enhancement",
        description:
            "Generate professional summaries and improve resume content with AI.",
    },
    {
        icon: LayoutTemplate,
        title: "Modern Templates",
        description:
            "Choose from beautiful resume templates with customizable accent colors.",
    },
    {
        icon: FileText,
        title: "Live Resume Preview",
        description:
            "See every change instantly while editing your resume.",
    },
    {
        icon: Download,
        title: "PDF Export",
        description:
            "Download your ATS-friendly resume as a professional PDF.",
    },
    {
        icon: Globe,
        title: "Public Resume Sharing",
        description:
            "Share your resume instantly using a public URL.",
    },
    {
        icon: Database,
        title: "Redis Powered AI",
        description:
            "AI response caching and request rate limiting using Redis.",
    },
];

const Features = () => {
    return (
        <section id="features" className="py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                <div className="text-center">

                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                        Why Choose Resume Builder
                    </span>

                    <h2 className="mt-6 text-5xl font-bold text-gray-900">
                        Everything You Need To Build
                        <span className="text-indigo-600">
                            {" "}Professional Resumes
                        </span>
                    </h2>

                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        From AI-powered writing assistance to PDF downloads and
                        public resume sharing, Resume Builder helps you create
                        interview-ready resumes in minutes.
                    </p>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-3xl border border-gray-200 p-8 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                                    <Icon className="text-indigo-600" size={28} />
                                </div>

                                <h3 className="mt-6 text-2xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}

                </div>

                <div className="mt-24 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-14 text-center text-white">

                    <h2 className="text-4xl font-bold">
                        Ready to Build Your Resume?
                    </h2>

                    <p className="mt-5 text-indigo-100 max-w-2xl mx-auto">
                        Create ATS-friendly resumes, enhance them with AI,
                        and download professional PDFs—all in one place.
                    </p>

                    <a
                        href="/app"
                        className="inline-block mt-8 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full hover:scale-105 transition"
                    >
                        Start Building →
                    </a>

                </div>

            </div>
        </section>
    );
};

export default Features;