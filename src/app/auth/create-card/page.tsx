"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateProfileCard = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate saving data (e.g., to database)
    setTimeout(() => {
      alert("Card created successfully!");
      router.push("/card/demo"); // Navigate to demo page
      setIsSubmitting(false);
    }, 2000);
  };

  const isValid = formData.fullName && formData.company && formData.email;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Create Your Digital Profile Card
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm">Full Name *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Job Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Company *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Email *</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Phone Number</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Address</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm">
              LinkedIn Profile
            </label>
            <input
              type="url"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
          >
            {isSubmitting ? "Creating Card..." : "Create Card"}
          </button>

          {!isValid && (
            <p className="text-sm text-center text-gray-500 mt-2">
              * Please fill in all required fields
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProfileCard;
