import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import API from "../utils/api";

// A dedicated component for a single star to add more style and effects.
const Star = ({ filled, size = 24 }) => {
  return (
    <FaStar
      size={size}
      className={`
        ${filled ? "text-yellow-400" : "text-gray-300"}
        transition-colors duration-300 drop-shadow-[0_2px_1px_rgba(0,0,0,0.2)]
      `}
    />
  );
};

const ReviewModal = ({ open, onClose, orderId }) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open || !orderId) return;

    // Reset state when opening
    setLoading(true);
    setReview(null);

    const fetchReview = async () => {
      try {
        const response = await API.get(`orders/${orderId}/single-order`);
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [open, orderId]);

  // Safely access nested data using optional chaining
  const username = review?.userId?.username;
  const userAvatar = review?.userId?.avatar; // Assuming avatar is on userId
  const clientRating = review?.clientRating;
  const clientFeedback = review?.clientFeedback;
  const projectTitle = review?.gigId?.title;
  const projectThumbnail = review?.gigId?.thumbnail;

  if (!open) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Body */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative transform transition-all duration-300 ease-in-out scale-95 animate-fade-in-scale">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:scale-125 transition-transform duration-200"
          onClick={onClose}
          aria-label="Close review"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          // Loading Spinner
          <div className="flex flex-col justify-center items-center h-48">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
             <p className="mt-4 text-gray-600">Fetching Review...</p>
          </div>
        ) : review && clientRating ? (
          // Review Content
          <>
            <div className="flex flex-col items-center gap-2 mb-6">
              <img
                src={userAvatar || `https://ui-avatars.com/api/?name=${username || 'A'}&background=random&size=128`}
                alt="Client"
                className="w-24 h-24 object-cover rounded-full shadow-lg border-4 border-white"
              />
              <h2 className="text-2xl font-bold mt-3 text-gray-800">
                {username || "Anonymous Client"}
              </h2>
              
              {/* Star Rating Display */}
              <div className="flex items-center mt-2 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} filled={i < clientRating} />
                ))}
                <span className="ml-3 text-xl font-bold text-gray-700">
                  {clientRating.toFixed(1)}
                  <span className="text-sm font-normal text-gray-500">/5</span>
                </span>
              </div>
            </div>

            {/* Project Info */}
            {projectTitle && (
              <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-lg">
                <img
                  src={projectThumbnail || "https://placehold.co/100x100/eee/ccc?text=Gig"}
                  alt={projectTitle}
                  className="w-12 h-12 object-cover rounded-md shadow-sm"
                />
                <span className="font-semibold text-gray-700">{projectTitle}</span>
              </div>
            )}
            
            {/* Feedback Text */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 text-gray-700 text-center relative">
               <div className="absolute top-2 left-3 text-5xl text-gray-200 font-serif opacity-80">“</div>
               <p className="italic text-lg z-10 relative">
                 {clientFeedback}
               </p>
               <div className="absolute bottom-2 right-3 text-5xl text-gray-200 font-serif opacity-80">”</div>
            </div>
          </>
        ) : (
          // No Review Message
          <div className="text-center text-gray-500 py-12">
            <h2 className="text-xl font-semibold mb-2">No Review Yet</h2>
            <p>A review has not been submitted for this order.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;

// Add this to your main CSS file (e.g., index.css) for the animation
/*

*/
