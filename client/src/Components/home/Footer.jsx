import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            
            <section className="px-6 lg:px-20 py-24 bg-white">
                <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-10 py-16 shadow-xl">

                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        <div>
                            <h2 className="text-4xl font-bold">
                                Ready to Build Your Dream Resume?
                            </h2>

                            <p className="mt-5 text-indigo-100 leading-7">
                                Create ATS-friendly resumes, enhance them using AI,
                                customize beautiful templates and download professional
                                PDFs in minutes.
                            </p>

                            <div className="flex flex-wrap gap-3 mt-8">

                                <span className="bg-white/15 px-4 py-2 rounded-full text-sm">
                                    🤖 AI Powered
                                </span>

                                <span className="bg-white/15 px-4 py-2 rounded-full text-sm">
                                    📄 PDF Export
                                </span>

                                <span className="bg-white/15 px-4 py-2 rounded-full text-sm">
                                    🌍 Public Share
                                </span>

                                <span className="bg-white/15 px-4 py-2 rounded-full text-sm">
                                    ⚡ Live Preview
                                </span>

                            </div>
                        </div>

                        <div className="flex justify-center md:justify-end">

                            <Link
                                to="/app"
                                className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full hover:scale-105 transition"
                            >
                                Build My Resume

                                <ArrowRight size={20} />

                            </Link>

                        </div>

                    </div>

                </div>
            </section>

            {/* Footer */}

            <footer id="contact">

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-4 gap-12">

                    <div>

                        <img
                            src="/logo.svg"
                            className="h-11 mb-6"
                            alt="logo"
                        />

                        <p className="leading-7 text-gray-400">
                            AI-powered resume builder built using
                            React, Express, MongoDB and Redis.
                        </p>

                    </div>

                    <div>

                        <h3 className="text-white font-semibold mb-5">
                            Product
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            <li>
                                <Link to="/app">
                                    Dashboard
                                </Link>
                            </li>

                            <li>Resume Builder</li>

                            <li>Templates</li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-white font-semibold mb-5">
                            Features
                        </h3>

                        <ul className="space-y-3">

                            <li>AI Enhancement</li>

                            <li>PDF Download</li>

                            <li>Public Sharing</li>

                            <li>Redis Cache</li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-white font-semibold mb-5">
                            Connect
                        </h3>

                        <div className="flex gap-5 text-2xl">
                            <a
                                href="https://github.com/prahladprajapat2601-oss"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-white transition"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/YOUR-LINKEDIN"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#0A66C2] transition"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="mailto:prahladprajapat2601@gmail.com"
                                className="hover:text-indigo-400 transition"
                            >
                                <MdEmail />
                            </a>
                        </div>

                        <p className="mt-8 text-gray-400 leading-7">

                            Designed & Developed by

                            <br />

                            <span className="text-indigo-400 font-semibold">
                                Prahlad Prajapat
                            </span>

                        </p>

                    </div>

                </div>

                <div className="border-t border-slate-700">

                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

                        <p className="text-sm text-gray-400">
                            © 2026 Resume Builder. All rights reserved.
                        </p>

                        <p className="text-sm text-gray-500 mt-3 md:mt-0">
                            Built with ❤️ using React • Express • MongoDB • Redis
                        </p>

                    </div>

                </div>

            </footer>
        </>
    );
};

export default Footer;