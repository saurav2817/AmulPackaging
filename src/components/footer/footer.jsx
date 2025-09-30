import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#003580] text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company + Newsletter */}
          <div className="space-y-4">
          <a href="/index">
            <img
              src="/img/footerLogo.png"
              alt="Amul Packaging"
              className="h-12 w-auto mb-2"
            />
          </a>
            <p className="text-sm leading-relaxed">
              We are now one of the leading manufacturers of stock packaging
              products in various formats like stand-up pouches, zipper
              pouches, tape bags, laminated pouches, etc
            </p>

            {/* Newsletter */}
            <form className="mt-4 flex w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center bg-white rounded-l-md px-3 text-black h-10 flex-1 min-w-0">
                <MdOutlineMail />
                <input
                  type="email"
                  placeholder="Your email"
                  className="ml-2 outline-none bg-transparent text-sm w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 px-4 rounded-r-md text-black flex items-center justify-center h-10 shrink-0"
                aria-label="Subscribe"
              >
                <IoSend />
              </button>
            </form>

            {/* Social Icons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="bg-white p-2 rounded-full text-[#003580] hover:scale-110 transition inline-flex"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-white p-2 rounded-full text-[#003580] hover:scale-110 transition inline-flex"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-white p-2 rounded-full text-[#003580] hover:scale-110 transition inline-flex"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="bg-white p-2 rounded-full text-[#003580] hover:scale-110 transition inline-flex"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/index" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/About" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/Services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="/Contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacyPolicy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/termCondition" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-semibold mb-3">Contact Details</h3>

            <div className="flex gap-2 items-center">
              <span className="bg-white p-2 flex rounded-full text-[#003580]">
                <IoCall />
              </span>
              <a
                href="tel:+919004382696"
                className="hover:underline break-all"
              >
                +91 9004382696
              </a>
            </div>

            <div className="flex gap-2 items-center mt-4">
              <span className="bg-white p-2 flex rounded-full text-[#003580]">
                <IoIosMail />
              </span>
              <a
                href="mailto:amulpackingonline@gmail.com"
                className="hover:underline break-all"
              >
                amulpackingonline@gmail.com
              </a>
            </div>

            <div className="flex gap-2 items-start mt-4">
              <span className="bg-white p-2 flex rounded-full text-[#003580]">
                <FaLocationDot />
              </span>
              <address className="not-italic text-sm leading-relaxed max-w-xs">
                P-3A, Raj Laxmi HiTech Textile Park, Sonale Village,
                Bhiwandi, Maharashtra 421302
              </address>
            </div>
          </div>
        </div>
      </div>
    
      {/* Bottom Bar */}
      <div className="bg-white text-center text-sm sm:text-base text-black py-3 px-4">
        © Copyright 2025 - All Rights Reserved | Designed & Developed By –
        <a
          href="https://futurefacetech.in/"
          className="hover:underline ml-1 inline-block"
        >
          Future Face Tech PVt. LTD
        </a>
      </div>
    </footer>
  );
};

export default Footer;

