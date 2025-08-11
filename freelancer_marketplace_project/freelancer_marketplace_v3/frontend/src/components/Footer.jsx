import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t">
      {/* Separator */}
      <hr className="border-gray-200 mb-6" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-4 gap-6">
        {/* Logo and copyright */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <span className="text-4xl font-extrabold text-gray-800 flex items-center">
            <span className="mr-1" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '-2px' }}>Giglyy</span>
            <span className="ml-1 w-3 h-3 rounded-full bg-green-400 inline-block"></span>
          </span>
          <span className="text-gray-700 text-lg ml-2">
            Made with ❤️ by Jay
          </span>
        </div>
        {/* Social and options */}
        <div className="flex items-center gap-6 flex-wrap">
          {/* Social Icons */}
          <a href="#" aria-label="Instagram" className="text-gray-800 hover:text-green-500 text-2xl">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-800 hover:text-green-500 text-2xl">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#" aria-label="GitHub" className="text-gray-800 hover:text-green-500 text-2xl">
            <i className="fa-brands fa-github"></i>
          </a>
          {/* Dot Separator */}
          <span className="mx-2 text-gray-300 text-2xl">•</span>
          {/* Navigation Links */}
          <a href="#home" className="text-gray-700 font-medium hover:text-green-500 transition">Home</a>
          <a href="#aboutus" className="text-gray-700 font-medium hover:text-green-500 transition">About Us</a>
          <a href="#contactus" className="text-gray-700 font-medium hover:text-green-500 transition">Contact Us</a>
          <a href="#services" className="text-gray-700 font-medium hover:text-green-500 transition">Services</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer