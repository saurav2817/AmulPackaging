import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsClock } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsInfoOpen(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 w-full left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur shadow-lg py-2"
            : "bg-white shadow-md py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/index">
            <img
              src="/img/logo.png"
              alt="Logo"
              width={200}
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 font-medium">
            <li>
              <NavLink 
                to="/"
                className={({isActive}) => `hover:text-[var(--primary-color)] ${isActive && location.pathname === "/" ? "text-[var(--primary-color)]" : ""}`}
                end
                aria-label="Go to Amul Packaging home page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about"
                className={({isActive}) => `hover:text-[var(--primary-color)] ${isActive ? "text-[var(--primary-color)]" : ""}`}
                aria-label="Learn about Amul Packaging company"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products"
                className={({isActive}) => `hover:text-[var(--primary-color)] ${isActive ? "text-[var(--primary-color)]" : ""}`}
                aria-label="View flexible packaging products"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/services"
                className={({isActive}) => `hover:text-[var(--primary-color)] ${isActive ? "text-[var(--primary-color)]" : ""}`}
                aria-label="Explore packaging services"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/IndustriesWeServe"
                className={({isActive}) => `hover:text-[var(--primary-color)] ${isActive ? "text-[var(--primary-color)]" : ""}`}
                aria-label="See industries we serve"
              >
                Industries We Serve
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({isActive}) => `hover:text-[var(--primary-color)] ${isActive ? "text-[var(--primary-color)]" : ""}`}
                aria-label="Contact Amul Packaging"
              >
                Contact Us
              </NavLink>
            </li>
            {/* Info Icon */}
            <li className="hidden md:block">
              <button
                className="p-2 rounded focus:outline-none"
                onClick={() => setIsInfoOpen(true)}
              >
                <HiMenuAlt3 size={28} />
              </button>
            </li>
            <li>
            <NavLink
             to="/AmulPackagingCatalogue.pdf"
             target="_blank"
                className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-full shadow hover:bg-yellow-400 transition-colors duration-200 w-max"
                aria-label="Download Catalogue"
              >
                Download Catalogue
            </NavLink>
            
            </li>
          </ul>
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              className="p-2 rounded focus:outline-none"
              onClick={() => setIsMenuOpen(true)}
            >
              <HiMenuAlt3 size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* === Overlay === */}
      {(isMenuOpen || isInfoOpen) && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeAll}
        ></div>
      )}

      {/* Desktop Info Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isInfoOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/img/logo.png"
              alt="Amul Packaging"
              className="h-8 w-auto"
            />
            <h2 className="text-base font-semibold tracking-wide">
              Get in Touch
            </h2>
          </div>
          <button
            aria-label="Close info panel"
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => setIsInfoOpen(false)}
          >
            <IoCloseSharp size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="h-full overflow-y-auto">
          <div className="px-5 py-5 space-y-6">
            {/* Intro */}
            <div className="text-sm text-gray-600 leading-6">
              <p>
                We are a leading flexible packaging manufacturer delivering
                high-quality pouches and sustainable solutions for FMCG and
                retail brands.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <a
                href="tel:+919876543210"
                className="flex items-start space-x-3 p-3 rounded-lg border hover:border-blue-500 transition-colors"
              >
                <span className="mt-0.5 text-primary">
                  <AiOutlinePhone size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    +91 9004382696
                  </p>
                </div>
              </a>
              <a
                href="mailto:Sales@amulpackaging.in"
                className="flex items-start space-x-3 p-3 rounded-lg border hover:border-blue-500 transition-colors"
              >
                <span className="mt-0.5 text-primary">
                  <HiOutlineMail size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Sales@amulpackaging.in
                  </p>
                </div>
              </a>
              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <span className="mt-0.5 text-primary">
                  <HiOutlineLocationMarker size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                  Head Office Address
                  </p>
                  
                  <p className="text-sm font-medium text-gray-900">
                  2, Pramod Prasad Building, Plot No.232.<br/> Next to Brij Albela, Wadala (W), Mumbai 400 031.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <span className="mt-0.5 text-primary">
                  <HiOutlineLocationMarker size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                  Factory Address
                  </p>
                  
                  <p className="text-sm font-medium text-gray-900">
                  Bldg No.P4, Plot No.P, Shree Raj Laxmi Ind. Estate, Sonale Village, Bhiwandi , Maharashtra 421302
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <span className="mt-0.5 text-primary">
                  <BsClock size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Hours
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Mon - Sat: 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                Quick Links
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <a
                  href="about"
                  className="p-2 rounded border hover:border-blue-500"
                >
                  About Us
                </a>
                <a
                  href="products"
                  className="p-2 rounded border hover:border-blue-500"
                >
                  Products
                </a>
                <a
                  href="services"
                  className="p-2 rounded border hover:border-blue-500"
                >
                  Services
                </a>
                <a
                  href="/contact"
                  className="p-2 rounded border hover:border-blue-500"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href="/AmulPackagingCatalogue.pdf" target="_blank"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-blue-700 transition-colors w-full"
              >
                Download Catalogue
              </a>
              
              
            </div>

           
          </div>

          {/* Footer small */}
          <div className="px-5 py-4 border-t text-xs text-gray-500">
            © {new Date().getFullYear()} Amul Packaging. All rights reserved.
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <IoCloseSharp size={28} />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4 font-medium">
          <li>
            <NavLink
              to="/"
              className={({isActive}) => `hover:text-blue-600 ${isActive && location.pathname === "/" ? "text-blue-600" : ""}`}
              end
              onClick={closeAll}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({isActive}) => `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`}
              onClick={closeAll}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({isActive}) => `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`}
              onClick={closeAll}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({isActive}) => `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`}
              onClick={closeAll}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/IndustriesWeServe"
              className={({isActive}) => `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`}
              onClick={closeAll}
            >
              Industries We Serve
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({isActive}) => `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`}
              onClick={closeAll}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
                to="/AmulPackagingCatalogue.pdf"
                target="_blank"
                className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-full shadow hover:bg-yellow-400 transition-colors duration-200 w-max"
                aria-label="Download Catalogue"
              >
                Download Catalogue
            </NavLink>
            
            </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
