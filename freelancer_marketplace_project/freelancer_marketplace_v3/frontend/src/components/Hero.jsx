import React, { useState } from "react";
import CategoryBox from "./CategoryBox";

const categories = [
  {
    label: "Programming & Tech",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
  {
    label: "Graphics & Design",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: "Digital Marketing",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M16 3v4M8 3v4M12 12v2" />
      </svg>
    ),
  },
  {
    label: "Writing & Translation",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 19h16M4 5h16M4 5v14M20 5v14" />
        <path d="M9 9h6M9 13h6" />
      </svg>
    ),
  },
  {
    label: "Video & Animation",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polygon points="10,9 16,12 10,15" />
      </svg>
    ),
  },
  {
    label: "AI Services",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M8 8h8v8H8z" />
      </svg>
    ),
  },
  {
    label: "Music & Audio",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9 17V5l12-2v12" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    label: "Business",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
      </svg>
    ),
  },
];

const Hero = () => {
  const [startIdx, setStartIdx] = useState(0);

  // Responsive visible count based on screen size
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // Mobile: 1 category
      if (window.innerWidth < 768) return 2; // Small tablet: 2 categories
      if (window.innerWidth < 1024) return 3; // Tablet: 3 categories
      return 4; // Desktop: 4 categories
    }
    return 4; // Default fallback
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Update visible count on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      // Reset index if it's out of bounds
      setStartIdx((prev) =>
        Math.min(prev, categories.length - getVisibleCount())
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (direction) => {
    if (direction === "left") {
      setStartIdx((prev) => Math.max(prev - 1, 0));
    } else {
      setStartIdx((prev) =>
        Math.min(prev + 1, categories.length - visibleCount)
      );
    }
  };

  const visibleCategories = categories.slice(startIdx, startIdx + visibleCount);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        src="Hero_Background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
      ></video>

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Hero Text Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-lg mb-6 sm:mb-8 leading-tight">
            Your vision, our freelancers
            <span className="text-green-500">.</span>
          </h1>

          {/* Professional Content Section */}
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-md leading-relaxed px-2">
              Connect with world-class freelancers who transform ideas into
              reality. From cutting-edge web development to stunning visual
              designs,
              <span className="text-green-400 font-semibold">
                {" "}
                our platform bridges the gap
              </span>{" "}
              between ambitious projects and exceptional talent.
            </p>
           
          </div>
        </div>
        {/* Categories Section - Responsive */}
        <div className="w-full max-w-7xl mx-auto">
          {/* Mobile: Stack categories vertically */}
          <div className="block sm:hidden px-4">
            <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
              {categories.slice(0, 4).map((cat, idx) => (
                <CategoryBox key={idx} icon={cat.icon} label={cat.label} />
              ))}
            </div>

            {/* Show more button for mobile */}
            {categories.length > 4 && (
              <div className="text-center mt-6">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors text-sm">
                  View All Categories
                </button>
              </div>
            )}
          </div>

          {/* Tablet and Desktop: Horizontal carousel */}
          <div className="hidden sm:block">
            <div className="relative w-full flex items-center justify-center">
              {/* Left Arrow */}
              <button
                className="absolute left-2 md:left-4 z-20 text-green-500 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                disabled={startIdx === 0}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Categories Container */}
              <div className="overflow-hidden px-12 md:px-16">
                <div className="flex gap-3 sm:gap-4 md:gap-6 transition-transform duration-300">
                  {visibleCategories.map((cat, idx) => (
                    <CategoryBox
                      key={idx + startIdx}
                      icon={cat.icon}
                      label={cat.label}
                    />
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                className="absolute right-2 md:right-4 z-20 text-green-500 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                disabled={startIdx >= categories.length - visibleCount}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({
                length: Math.ceil(categories.length / visibleCount),
              }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStartIdx(idx * visibleCount)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(startIdx / visibleCount) === idx
                      ? "bg-green-500"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
