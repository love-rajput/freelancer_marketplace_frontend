import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Lock } from "lucide-react";
import API from "../utils/api";
// Import toast if you're using react-toastify
// import { toast } from "react-toastify";

const EmailVerification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(Number(value)) || value === " ") {
      return;
    }
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Fixed: should be index < 5 for 6-digit code (indices 0-5)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;
    const newCode = [...code];
    for (let i = 0; i < pasteData.length; i++) {
      newCode[i] = pasteData[i];
    }
    setCode(newCode);
    inputRefs.current[Math.min(pasteData.length - 1, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const otp = code.join("");

      // Check if OTP is complete
      if (otp.length !== 6) {
        setMessage("Please enter all 6 digits");
        setIsLoading(false);
        return;
      }

      // Use the correct endpoint that matches your backend route
      const response = await API.post("/auth/verify-email", {
        email,
        otp,
      });

      const { token, user } = response.data;

      if (token && user) {
        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setMessage("Email verified successfully! Redirecting...");

        // Navigate based on user role
        setTimeout(() => {
          if (user.role === "client") {
            navigate("/clientDashboard");
          } else if (user.role === "freelancer") {
            navigate("/freelancerDashboard");
          } else {
            navigate("/"); // default fallback
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Verification error:", error);
      const errorMessage =
        error.response?.data?.message || "Verification failed";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setMessage(""); // Clear previous messages

      // Use the correct endpoint that matches your backend route
      await API.post("/auth/resend-otp", { email });
      setMessage("A new OTP has been sent to your email.");

      // Clear the current code
      setCode(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Resend OTP error:", error);
      setMessage(error.response?.data?.message || "Failed to resend OTP.");
    }
  };

  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1E1B22]">
        <div className="text-white text-center">
          <h2 className="text-xl font-bold mb-4">Invalid Access</h2>
          <p className="mb-4">Please sign up first.</p>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
          >
            Go to Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center font-sans min-h-screen bg-[#1E1B22] text-white p-4">
      <div className="bg-[#161B22] border border-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative">
        <div className="flex justify-center mb-6 mt-8">
          <div className="relative w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Email Verification</h1>
        <p className="text-gray-400 text-sm mb-2">
          We've sent a 6-digit OTP to{" "}
          <span className="text-white font-semibold">{email}</span>
        </p>
        <p className="text-gray-500 text-sm mb-4 text-left font-medium">
          Enter the code you received:
        </p>

        <form onSubmit={handleSubmit}>
          <div
            className="flex justify-center gap-2 sm:gap-3 mb-4"
            onPaste={handlePaste}
          >
            {code.map((digit, index) => (
              <input
                key={index}
                type="tel"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                placeholder="•"
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(-1)}
                disabled={isLoading}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold bg-[#0D1117] text-white rounded-lg outline-none transition-all
                  ${
                    focusedIndex === index
                      ? "border-2 border-green-500"
                      : "border border-dashed border-gray-700 hover:border-gray-500"
                  }
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || code.join("").length !== 6}
            className={`w-full py-2 px-4 font-semibold rounded-md transition
              ${
                isLoading || code.join("").length !== 6
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Didn't receive a code?{" "}
          <button
            onClick={handleResendOtp}
            disabled={isLoading}
            className="text-green-500 hover:underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend
          </button>
        </p>

        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("successfully") || message.includes("sent")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
