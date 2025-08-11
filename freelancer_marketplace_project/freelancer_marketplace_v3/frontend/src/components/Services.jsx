import React, { useState } from "react";

const servicesData = [
  {
    title: "Logo Design",
    description: "Professional logos for your brand.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "SEO Optimization",
    description: "Boost your website ranking.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: "App Development",
    description: "Mobile & web app solutions.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h.01M17 17h.01" />
      </svg>
    ),
  },
  {
    title: "Content Writing",
    description: "Engaging articles & blogs.",
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
    title: "Social Media Management",
    description: "Grow your audience and engagement.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15h8M8 11h8M8 7h8" />
      </svg>
    ),
  },
  {
    title: "Translation",
    description: "Translate documents to any language.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 5h16M4 19h16M4 5v14M20 5v14" />
        <path d="M9 9h6M9 13h6" />
      </svg>
    ),
  },
  {
    title: "Video Editing",
    description: "Professional video editing services.",
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
    title: "Voice Over",
    description: "High quality voice over for your projects.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
];

const Services = () => {
  const [serviceIdx, setServiceIdx] = useState(0);

  // Responsive visible count based on screen size
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // Mobile: 1 card
      if (window.innerWidth < 768) return 2; // Small tablet: 2 cards
      if (window.innerWidth < 1024) return 3; // Tablet: 3 cards
      return 4; // Desktop: 4 cards
    }
    return 4; // Default fallback
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Update visible count on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      // Reset index if it's out of bounds
      setServiceIdx((prev) =>
        Math.min(prev, servicesData.length - getVisibleCount())
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleServiceScroll = (direction) => {
    if (direction === "left") {
      setServiceIdx((prev) => Math.max(prev - 1, 0));
    } else {
      setServiceIdx((prev) =>
        Math.min(prev + 1, servicesData.length - visibleCount)
      );
    }
  };

  const visibleServices = servicesData.slice(
    serviceIdx,
    serviceIdx + visibleCount
  );

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-white text-2xl md:text-4xl font-medium drop-shadow-lg text-center mb-8 md:mb-12">
        Popular Services
      </h2>

      {/* Mobile: Stack cards vertically */}
      <div className="block sm:hidden w-full px-4">
        <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
          {servicesData.slice(0, 4).map((service, idx) => (
            <div
              key={idx}
              className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4 text-green-500">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Show more button for mobile */}
        {servicesData.length > 4 && (
          <div className="text-center mt-6">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
              View All Services
            </button>
          </div>
        )}
      </div>

      {/* Tablet and Desktop: Horizontal carousel */}
      <div className="hidden sm:block w-full">
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow */}
          <button
            className="absolute left-2 md:left-4 z-20 text-green-500 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleServiceScroll("left")}
            aria-label="Scroll left"
            disabled={serviceIdx === 0}
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

          {/* Service Cards Container */}
          <div className="overflow-hidden px-12 md:px-16">
            <div className="flex gap-4 md:gap-6 transition-transform duration-300">
              {visibleServices.map((service, idx) => (
                <div
                  key={serviceIdx + idx}
                  className="bg-white/90 rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-center flex-shrink-0 w-48 sm:w-52 md:w-64 hover:scale-105 transition-transform duration-300"
                >
                  <div className="mb-3 md:mb-4 text-green-500">
                    {service.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-800 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm md:text-base">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-2 md:right-4 z-20 text-green-500 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleServiceScroll("right")}
            aria-label="Scroll right"
            disabled={serviceIdx >= servicesData.length - visibleCount}
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
            length: Math.ceil(servicesData.length / visibleCount),
          }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setServiceIdx(idx * visibleCount)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(serviceIdx / visibleCount) === idx
                  ? "bg-green-500"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
