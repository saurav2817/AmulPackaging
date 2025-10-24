import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {

      const API_BASE = `${window.location.origin}/api`;
      const res = await fetch(`${API_BASE}/send-newsletter.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Subscription failed");
      }
      setStatus("success");
      setMessage("Subscribed successfully.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err?.message || "Something went wrong. Please try again.");
    }
  };

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
            <form className="mt-4 flex w-full max-w-md" onSubmit={handleSubscribe}>
              <div className="flex items-center bg-white rounded-l-md px-3 text-black h-10 flex-1 min-w-0">
                <MdOutlineMail />
                <input
                  type="email"
                  placeholder="Your email"
                  className="ml-2 outline-none bg-transparent text-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 px-4 rounded-r-md text-black flex items-center justify-center h-10 shrink-0 disabled:opacity-60"
                aria-label="Subscribe"
                disabled={status === "loading"}
              >
                {status === "loading" ? "..." : <IoSend />}
              </button>
            </form>

            {status !== "idle" && message && (
              <p className={`text-sm mt-2 ${status === "success" ? "text-green-300" : "text-red-300"}`} aria-live="polite">
                {message}
              </p>
            )}

            {/* Social Icons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {/* <a
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
              </a> */}
              <a href="https://www.linkedin.com/company/amul-packagingap/" target="_blank"
              className="bg-white p-2 rounded-full text-[#003580] hover:scale-110 transition inline-flex"
               aria-label="Linkedin"
              >
              <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline" aria-label="Go to Amul Packaging home page">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline" aria-label="Learn about Amul Packaging company">
                  About
                </a>
              </li>
              <li>
                <a href="/products" className="hover:underline" aria-label="View flexible packaging products">
                  Products
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline" aria-label="Explore packaging services">
                   Services
                </a>
              </li>
              <li>
                <a href="/IndustriesWeServe" className="hover:underline" aria-label="Explore Industries We Serve">
                Industries We Serve
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline" aria-label="Contact Amul Packaging">
                  Contact 
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacyPolicy" className="hover:underline" aria-label="Read Amul Packaging privacy policy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/termCondition" className="hover:underline" aria-label="Read Amul Packaging terms and conditions">
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
              <div>
                <h5 className=" text-white text-xs">Phone</h5>
                <a
                href="tel:+919004382696"
                className="hover:underline break-all font-bold"
              >
                +91 9004382696
              </a>
              </div>
              
            </div>

            {/* <div className="flex gap-2 items-center mt-4">
              <span className="bg-white p-2 flex rounded-full text-[#003580]">
                <IoIosMail />
              </span>
              <div>
                <h5 className=" text-white text-xs">Factory Email</h5>
                <a
                href="mailto:Sales@amulpackaging.in"
                className="hover:underline break-all font-bold"
              >
                Sales@amulpackaging.in 
              </a>
              </div>
              
            </div> */}

            <div className="flex gap-2 items-center mt-4">
              <span className="bg-white p-2 flex rounded-full text-[#003580]">
                <IoIosMail />
              </span>
              <div>
                <h5 className=" text-white text-xs">Head Office Email</h5>
                <a
                href="mailto:Sales@amulpackaging.in"
                className="hover:underline break-all font-bold"
              >
               Sales@amulpackaging.in 
              </a>
              </div>
              
            </div>

            <div className="flex gap-2 items-start mt-4">
              <span className="bg-white p-2 flex rounded-full text-[#003580]">
                <FaLocationDot />
              </span>
              <div>
                <h5 className=" text-white text-xs">Factory Address</h5>
                <address className="not-italic text-sm leading-relaxed max-w-xs font-bold">
                Bldg No.P4, Plot No.P, Shree Raj Laxmi Ind. Estate, Sonale Village, Bhiwandi
                , Maharashtra 421302
              </address>
              </div>
            </div>

            <div className="flex gap-2 items-start mt-4">
              <span className="bg-white p-2 flex rounded-full text-[#003580]">
                <FaLocationDot />
              </span>
              <div>
                <h5 className=" text-white text-xs">Head Office Address</h5>
                <address className="not-italic text-sm leading-relaxed max-w-xs font-bold">
                2, Pramod Prasad Building, Plot No.232. Next to Brij Albela, 
                Wadala (W), Mumbai 400 031.
              </address>
              </div>
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

