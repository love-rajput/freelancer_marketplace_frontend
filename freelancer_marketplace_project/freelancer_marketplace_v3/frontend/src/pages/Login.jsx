import React, { useState, useContext } from "react"; // Add useContext
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validationSchema";
import API from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/authContext"; // Add this import

export default function Login() {
  const { setUser } = useContext(AuthContext); // Add this line
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data); // Add this line to set the user in context
      if (res.data.role === "freelancer") {
        toast.success("Login successful!");
        navigate("/freelancerdashboard");
      } else if (res.data.role === "client") {
        toast.success("Login successful!");
        navigate("/clientdashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col justify-center h-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 text-gray-900 placeholder-gray-400 transition ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="email"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-900 placeholder-gray-400 transition ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="current-password"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-md hover:from-green-600 hover:to-green-700 transition disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
}
