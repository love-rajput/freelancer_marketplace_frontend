import React, { useEffect, useState } from "react";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
import API from "../utils/api";
import { Button } from "@/components/ui/button";
import GigsDetailModal from "./GigsDetailModal";

const Freelancers = ({ searchQuery }) => {
  const [allgigs, setallgigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [freelancerRatings, setFreelancerRatings] = useState({});

  // get all freelancers ids

  useEffect(() => {
    const fetchAllGigs = async () => {
      try {
        const res = await API.get("/gigs");
        setallgigs(res.data);
        setFilteredGigs(res.data);
      } catch (error) {
        console.log("Error fetching gigs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGigs();
  }, []);

  useEffect(() => {
    const fetchFreelancerRatings = async () => {
      try {
        const freelancerIds = allgigs.map((gig) => gig.freelancerId?._id);
        const uniqueIds = [...new Set(freelancerIds.filter(Boolean))];

        if (uniqueIds.length === 0) return;

        const res = await API.post("/orders/freelancer/rating", {
          ids: uniqueIds,
        });

        setFreelancerRatings(res.data);
      } catch (error) {
        console.log("Error fetching freelancer ratings:", error);
      }
    };

    if (allgigs.length > 0) {
      fetchFreelancerRatings();
    }
  }, [allgigs]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredGigs(allgigs);

      return;
    }

    const lower = searchQuery.toLowerCase();
    const filtered = allgigs.filter(
      (gig) =>
        gig.title?.toLowerCase().includes(lower) ||
        gig.description?.toLowerCase().includes(lower) ||
        gig.category?.toLowerCase().includes(lower)
    );

    setFilteredGigs(filtered);
  }, [searchQuery, allgigs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 px-2">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-96 col-span-4">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg mt-4">Loading your gigs...</p>
        </div>
      ) : filteredGigs.length === 0 ? (
        <div className="flex flex-col rounded-2xl items-center justify-center h-96 col-span-4 bg-white">
          <p className="text-black font-bold text-2xl">
            No gigs found matching "{searchQuery}"
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Try searching for something else.
          </p>
        </div>
      ) : (
        filteredGigs.map((gig) => {
          const freelancerId = gig.freelancerId?._id;
          // Find the rating object by matching freelancerId
          const ratingObj = Object.values(freelancerRatings).find(
            (r) => r.freelancerId === freelancerId
          );

          const avatarUrl =
            gig.freelancerId &&
            typeof gig.freelancerId === "object" &&
            gig.freelancerId.avatar
              ? gig.freelancerId.avatar
              : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740";

          const username =
            gig.userId && typeof gig.userId === "object" && gig.userId.username
              ? gig.userId.username
              : "Unknown User";

          return (
            <MotionHighlight key={gig._id} hover className="rounded-xl">
              <div className="group relative bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 min-h-[320px] max-w-xs mx-auto">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                {/* Gig Thumbnail with Overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      gig.thumbnail ||
                      "https://via.placeholder.com/400x240/f3f4f6/9ca3af?text=No+Image"
                    }
                    alt={gig.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Price Badge */}
                  <div className="absolute top-2 right-2 bg-white text-black px-2 py-0.5 rounded-full text-xs font-bold shadow">
                    ${gig.price}
                  </div>
                  {/* Category Badge */}
                  {gig.category && (
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium shadow">
                      {gig.category}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-3 relative z-20">
                  {/* User Info */}
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={avatarUrl}
                      alt={username}
                      className="w-8 h-8 rounded-full object-cover border shadow"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold text-xs">
                        {username}
                      </p>
                      <p className="text-gray-500 text-[10px]">Freelancer</p>
                    </div>
                    {ratingObj && (
                      <div className="flex items-center gap-1 ml-auto text-2xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-5 text-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {ratingObj.averageRating}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-5 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {ratingObj.totalReviews}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Gig Title */}
                  <h3 className="text-base font-bold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                    {gig.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs line-clamp-2 leading-snug mt-1">
                    {gig.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500">Starting at</p>
                      <p className="text-base font-bold text-black">
                        ${gig.price}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="mt-3 w-full hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      onClick={() => {
                        setSelectedGig(gig);
                        setIsModelOpen(true);
                      }}
                    >
                      View Gig
                    </Button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-green-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </MotionHighlight>
          );
        })
      )}
      <GigsDetailModal
        open={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        gig={selectedGig}
      />
    </div>
  );
};

export default Freelancers;
