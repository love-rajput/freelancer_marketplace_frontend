import React, { useState, useEffect } from "react";

import API from "../utils/api";


const MyGigs = () => {
  const [myGigs, setMyGigs] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch my gigs on mount
  const fetchMyGigs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/gigs/my-gigs");
      setMyGigs(res.data);  
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, []);

  return (
    <div className="min-h-2/4">
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg mt-4">Loading your gigs...</p>
          </div>
        ) : myGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
            {myGigs.map((gig) => (
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
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-2xl font-bold text-white mb-2">
              No Gigs Found
            </h3>
            <p className="text-green-400 text-lg mb-6 max-w-md text-center">
              Create your first gig to showcase your services!
            </p>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default MyGigs;
