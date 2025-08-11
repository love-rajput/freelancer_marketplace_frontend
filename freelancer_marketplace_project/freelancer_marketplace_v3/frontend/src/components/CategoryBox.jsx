import React from "react";

const CategoryBox = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center w-full sm:w-32 md:w-36 lg:w-40 h-24 sm:h-28 md:h-30 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex-shrink-0 p-3 sm:p-4">
    <div className="text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 text-gray-700 flex-shrink-0">
      {React.cloneElement(icon, {
        width:
          typeof window !== "undefined" && window.innerWidth < 640
            ? "24"
            : "36",
        height:
          typeof window !== "undefined" && window.innerWidth < 640
            ? "24"
            : "36",
      })}
    </div>
    <div className="text-xs sm:text-sm font-semibold text-gray-800 text-center leading-tight">
      {label}
    </div>
  </div>
);

export default CategoryBox;
