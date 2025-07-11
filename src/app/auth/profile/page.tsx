"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject("Error reading file");
    };
    reader.onerror = (error) => reject(error);
  });
}

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("DyDy");
  const [title, setTitle] = useState("I nedd money");
  const [photo, setPhoto] = useState(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  );
  const [cover, setCover] = useState(
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  );

  const fileInputPhotoRef = useRef<HTMLInputElement>(null);
  const fileInputCoverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("profile_name");
    const savedTitle = localStorage.getItem("profile_title");
    const savedPhoto = localStorage.getItem("profile_photo");
    const savedCover = localStorage.getItem("profile_cover");

    if (savedName) setName(savedName);
    if (savedTitle) setTitle(savedTitle);
    if (savedPhoto) setPhoto(savedPhoto);
    if (savedCover) setCover(savedCover);
  }, []);

  const handleSave = () => {
    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_title", title);
    localStorage.setItem("profile_photo", photo);
    localStorage.setItem("profile_cover", cover);

    alert("✅ Profile saved successfully!");
    setEditing(false);
  };

  const handleCancel = () => {
    // Reload saved data to reset any changes made before save
    const savedName = localStorage.getItem("profile_name");
    const savedTitle = localStorage.getItem("profile_title");
    const savedPhoto = localStorage.getItem("profile_photo");
    const savedCover = localStorage.getItem("profile_cover");

    if (savedName) setName(savedName);
    if (savedTitle) setTitle(savedTitle);
    if (savedPhoto) setPhoto(savedPhoto);
    if (savedCover) setCover(savedCover);

    setEditing(false);
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      setPhoto(base64);
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      setCover(base64);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-amber-50 rounded-lg shadow-lg overflow-hidden text-gray-600">
        {/* Cover Image */}
        <div className="rounded-t-lg h-50 overflow-hidden">
          <img className="object-cover w-full h-full" src={cover} alt="Cover" />
        </div>
        {editing && (
          <div className="text-center mt-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInputCoverRef}
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>
        )}

        {/* Profile Photo */}
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img className="object-cover h-32 w-32" src={photo} alt="Profile" />
        </div>
        {editing && (
          <div className="text-center mt-1 justify-center flex gap-4">
            <input
              type="file"
              accept="image/*"
              ref={fileInputPhotoRef}
              className="hidden"
              onChange={handlePhotoChange}
            />
            <button
              type="button"
              onClick={() => fileInputPhotoRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm font-semibold mt-2"
            >
              Change Photo
            </button>
            <button
              type="button"
              onClick={() => fileInputCoverRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm font-semibold mt-2"
            >
              Change Cover
            </button>
          </div>
        )}

        {/* Name and Title */}
        <div className="text-center mt-3 px-6">
          {editing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-2 px-3 py-2 border rounded-3xl text-center font-semibold text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-3xl text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          ) : (
            <>
              <h2 className="font-semibold text-xl">{name}</h2>
              <p className="text-gray-500">{title}</p>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="p-6 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-4 w-full">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition flex-1"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-full transition flex-1"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 w-full hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Link Buttons */}
          {!editing && (
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/edit-card"
                className="bg-blue-600 text-center hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
              >
                Edit Card
              </Link>
              <Link
                href="/create-card"
                className="bg-blue-600 text-center hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
              >
                Create Card
              </Link>
              <Link
                href="/view-card"
                className="bg-blue-600 text-center hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
              >
                View Card
              </Link>
              <Link
                href="/style-card"
                className="bg-blue-600 text-center hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
              >
                Style Card
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
