import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { WritingText } from "@/components/animate-ui/text/writing";
import Freelancers from "../../components/Freelancers";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyGigs from "../../components/MyGigs";
import OtherFreelancersGigs from "../../components/OtherFreelancersGigs";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const categories = [
  { name: "Web Developer", icon: "💻" },
  { name: "UI/UX Designer", icon: "🎨" },
  { name: "Video Editor", icon: "🎬" },
  { name: "Content Writer", icon: "✍️" },
];

const FreelancerDashboard = () => {
  const navigate = useNavigate(); // Import useNavigate from react-router-dom
  const [user, setuser] = useState(null);
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
      <div className="p-4 sm:p-6">
        {/* Professional Hero Section */}
        <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 min-h-[60vh] sm:min-h-[75vh]">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-green-100 to-transparent rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8 lg:px-16 py-8 sm:py-16 lg:py-20">
            {/* Professional Greeting Section */}
            <div className="text-center mb-8 sm:mb-12 w-full">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-100 rounded-full shadow-sm border border-green-200 mb-4 sm:mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-green-700">
                  Freelancer Dashboard
                </span>
              </div>

              <div className="mb-6 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
                {/* Left side: Greeting and Description */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600 mb-2">
                    Hello, {user?.username || "Freelancer"}
                  </h3>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                      Giglyy
                    </span>
                    <span className="text-green-500">.</span>
                  </h1>
                  <div className="max-w-xl mx-auto lg:mx-0">
                    <WritingText
                      className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-medium"
                      text="As a skilled freelancer, Giglyy helps you connect with clients who value your work. Showcase your gigs, manage your projects, and grow your freelancing career — all in one place."
                      spacing={12}
                    />
                  </div>
                </div>

                {/* Right side: Animation */}
                <div className="flex-shrink-0">
                  <DotLottieReact
                    src="https://lottie.host/1682a25d-5213-4916-9c47-a48f5abd32f3/0Y3zosTgou.lottie"
                    loop
                    autoplay
                    className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-123"
                  />
                </div>
              </div>

              {/* Professional Subtitle */}
              <div className="max-w-2xl mx-auto mt-8 sm:mt-12 lg:mt-20">
                <WritingText
                  className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-medium"
                  text="Showcase your skills, manage your gigs, and grow your freelance business."
                  spacing={12}
                />
              </div>
            </div>

            {/* Professional Category Cards */}
            <div className="w-full max-w-6xl">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-6 sm:mb-8">
                Your Expertise Areas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl sm:text-2xl">{cat.icon}</span>
                      </div>
                      <h5 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {cat.name}
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                        Manage your {cat.name.toLowerCase()} projects
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Gigs Section */}
      <div className="px-4 sm:px-6 py-8 sm:py-12" id="services">
        {/* Your Gigs Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-100 rounded-full shadow-sm border border-blue-200 mb-3 sm:mb-4">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-blue-700">
                Portfolio Management
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Your Active Gigs
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto px-4">
              Manage your services, track performance, and grow your freelance
              business
            </p>
          </div>
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
            <MyGigs />
          </div>
        </div>

        {/* Other Freelancers Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-100 rounded-full shadow-sm border border-green-200 mb-3 sm:mb-4">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-green-700">
                Community Insights
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Trending in Community
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto px-4">
              Discover what other talented freelancers are offering and get
              inspired
            </p>
          </div>
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
            <OtherFreelancersGigs />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FreelancerDashboard;