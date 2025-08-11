import { useRef } from "react";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import API from "../utils/api";
// import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import FreelancerForm from "../components/FreelancerForm";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [freelancerDetails, setFreelancerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser); // Parse the stored user object
    if (storedUser) {
      setUser(parsedUser);
    }
    if (parsedUser.role === "freelancer") {
      fetchFreelancerDetails(); // Fetch freelancer details for freelancers only
    }
  }, []);

  const fetchFreelancerDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/freelancers");
      setFreelancerDetails(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Profile not found — user hasn't created it yet
        setFreelancerDetails(null);
        setError(null);
      } else {
        console.error(err);
        setError("Failed to fetch freelancer details");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploadingImage(true);
      await API.post("/freelancers/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      // Refresh freelancer details to get new avatar
      fetchFreelancerDetails();
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Please create your profile first.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 md:p-8 w-full flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Left Side */}
        <div className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center gap-6">
          <img
            src={
              freelancerDetails?.avatar ||
              "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"
            }
            alt="Profile"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-green-500 shadow-md"
          />
          <label className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              disabled={uploadingImage}
              className="w-full text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              onClick={handleButtonClick}
            >
              {uploadingImage ? "Uploading..." : "Upload New Image"}
            </Button>
          </label>

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl md:text-2xl font-bold">{user?.username}</h1>
            <p className="text-sm md:text-base text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
              Profile Details
            </h2>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Edit Profile
            </Button>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-24" />
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {user?.role === "freelancer" ? (
            freelancerDetails ? (
              <div className="space-y-4">
                {/* Bio Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Bio
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {freelancerDetails.description || "No bio available"}
                  </p>
                </div>

                {/* Skills Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Skills
                  </h3>
                  {freelancerDetails.skills &&
                  freelancerDetails.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {freelancerDetails.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm md:text-base text-gray-500">
                      No skills added
                    </p>
                  )}
                </div>

                {/* Language, Experience, and Category Sections */}
                {["Languages", "Experience", "Category"].map((section) => (
                  <div key={section} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {section}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700">
                      {freelancerDetails[section.toLowerCase()] ||
                        `No ${section.toLowerCase()} specified`}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              !loading &&
              !error && (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">
                    No freelancer data found
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Create your freelancer profile to see your details here
                  </p>
                </div>
              )
            )
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Client Profile</p>
              <p className="text-gray-400 text-sm mt-2">
                Additional profile features coming soon for clients
              </p>
            </div>
          )}
        </div>
      </div>
      <FreelancerForm
        open={isEditing}
        onOpenChange={setIsEditing}
        freelancer={freelancerDetails}
        onSave={() => fetchFreelancerDetails()}
      />
    </div>
  );
};

export default UserProfile;
