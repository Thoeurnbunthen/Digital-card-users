"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <img
              className="mx-auto h-10 w-auto"
              src="https://www.svgrepo.com/show/301692/login.svg"
              alt="Register"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create a new account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring focus:border-blue-300"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="flex rounded-md shadow-sm text-black">
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="flex-1 block w-full rounded-none rounded-r-md border px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="john"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring focus:border-blue-300"
                placeholder="user@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-colors duration-200"
              >
                Create account
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
