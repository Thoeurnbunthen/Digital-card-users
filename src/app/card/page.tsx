"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";


type CardFormData = {
  fullname: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  avatarUrl: string;
};

export default function DigitalCardForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CardFormData>();

  const avatarUrl = watch("avatarUrl");
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  // 🖼️ Handle image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
      setValue("avatarUrl", reader.result as string); // Update form with base64
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: CardFormData) => {
    console.log("Digital Card Data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl text-center font-bold mb-6">
          Create Digital Card
        </h2>

        {/* 👤 Avatar Preview */}
        {(avatarPreview || avatarUrl) && (
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
              {/* Show uploaded image if exists, else show URL */}
              <img
                src={avatarPreview || avatarUrl}
                alt="Avatar Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Upload Avatar File */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:shadow-md"
          />
        </div>

        {/* Form Fields */}
        {[
          { label: "Full Name", name: "fullname", placeholder: "John Doe" },
          {
            label: "Job Title",
            name: "jobTitle",
            placeholder: "Frontend Developer",
          },
          { label: "Company", name: "company", placeholder: "Tech Inc." },
          { label: "Email", name: "email", placeholder: "john@example.com" },
          { label: "Phone", name: "phone", placeholder: "+1234567890" },
          { label: "Address", name: "address", placeholder: "123 Main St" },
          {
            label: "LinkedIn",
            name: "linkedin",
            placeholder: "https://linkedin.com/in/yourprofile",
          },
        ].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              {...register(field.name as keyof CardFormData, {
                required: `${field.label} is required`,
              })}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder={field.placeholder}
            />
            {errors[field.name as keyof CardFormData] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name as keyof CardFormData]?.message}
              </p>
            )}
          </div>
        ))}
       

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Card
        </button>
      </form>
    </div>
  );
}
