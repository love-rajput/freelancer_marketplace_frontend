import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-hot-toast";

// Helper component for star input (reusable for review form)
const StarInput = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <svg
          key={starValue}
          onClick={() => onChange(starValue)}
          className={`w-6 h-6 cursor-pointer transition-colors duration-200
            ${starValue <= value ? "text-yellow-400" : "text-gray-300"}
            hover:text-yellow-500`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.212a.75.75 0 011.424 0l4.272 8.283a.75.75 0 01-.596 1.077l-4.702.68a.75.75 0 00-.547.39l-2.067 4.192a.75.75 0 01-1.342-.66L8.85 11.66l-4.702-.68a.75.75 0 01-.596-1.077l4.272-8.283z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

const GigsDetailModal = ({ open, onClose, gig }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isHiring, setIsHiring] = useState(false); // Added loading state

  const [clientRating, setClientRating] = useState(0);
  const [clientFeedback, setClientFeedback] = useState("");

  // Function to fetch reviews
  const fetchReviews = async () => {
    if (!gig?._id) return;
    try {
      const res = await API.get(`/orders/gig/${gig._id}/reviews`);
      setReviews(res.data.reviews || []);
      setAverageRating(res.data.averageRating || null);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
      setAverageRating(null);
      toast.error("Failed to load reviews.");
    }
  };

  // Chat Open Function
  const handleChatOpen = () => {
    console.log("Chat button clicked"); // Debug log

    if (window.startGlobalChat && gig?.userId?._id) {
      const freelancerId = gig.userId._id;
      const freelancerUsername =
        gig.freelancerId?.username ||
        gig.userId?.username ||
        "Unknown Freelancer";
      const freelancerAvatar =
        gig.freelancerId?.avatar ||
        "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740";

      console.log("Starting chat with:", {
        freelancerId,
        freelancerUsername,
        freelancerAvatar,
      });

      window.startGlobalChat(
        freelancerId,
        freelancerUsername,
        freelancerAvatar
      );
    } else {
      console.error("Chat function not available or missing gig data");
      toast.error("Failed to start chat.");
    }
  };

  // Fixed Hire Now Function
  const handleHireNow = async (e) => {
    // Prevent any default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("🔥 STEP 1: Hire Now button clicked!");
    console.log("🔥 STEP 2: Gig data:", gig);

    // Validate gig data first
    if (!gig) {
      console.error("❌ STEP 3a: Gig is null/undefined:", gig);
      toast.error("Invalid gig data. Please try again.");
      return;
    }

    console.log("✅ STEP 3b: Gig exists, checking _id...");

    if (!gig._id) {
      console.error("❌ STEP 3c: Gig._id is missing:", gig._id);
      toast.error("Invalid gig data. Please try again.");
      return;
    }

    console.log("✅ STEP 3d: Gig._id exists:", gig._id);

    setIsHiring(true); // Set loading state
    console.log("🔥 STEP 4: Set isHiring to true");

    try {
      // Get user data from localStorage
      const userString = localStorage.getItem("user");
      console.log("🔥 STEP 5: User string from localStorage:", userString);

      if (!userString) {
        console.log("❌ STEP 5a: No user string found");
        toast.error("Please log in to hire a freelancer.");
        setIsHiring(false);
        return;
      }

      console.log("✅ STEP 5b: User string found, parsing...");

      const user = JSON.parse(userString);
      console.log("🔥 STEP 6: Parsed user data:", user);

      if (!user) {
        console.log("❌ STEP 6a: User is null after parsing");
        toast.error("Invalid user data. Please log in again.");
        setIsHiring(false);
        return;
      }

      console.log("✅ STEP 6b: User exists, checking user.id...");

      if (!user.id) {
        console.log("❌ STEP 6c: User.id is missing:", user.id);
        toast.error("Invalid user data. Please log in again.");
        setIsHiring(false);
        return;
      }

      console.log("✅ STEP 6d: User.id exists:", user.id);

      // Validate required gig fields
      console.log("🔥 STEP 7: Checking gig.price:", gig.price);
      if (!gig.price) {
        console.log("❌ STEP 7a: Gig.price is missing");
        toast.error("Gig price is missing. Please contact support.");
        setIsHiring(false);
        return;
      }

      console.log("✅ STEP 7b: Gig.price exists:", gig.price);

      // Get freelancer data safely
      console.log("🔥 STEP 8: Getting freelancer data...");
      console.log("   gig.freelancerId:", gig.freelancerId);
      console.log("   gig.userId:", gig.userId);

      const freelancerId = gig.freelancerId?._id || gig.userId?.id;
      console.log("🔥 STEP 8a: Extracted freelancerId:", freelancerId);

      const freelancerName =
        gig.freelancerId?.username ||
        gig.userId?.username ||
        "Unknown Freelancer";
      console.log("🔥 STEP 8b: Extracted freelancerName:", freelancerName);

      if (!freelancerId) {
        console.log("❌ STEP 8c: FreelancerId is missing");
        toast.error("Freelancer information is missing.");
        setIsHiring(false);
        return;
      }

      console.log("✅ STEP 8d: FreelancerId exists:", freelancerId);

      console.log(
        "🎉 STEP 9: All validations passed! Processing hire request:",
        {
          gigId: gig._id,
          userId: user.id,
          freelancerId: freelancerId,
          price: gig.price,
          gigTitle: gig.title,
          freelancerName: freelancerName,
        }
      );

      // Store data in localStorage for checkout process
      localStorage.setItem("gigId", gig._id);
      localStorage.setItem("freelancerId", freelancerId);
      localStorage.setItem("price", gig.price.toString());
      localStorage.setItem("gigTitle", gig.title);
      localStorage.setItem("freelancerName", freelancerName);

      // Create checkout session
      console.log("Creating checkout session...");
      const checkoutData = {
        gig: {
          _id: gig._id,
          title: gig.title,
          price: gig.price,
          thumbnail: gig.thumbnail,
          freelancerId: freelancerId,
        },
        userId: user.id,
        price: parseFloat(gig.price), // Ensure price is a number
        gigImg:
          gig.thumbnail || "https://via.placeholder.com/400x240?text=No+Image",
      };

      console.log("Checkout data being sent:", checkoutData);

      const res = await API.post(
        "/checkout/create-checkout-session",
        checkoutData
      );

      console.log("Checkout session created:", res.data);

      if (res.data && res.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = res.data.url;
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (error) {
      console.error("Error in handleHireNow:", error);
      console.error("Error response data:", error.response?.data); // Add this line
      console.error("Error response status:", error.response?.status); // Add this line
      console.error("Error response headers:", error.response?.headers); // Add this line

      // Better error handling
      if (error.response?.status === 401) {
        toast.error("Please log in to hire a freelancer.");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to hire freelancers.");
      } else if (error.response?.data?.message) {
        toast.error(`Server Error: ${error.response.data.message}`);
      } else if (error.response?.status === 400) {
        toast.error("Bad Request: Please check your data and try again.");
      } else {
        toast.error("Failed to create checkout session. Please try again.");
      }
    } finally {
      setIsHiring(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchReviews();
    // Reset review form states when gig changes or modal opens/closes
    setShowReviewForm(false);
    setClientRating(0);
    setClientFeedback("");
  }, [gig, open]);

  if (!gig) {
    return null;
  }

  const avatarUrl =
    gig?.freelancerId?.avatar ||
    "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740";

  const username =
    gig?.freelancerId?.username ||
    gig?.userId?.username ||
    "Unknown Freelancer";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{gig.title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Details about the gig and reviews from clients.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Image */}
          <div className="flex-1">
            <img
              src={
                gig.thumbnail ||
                "https://via.placeholder.com/400x240?text=No+Image"
              }
              alt={gig.title}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
          </div>

          {/* Right Side - Details */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl}
                alt={username}
                className="w-12 h-12 rounded-full object-cover border shadow"
              />
              <div>
                <p className="font-semibold text-lg">{username}</p>
                <p className="text-gray-500 text-sm">Freelancer</p>
              </div>
            </div>

            <p className="text-gray-700">{gig.description}</p>

            <div className="flex gap-3 items-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {gig.category || "Uncategorized"}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                ${gig.price}
              </span>
            </div>

            {/* Rating and total reviews */}
            <div className="flex items-center gap-2 mt-2">
              <StarInput
                value={Math.round(averageRating || 0)}
                onChange={() => {}}
              />
              <span className="ml-2 text-sm text-gray-700 font-semibold">
                {averageRating ? averageRating.toFixed(1) : "No rating"}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                ({reviews.length} reviews)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <Button
                onClick={handleHireNow}
                disabled={isHiring}
                className={`flex-1 text-white font-semibold ${
                  isHiring
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                type="button" // Explicitly set type
              >
                {isHiring ? "Processing..." : "Hire Now"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                onClick={handleChatOpen}
                type="button" // Explicitly set type
              >
                Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={
                        review.userId?.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          review.userId?.username || "Client"
                        )}&background=random`
                      }
                      alt={review.userId?.username || "Client"}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <span className="font-semibold text-gray-800 text-sm">
                      {review.userId?.username || "Client"}
                    </span>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          fill={i < review.clientRating ? "#facc15" : "#e5e7eb"}
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-gray-600">
                        {review.clientRating}/5
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-700 italic text-sm">
                    "{review.clientFeedback}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GigsDetailModal;
