import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { WritingText } from "@/components/animate-ui/text/writing";
import Freelancers from "../../components/Freelancers";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import MagicContainer from "../../../component/magic card/magiccard";
import SparklesText from "./../../../component/sparktext/SparklesText";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { useState } from "react";

const categories = [
  { name: "Web Development", icon: "💻" },
  { name: "UI/UX Designing", icon: "🎨" },
  { name: "Video Editing", icon: "🎬" },
  { name: "Content Writing", icon: "✍️" },
];

const ClientDashboard = () => {
  const navigate = useNavigate(); // Import useNavigate from react-router-dom
  const [user, setuser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add useEffect to check for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (userString) {
      setuser(JSON.parse(userString));
    }
    if (!token) {
      navigate("/"); // Redirect to login or home page if no token found.
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="p-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100 min-h-[75vh]">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl  rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr  rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-8 lg:px-16 py-16 lg:py-20">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl text-center lg:text-left mb-12 lg:mb-0">
              {/* Greeting */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Hello, {user?.username || "Welcome"}
                </span>
              </div>

              {/* Main Heading */}
              <div className="flex items-center gap-2">
                <h1 className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Welcome to{" "}
                </h1>
                <span className="text-4xl font-extrabold text-gray-800 flex items-center">
                  <span
                    className="mr-1"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      letterSpacing: "-2px",
                    }}
                  >
                    Giglyy
                  </span>
                  <span className="ml-1 w-3 h-3 rounded-full bg-green-400 inline-block"></span>
                </span>
              </div>

              {/* Subtitle */}
              <div className="mb-8">
                <WritingText
                  className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium"
                  text="Your one-stop platform for finding and hiring top freelance talent worldwide."
                  spacing={12}
                />
              </div>

              {/* Stats or Features */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">10k+</span>
                  </div>
                  <span>Freelancers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">5k+</span>
                  </div>
                  <span>Projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">99%</span>
                  </div>
                  <span>Satisfaction</span>
                </div>
              </div>

              {/* Enhanced Search Bar */}
              <div className="w-full max-w-2xl mx-auto lg:mx-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const gigsSection = document.getElementById(
                      "freelancer-gigs-section"
                    );
                    if (gigsSection) {
                      gigsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-2 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl mr-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for services, skills, or freelancers..."
                      className="flex-1 bg-transparent outline-none text-lg text-gray-700 placeholder-gray-400 py-3"
                    />
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {/* Popular Searches */}
                <div
                  id="services"
                  className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2"
                >
                  <span className="text-sm text-gray-500">Popular:</span>
                  {[
                    "Web Development",
                    "UI/UX Design",
                    "Content Writing",
                    "Video Editing",
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Animation */}
            <div className="flex-shrink-0 w-full lg:w-auto lg:ml-12">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
                  <DotLottieReact
                    src="https://lottie.host/f8dbc0a1-5c77-4f62-b209-f4d94542cfa5/vPu8fi1fu1.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col justify-center mt-5"
        id="freelancer-gigs-section"
      >
        <SparklesText text="Freelancers" />

        <div className="p-6">
          <div className="bg-white rounded-2xl py-5 px-2">
            <Freelancers searchQuery={searchQuery} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <h1 className="text-4xl font-medium text-white mb-2 text-center">
            Categories
          </h1>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group cursor-pointer rounded-2xl bg-white/90 backdrop-blur-sm p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200/50"
                onClick={() => {
                  setSearchQuery(cat.name); // Set search query to category name
                  // Optionally scroll to gigs section
                  const gigsSection = document.getElementById(
                    "freelancer-gigs-section"
                  );
                  if (gigsSection) {
                    gigsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={{ userSelect: "none" }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-300 to-blue-100 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <span className="text-4xl">{cat.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-green-600">
                  {cat.name}
                </h3>
                <div className="mt-2 h-1 w-10 mx-auto bg-green-200 rounded-full transition-all duration-300 group-hover:w-16 group-hover:bg-green-400"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Post a Job Section */}
      <div className="my-20 px-4">
        <div className="relative max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-2xl p-10 md:p-16 text-white overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full opacity-50"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Have a project in mind?
              </h2>
              <p className="text-lg opacity-90 max-w-md">
                Post your job today and get proposals from talented freelancers.
              </p>
            </div>
            <button
              onClick={() => navigate("/post-job")}
              className="bg-white text-green-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              Post a Job
            </button>
          </div>
        </div>
      </div>

      {/* About and Creator Section */}
      <div id="aboutus" className="p-6">
        <div className="py-20 rounded-2xl px-4 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-16 items-center">
            {/* About Giglyy Section */}
            <div className="md:col-span-3 space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is{" "}
                <span className="text-gray-800 font-extrabold">
                  Giglyy{" "}
                  <span className="text-green-500 font-extrabold">.</span>
                </span>
                ?
              </h2>
              <p className="text-gray-600 text-lg">
                Giglyy is a dynamic freelance marketplace designed to bridge the
                gap between talented professionals and clients seeking their
                expertise. Our mission is to create a seamless, secure, and
                efficient environment for collaboration.
              </p>
              <p className="text-gray-600">
                Whether you're a developer, designer, writer, or video editor,
                Giglyy provides the tools you need to showcase your skills,
                manage projects, and grow your career. For clients, we offer a
                curated pool of top-tier talent, ensuring your projects are in
                capable hands.
              </p>
            </div>
            <div className="flex items-center justify-center p-4 w-full ml-20">
              <MagicContainer className="w-full max-w-2xl md:max-w-3xl min-w-[340px] md:min-w-[400px]">
                <div className="w-full rounded-[23px] bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative h-32">
                    <img
                      src="magiccardbg.png"
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Profile Content */}
                  <div className="relative p-6 pt-0">
                    {/* Profile Image */}
                    <div className="absolute left-6 -top-12">
                      <img
                        src="Jay_PIc.jpg"
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                      />
                    </div>
                    {/* User Info */}
                    <div className="text-left pt-2 mt-4">
                      <h2 className="text-2xl mt-10 font-bold text-gray-800 dark:text-gray-100">
                        Jay Thakor
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @jaythakor
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-snug">
                        Full Stack Dev 🚀 | React • Express • MongoDB |
                        Generative AI Tinkerer | BTech CE Student
                      </p>
                    </div>
                    {/* Skills and Expertise */}
                    // add one seperator
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-4"></div>
                    <div className="flex items-center justify-between mt-4">
                      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Skills and Expertise
                      </h1>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-gray-200 font-medium dark:bg-gray-700 text-[#364153] dark:text-gray-300 px-3 py-1 rounded-full text-lg">
                        React
                      </span>
                      <span className="bg-gray-200 font-medium dark:bg-gray-700 text-[#364153] dark:text-gray-300 px-3 py-1 rounded-full text-lg">
                        Express
                      </span>
                      <span className="bg-gray-200 font-medium dark:bg-gray-700 text-[#364153] dark:text-gray-300 px-3 py-1 rounded-full text-lg">
                        MongoDB
                      </span>
                      <span className="bg-gray-200 font-medium dark:bg-gray-700 text-[#364153] dark:text-gray-300 px-3 py-1 rounded-full text-lg">
                        NodeJS
                      </span>
                      <span className="bg-gray-200 font-medium dark:bg-gray-700 text-[#364153] dark:text-gray-300 px-3 py-1 rounded-full text-lg">
                        Generative AI
                      </span>
                    </div>
                  </div>
                </div>
              </MagicContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
