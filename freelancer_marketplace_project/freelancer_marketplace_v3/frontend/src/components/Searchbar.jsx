import React from "react";

const Searchbar = () => {
  return (
    <div className="w-full flex justify-center">
      <label className="flex items-center w-[350px] md:w-[500px] bg-white rounded-lg shadow px-4 py-2 gap-2">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          required
          placeholder="Search"
          className="w-full bg-white outline-none text-gray-700 placeholder-gray-400"
        />
      </label>
    </div>
  );
};

export default Searchbar;
