import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import API from "../utils/api";
import GigsForm from "../components/GigsCreationForm"; // Make sure you use the correct path

const GigsCreation = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);


  const fetchAllGigs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/gigs/my-gigs");
      setGigs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGigs();
  }, []);

  return (
    <div className="h-screen">
      <Navbar />

      <div className="p-6">
        <h1 className="text-4xl font-bold text-white text-center">
          Manage Your Gigs
        </h1>

        <div className="relative rounded-2xl w-full bg-white h-screen mt-4 p-4">
          <Button
            className="absolute top-4 right-4 text-white font-semibold"
            onClick={() => setOpen(true)}
          >
            Create New Gig
          </Button>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Loading your gigs...</p>
            </div>
          ) : gigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
              {gigs.map((gig) => {
                const avatarUrl =
                  gig.freelancerId &&
                  typeof gig.freelancerId === "object" &&
                  gig.freelancerId.avatar
                    ? gig.freelancerId.avatar
                    : "/default-avatar.jpg";

                const username =
                  gig.userId &&
                  typeof gig.userId === "object" &&
                  gig.userId.username
                    ? gig.userId.username
                    : "Unknown User";

                return (
                  <div
                    key={gig._id}
                    className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          gig.thumbnail ||
                          "https://via.placeholder.com/400x240?text=No+Image"
                        }
                        alt={gig.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ${gig.price}
                      </div>
                      {gig.category && (
                        <div className="absolute top-4 left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-md">
                          {gig.category}
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 relative z-20">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {gig.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {gig.description}
                      </p>
                      <div className="flex gap-2"></div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 border-2 border-green-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-600 text-2xl font-semibold">
                No Gigs Found
              </p>
              <p className="text-gray-400 text-md mt-2">
                Click on 'Create New Gig' to get started!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <GigsForm
        open={open}
        onOpenChange={setOpen}
        onSaved={() => fetchAllGigs()}
      />
    </div>
  );
};

export default GigsCreation;
