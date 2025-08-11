import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/validationSchema";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/register", data);
      setTimeout(
        () => navigate("/verify-email", { state: { email: data.email } }),
      ); // Delay for toast visibility
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
    try {
      const res = await API.post("/mail/email", data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Email not sent");
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col justify-center h-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
          Create your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 text-gray-900 placeholder-gray-400 transition ${
                errors.username ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="username"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.username?.message}
            </p>
          </div>
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
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 text-gray-900 placeholder-gray-400 transition ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="new-password"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>
          <div>
            <select
              {...register("role")}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 text-gray-900 transition ${
                errors.role ? "border-red-400" : "border-gray-300"
              }`}
            >
              <option value="">Select Role</option>
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
            <p className="text-red-500 text-xs mt-1">{errors.role?.message}</p>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-md hover:from-green-600 hover:to-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
