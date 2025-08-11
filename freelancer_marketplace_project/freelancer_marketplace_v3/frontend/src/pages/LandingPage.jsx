import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Aboutus from "../components/Aboutus";
import Services from "../components/Services.jsx";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import RegLogModel from "../components/RegLogModel";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/"); // Or your login page
      } else if (user.role === "freelancer") {
        navigate("/freelancerdashboard");
      } else if (user.role === "client") {
        navigate("/clientdashboard");
      } else {
        navigate("/"); // fallback
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-[#040109] overflow-x-hidden">
      {/* Navigation - Fixed and responsive */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Registration/Login Modal */}
      <RegLogModel />

      {/* Main Content Container - Responsive */}
      <main className="w-full">
        {/* Hero Section - Full viewport height on larger screens, auto on mobile */}
        <section id="home" className="min-h-screen lg:h-screen relative">
          <Hero />
        </section>

        {/* Services Section - Responsive spacing */}
        <section
          id="services"
          className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <Services />
          </div>
        </section>

        {/* About Us Section - Responsive spacing */}
        <section
          id="aboutus"
          className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <Aboutus />
          </div>
        </section>

        {/* Contact Us Section - Responsive spacing */}
        <section
          id="contactus"
          className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <ContactUs />
          </div>
        </section>
      </main>

      {/* Footer - Full width */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
