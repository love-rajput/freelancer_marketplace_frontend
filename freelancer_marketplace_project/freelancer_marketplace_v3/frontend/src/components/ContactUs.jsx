import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-gradient-to-b from-green-100 via-white to-white">
      {/* Main Container - Responsive */}
      <div className="relative w-full flex flex-col items-center overflow-hidden min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section - Responsive */}
        <div className="w-full max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-green-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-4 sm:mb-6">
            Contact <span className="text-green-500">Us</span>
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto px-4 drop-shadow">
            Have questions or want to work with us? Fill out the form below and
            our team will get back to you soon.
          </p>
        </div>

        {/* Content Section - Responsive Layout */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Contact Form */}
            <div className="w-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-6 sm:p-8 md:p-10 hover:shadow-2xl transition-all duration-300">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-green-600 text-xl sm:text-2xl font-bold mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Thank you for reaching out! We will get back to you within
                      24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 sm:mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Get In Touch
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base">
                        We'd love to hear from you. Send us a message and we'll
                        respond as soon as possible.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full border border-green-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full border border-green-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          placeholder="Tell us about your project or ask any questions..."
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full border border-green-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none transition-all duration-300 text-sm sm:text-base"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg py-3 sm:py-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="w-full space-y-6 sm:space-y-8">
              {/* Contact Info Cards */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                        Email
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        contact@gigly.com
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                        Phone
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Mon-Fri 9AM-6PM EST
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                        Office
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        123 Business Ave
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Quick Questions?
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">
                      How quickly do you respond?
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      We typically respond to all inquiries within 24 hours
                      during business days.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">
                      What services do you offer?
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      We connect you with freelancers for web development,
                      design, writing, marketing, and more.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">
                      Is there a consultation fee?
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Initial consultations are completely free. We'll discuss
                      your project and provide recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
