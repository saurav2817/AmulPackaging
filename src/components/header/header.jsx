import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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
          <img
            src="/img/logo.png"
            alt="Logo"
            width={200}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 font-medium">
            <li>
              <NavLink to="/" className="hover:text-[var(--primary-color)]" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-[var(--primary-color)]">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="hover:text-[var(--primary-color)]">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="hover:text-[var(--primary-color)]">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-[var(--primary-color)]">
                Contact
              </NavLink>
            </li>
            {/* Info Icon (only desktop) */}
            <li className="hidden md:block">
              <button
                className="p-2 rounded focus:outline-none"
                onClick={() => setIsInfoOpen(true)}
              >
                <HiMenuAlt3 size={28} />
              </button>
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
                href="mailto:amulpackingonline@gmail.com"
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
                    amulpackingonline@gmail.com
                  </p>
                </div>
              </a>
              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <span className="mt-0.5 text-primary">
                  <HiOutlineLocationMarker size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Address
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Amul Packaging Pvt. Ltd.
                  </p>
                  <p className="text-sm text-gray-700">
                    P-3A, Raj Laxmi HiTech Textile Park, Sonale Village,
                    Bhiwandi, Maharashtra 421302
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
                    Mon - Sat: 8:00 AM - 9:00 PM
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
                  href="#about"
                  className="p-2 rounded border hover:border-blue-500"
                >
                  About Us
                </a>
                <a
                  href="#products"
                  className="p-2 rounded border hover:border-blue-500"
                >
                  Products
                </a>
                <a
                  href="#services"
                  className="p-2 rounded border hover:border-blue-500"
                >
                  Services
                </a>
                <a
                  href="#contact"
                  className="p-2 rounded border hover:border-blue-500"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href="mailto:info@amulpackaging.com?subject=Inquiry"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-blue-700 transition-colors w-full"
              >
                Request Quote
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors w-full"
              >
                Call Now
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                >
                  <FaInstagram size={16} />
                </a>
              </div>
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
              className="hover:text-blue-600"
              onClick={closeAll}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="hover:text-blue-600"
              onClick={closeAll}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="hover:text-blue-600"
              onClick={closeAll}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className="hover:text-blue-600"
              onClick={closeAll}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="hover:text-blue-600"
              onClick={closeAll}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
