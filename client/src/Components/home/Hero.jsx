
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
    const { user } = useSelector((state) => state.auth);

    const [menuOpen, setMenuOpen] = React.useState(false);



    return (
        <>
            <div className="min-h-screen pb-20">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <Link to="/">
                        <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-slate-800">
                        <a href="#" className="hover:text-indigo-600 transition">
                            Home
                        </a>

                        <a href="#process" className="hover:text-indigo-600 transition">
                            How It Works
                        </a>

                        <a
                            href="#features"
                            className="relative transition-all duration-300 hover:text-indigo-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full"
                        >
                            Features
                        </a>

                        <a href="#contact" className="hover:text-indigo-600 transition">
                            Contact
                        </a>
                    </div>

                    <div className="flex gap-2">
                        <Link to='/app?state=register' className="hidden md:block px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white" hidden={user}>
                            Get started
                        </Link>
                        <Link to='/app?state=login' className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900" hidden={user}>
                            Login
                        </Link>
                        <Link to="/app"
                            className="hidden md:block px-8 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white"
                            hidden={!user}>
                            Dashboard
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                    <a href="#" className="text-white">Home</a>
                    <a href="#process" className="text-white">How It Works</a>
                    <a href="#features" className="text-white">Features</a>
                    <a href="#contact" className="text-white">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md flex" >
                        X
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>

                    {/* Avatars + Stars */}
                    <div className="inline-flex items-center gap-2 mt-20 px-6 py-3 rounded-full
bg-white/70 backdrop-blur-md border border-indigo-200
shadow-lg shadow-indigo-100">

                        <span className="text-xl">✨</span>

                        <span className="font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            AI Resume Builder
                        </span>

                    </div>

                    {/* Headline + CTA */}
                    <h1 className="text-5xl md:text-7xl font-extrabold text-center max-w-5xl leading-tight mt-8">
                        Build
                        <span className="text-indigo-600"> ATS-Friendly </span>
                        Resumes
                        <br />
                        with AI
                    </h1>

                    <p className="max-w-2xl text-center text-lg text-gray-600 mt-8 leading-8">
                        Create beautiful resumes, enhance content using AI,
                        manage multiple resumes, download PDFs,
                        and share resumes publicly—all in one place.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 mt-8">
                        <Link
                            to="/app"
                            className="
bg-gradient-to-r
from-indigo-600
to-violet-600
text-white
rounded-full
px-8
h-12
flex
items-center
transition-all
duration-300
shadow-lg
hover:shadow-indigo-400/40
hover:-translate-y-1
"
                        >
                            Get Started
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 size-4"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>

                        <a
                            href="https://github.com/prahladprajapat2601-oss/Resume-Builder"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-full px-8 h-12 text-gray-700 transition-all shadow-sm hover:shadow-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-black"
                            >
                                <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.86 10.92c.575.106.785-.25.785-.556 0-.274-.01-1-.016-1.963-3.198.695-3.873-1.54-3.873-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.045-.714.08-.699.08-.699 1.156.082 1.764 1.187 1.764 1.187 1.028 1.76 2.697 1.252 3.354.958.104-.745.402-1.252.73-1.54-2.553-.29-5.237-1.277-5.237-5.683 0-1.255.45-2.282 1.187-3.087-.119-.291-.514-1.463.113-3.05 0 0 .968-.31 3.172 1.18a10.96 10.96 0 0 1 5.775 0c2.203-1.49 3.17-1.18 3.17-1.18.629 1.587.234 2.759.115 3.05.74.805 1.185 1.832 1.185 3.087 0 4.417-2.688 5.39-5.249 5.675.413.356.781 1.058.781 2.133 0 1.54-.014 2.78-.014 3.158 0 .31.207.669.79.555A11.503 11.503 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5z" />
                            </svg>

                            <span>View Source</span>
                        </a>
                    </div>


                    <p className="py-8 text-gray-500 mt-14 text-sm font-medium uppercase tracking-widest">
                        Built With
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {[
                            "React",
                            "Redux Toolkit",
                            "Express",
                            "MongoDB",
                            "Redis",
                            "OpenAI",
                            "TailwindCSS",
                        ].map((tech) => (
                            <span
                                key={tech}
                                className=" px-5 py-2 rounded-full  bg-white border border-gray-200 shadow-sm hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-lg  transition-all duration-300  cursor-default
"                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="mt-16 flex flex-col items-center">

                        <span className="text-gray-400 text-sm">
                            Scroll to Explore
                        </span>

                        <svg
                            className="mt-2 w-5 h-5 text-indigo-500 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Hero;