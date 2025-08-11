import React, { useState } from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";

const RegLogModel = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <dialog id="my_modal_5" className="modal">
      <div className="modal-box w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 max-w-6xl p-0 overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl relative">
        {/* X Close Button - Responsive */}
        <button
          type="button"
          className="absolute right-4 top-4 sm:right-6 sm:top-6 text-xl sm:text-2xl text-gray-500 hover:text-green-500 z-30 bg-white/80 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Close"
          onClick={() => document.getElementById("my_modal_5").close()}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Mobile Layout (< 768px) */}
        <div className="block md:hidden">
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
            <img
              src="/login_reg_background.jpg"
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 text-white px-6 py-8 text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Success starts here
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  50+ categories
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Quality work
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Global talent
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Form */}
          <div className="bg-white px-6 py-8">
            <div className="w-full max-w-sm mx-auto">
              {showLogin ? (
                <>
                  <Login />
                  <p className="text-center text-xs sm:text-sm mt-6 text-gray-700">
                    Don't have an account?{" "}
                    <button
                      className="text-green-600 hover:text-green-700 font-medium transition-colors"
                      onClick={() => setShowLogin(false)}
                    >
                      Create new account
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Register />
                  <p className="text-center text-xs sm:text-sm mt-6 text-gray-700">
                    Already have an account?{" "}
                    <button
                      className="text-green-600 hover:text-green-700 font-medium transition-colors"
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout (≥ 768px) */}
        <div className="hidden md:flex">
          {/* Left Side - Features */}
          <div className="w-1/2 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative flex flex-col justify-center items-start px-8 lg:px-12 py-12">
            <img
              src="/login_reg_background.jpg"
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
              style={{ zIndex: 1 }}
            />
            <div className="relative z-10 text-white">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6 lg:mb-8 leading-tight">
                Success starts here
              </h1>
              <ul className="space-y-4 lg:space-y-6 text-base lg:text-lg font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 lg:w-7 lg:h-7 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 lg:w-4 lg:h-4 text-green-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Over 50+ categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 lg:w-7 lg:h-7 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 lg:w-4 lg:h-4 text-green-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Quality work done faster</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 lg:w-7 lg:h-7 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 lg:w-4 lg:h-4 text-green-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Access to talent and businesses across the globe</span>
                </li>
              </ul>

              {/* Additional Features for Desktop */}
              <div className="mt-8 lg:mt-12 p-4 lg:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <h3 className="text-lg lg:text-xl font-bold mb-3">
                  Why choose Gigly?
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm lg:text-base">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-green-300">
                      50K+
                    </div>
                    <div className="text-xs lg:text-sm opacity-90">
                      Active Users
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-green-300">
                      98%
                    </div>
                    <div className="text-xs lg:text-sm opacity-90">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 flex items-center justify-center bg-white py-8 lg:py-12 px-6 lg:px-8">
            <div className="w-full max-w-md lg:max-w-lg">
              {showLogin ? (
                <>
                  <Login />
                  <p className="text-center text-sm lg:text-base mt-6 text-gray-700">
                    Don't have an account?{" "}
                    <button
                      className="text-green-600 hover:text-green-700 font-medium transition-colors hover:underline"
                      onClick={() => setShowLogin(false)}
                    >
                      Create new account
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Register />
                  <p className="text-center text-sm lg:text-base mt-6 text-gray-700">
                    Already have an account?{" "}
                    <button
                      className="text-green-600 hover:text-green-700 font-medium transition-colors hover:underline"
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default RegLogModel;
