"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <img
              className="mx-auto h-10 w-auto"
              src="https://www.svgrepo.com/show/301692/login.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create a new account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-black"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="flex rounded-md shadow-sm text-black">
                <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-sm text-gray-500">
                  iworkedon.com/
                </span>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="flex-1 block w-full rounded-none rounded-r-md border px-3 py-2"
                  placeholder="john"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-black"
                placeholder="user@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

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
                className="mt-1 block w-full border rounded-md px-3 py-2 text-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

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
                className="mt-1 block w-full border rounded-md px-3 py-2 text-black"
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md"
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
