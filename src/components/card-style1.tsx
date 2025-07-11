"use client";

import React from "react";
import { Mail, Phone, Globe, User } from "lucide-react";

interface DigitalCardType {
  name: string;
  title?: string;
  company?: string;
  profilePicture?: string;
  bio?: string;
  email?: string;
  phone?: string;
  website?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface DigitalCardProps {
  card: DigitalCardType;
  isPreview?: boolean;
}
("use client");

import { useState } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function EditableStyledCardPage() {
  const vcfLink = "/mycard.vcf";

  // State for form data and edit mode
  const [formData, setFormData] = useState({
    name: "William David",
    job: "General Manager",
    phone1: "+72 0581-63400",
    phone2: "+92 9292-920283745",
    email: "williamdavid@supershow.com",
    address: "Quincy Street Portland, PA",
    website: "www.supersow.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(formData);

  // Handle input changes while editing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value,
    });
  };

  // Save edited data
  const handleSave = () => {
    setFormData(tempData);
    setIsEditing(false);
  };

  // Cancel editing and discard changes
  const handleCancel = () => {
    setTempData(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#FFB23F] flex items-center justify-center py-10 px-4">
      <div className="w-[360px] rounded-2xl overflow-hidden bg-white shadow-xl">
        {/* Header */}
        <div className="relative h-28 bg-gradient-to-r from-[#1C3FAA] to-[#F25C00] flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="absolute top-2 right-2"
          />
        </div>

        {/* Avatar */}
        <div className="relative -mt-12 flex justify-center">
          <Image
            src="/avatar.jpg"
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="text-center px-6 pt-4 pb-6">
          {isEditing ? (
            <>
              <input
                name="name"
                value={tempData.name}
                onChange={handleChange}
                className="w-full border-b border-gray-300 text-xl font-bold text-[#1C3FAA] text-center mb-1 focus:outline-none"
                placeholder="Name"
              />
              <input
                name="job"
                value={tempData.job}
                onChange={handleChange}
                className="w-full border-b border-orange-300 text-orange-600 font-medium text-center mb-3 focus:outline-none"
                placeholder="Job Title"
              />
              <div className="flex justify-center space-x-3 mb-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-1 rounded-full bg-[#1C3FAA] text-white font-semibold hover:bg-[#164787] transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1 rounded-full border border-gray-400 font-semibold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-[#1C3FAA]">
                {formData.name}
              </h2>
              <p className="text-orange-600 font-medium">{formData.job}</p>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-3 px-4 py-1 rounded-full border border-[#1C3FAA] text-[#1C3FAA] text-sm font-semibold hover:bg-[#1C3FAA] hover:text-white transition"
              >
                Edit
              </button>
            </>
          )}

          {/* Contact info */}
          <div className="mt-4 space-y-2 text-sm text-gray-700 text-left">
            {isEditing ? (
              <>
                <input
                  name="phone1"
                  value={tempData.phone1}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Phone 1"
                />
                <input
                  name="phone2"
                  value={tempData.phone2}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Phone 2"
                />
                <input
                  name="email"
                  value={tempData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Email"
                />
                <input
                  name="address"
                  value={tempData.address}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Address"
                />
                <input
                  name="website"
                  value={tempData.website}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Website"
                />
              </>
            ) : (
              <>
                <p>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-orange-500 mr-2"
                  />
                  {formData.phone1}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-orange-500 mr-2"
                  />
                  {formData.phone2}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-orange-500 mr-2"
                  />
                  {formData.email}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-orange-500 mr-2"
                  />
                  {formData.address}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="text-orange-500 mr-2"
                  />
                  {formData.website}
                </p>
              </>
            )}
          </div>

          {/* QR Code */}
          <div className="mt-6 text-center">
            <p className="text-[#F25C00] font-semibold">
              Take A Look At My Portfolio:
            </p>
            <div className="mt-2 bg-white p-2 rounded shadow inline-block">
              <p className="text-sm font-medium mb-1 text-[#1C3FAA]">SCAN ME</p>
              <QRCode value={`https://yourdomain.com${vcfLink}`} size={128} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DigitalCard = ({ card, isPreview = false }: DigitalCardProps) => {
  return (
    <div
      className={`
        relative w-full max-w-sm mx-auto rounded-2xl p-6 text-white shadow-2xl transform transition-all duration-300
        ${isPreview ? "hover:scale-105 cursor-pointer" : ""}
      `}
      style={{
        background: card.backgroundColor,
        color: card.textColor,
      }}
    >
      {/* Profile Section */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
          {card.profilePicture ? (
            <Image
              src={card.profilePicture}
              alt={card.name}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <User size={32} className="text-white/80" />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-1">{card.name}</h2>
        <p className="text-lg opacity-90 mb-1">{card.title}</p>
        <p className="text-base opacity-80">{card.company}</p>
      </div>

      {/* Bio Section */}
      {card.bio && (
        <div className="mb-6">
          <p className="text-sm opacity-90 text-center leading-relaxed">
            {card.bio}
          </p>
        </div>
      )}

      {/* Contact Information */}
      <div className="space-y-3">
        {card.email && (
          <div className="flex items-center space-x-3">
            <Mail size={16} className="opacity-80" />
            <span className="text-sm break-all">{card.email}</span>
          </div>
        )}

        {card.phone && (
          <div className="flex items-center space-x-3">
            <Phone size={16} className="opacity-80" />
            <span className="text-sm">{card.phone}</span>
          </div>
        )}

        {card.website && (
          <div className="flex items-center space-x-3">
            <Globe size={16} className="opacity-80" />
            <a
              href={card.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline break-all"
            >
              {card.website}
            </a>
          </div>
        )}
      </div>

      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
    </div>
  );
};

export default DigitalCard;
