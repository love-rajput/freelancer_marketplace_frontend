import React from "react";
import API from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";

const OtherFreelancersGigs = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFreelancers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/gigs/others"); // Assuming this endpoint exists, you can change it as needed
      setFreelancers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);


  return (
    <div className="min-h-2/4">
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg mt-4">Loading freelancers...</p>
          </div>
        ) : freelancers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
            {freelancers.map((freelancers) => {
              // Extract avatar and username from the data structure
              const avatarUrl =
                freelancers?.freelancerId?.avatar ||
                freelancers?.userId?.avatar ||
                freelancers?.avatar ||
                "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg";

              const username =
                freelancers?.freelancerId?.username ||
                freelancers?.userId?.username ||
                freelancers?.username ||
                "Unknown User";

              return (
                <div
                  key={freelancers._id}
                  className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 max-w-sm mx-auto"
                >
                  {/* Modern Tech Header with Gradient Background */}
                  <div className="relative h-48 bg-gradient-to-br overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={freelancers.thumbnail}
                      alt={freelancers.title}
                    />

                    {/* Category and Price Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {freelancers.category || "Web Development"}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r bg-white text-black px-2 py-1 rounded-xl text-sm font-bold shadow-lg">
                        ${freelancers.price || "2000"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative z-20">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={avatarUrl}
                        alt={username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          e.target.src =
                            "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg";
                        }}
                      />
                      <div className="">
                        <p className="text-gray-700 font-medium text-sm">
                          {username}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {freelancers?.userId?.email}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {freelancers.title || "Web Development"}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {freelancers.description ||
                        "A stunning web applications with modern design and functionality"}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No freelancers found
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-md text-center">
              It seems like there are no freelancers available at the moment.
              Please check back later or try refreshing the page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherFreelancersGigs;
