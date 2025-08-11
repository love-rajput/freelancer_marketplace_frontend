import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { UserRound } from "@/components/animate-ui/icons/user-round";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/animate-ui/radix/dropdown-menu";
import { CreditCard, Home, LogOut, PlusCircle, User } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onProfile, setonProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      setUser(JSON.parse(userString));
    } else {
      setUser(null);
    }
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setonProfile(location.pathname === "/userprofile");
  }, [location.pathname]);

  // Function to get role-based home route
  const getRoleBasedHomeRoute = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        const userRole = userData.role;

        if (userRole === "freelancer") {
          return "/freelancerDashboard";
        } else if (userRole === "client") {
          return "/clientDashboard";
        }
      } catch (error) {
        console.error("Error parsing user data for navigation:", error);
      }
    }

    // Default fallback route
    return "/";
  };

  // Handle home navigation with role-based routing
  const handleHomeNavigation = (isMobile = false) => {
    const homeRoute = getRoleBasedHomeRoute();
   
    navigate(homeRoute);

    if (isMobile) {
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  // Updated navItems - removed hardcoded href for Home
  const navItems = [
    { label: "Home", action: "home" }, // Changed to action instead of href
    { label: "Services", href: "/services" }, // You can update this route as needed
    { label: "About Us", href: "#aboutus" },
  ];

  const renderNavItems = (isMobile = false) => (
    <>
      {navItems.map((item) => (
        <li key={item.label}>
          {item.action === "home" ? (
            // Special handling for Home navigation
            <button
              onClick={() => handleHomeNavigation(isMobile)}
              className="hover:text-green-500 transition-colors cursor-pointer text-white bg-transparent border-none p-0 font-medium"
            >
              {item.label}
            </button>
          ) : (
            // Regular navigation for other items
            <a
              href={item.href}
              className="hover:text-green-500 transition-colors cursor-pointer text-white"
              onClick={() => isMobile && setMenuOpen(false)}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </>
  );

  const renderUserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-0 w-30 flex justify-center">
          <AnimateIcon animateOnHover>
            <div className="flex justify-center items-center gap-2">
              <UserRound /> <p className="">Profile</p>
            </div>
          </AnimateIcon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              navigate(onProfile ? getRoleBasedHomeRoute() : "/userprofile")
            }
          >
            {onProfile ? (
              <Home className="mr-2 h-4 w-4" />
            ) : (
              <User className="mr-2 h-4 w-4" />
            )}
            <span>{onProfile ? "Home" : "Profile"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              navigate(
                user?.role === "freelancer"
                  ? "/freelancerorders"
                  : "/clientorders"
              )
            }
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Your Orders</span>
          </DropdownMenuItem>
          {user?.role === "freelancer" && (
            <DropdownMenuItem onClick={() => navigate("/creategigs")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>My Gigs</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <nav className="p-4 flex items-center justify-between border-b border-white/20 shadow-md fixed w-full z-20 bg-white/10 backdrop-blur-md">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-1 text-white">
          Giglyy<span className="text-green-500">.</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium items-center">
          {renderNavItems()}
          <li>
            {isLoggedIn ? (
              renderUserMenu()
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-md shadow"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Get Started
              </button>
            )}
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-1 w-6 bg-green-500 rounded transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-1 w-6 bg-green-500 rounded transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-1 w-6 bg-green-500 rounded transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-transparent bg-opacity-50"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-16 right-0 w-64 bg-gray-800 shadow-lg rounded-l-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-4 font-medium">
              {renderNavItems(true)}
              <li>
                {isLoggedIn ? (
                  renderUserMenu()
                ) : (
                  <button
                    className="w-full bg-green-500 hover:bg-green-600 transition-colors text-black px-4 py-2 rounded-md shadow"
                    onClick={() => {
                      document.getElementById("my_modal_5").showModal();
                      setMenuOpen(false);
                    }}
                  >
                    Get Started
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;
