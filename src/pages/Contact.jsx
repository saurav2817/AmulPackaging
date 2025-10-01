import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoHomeOutline, IoChevronForward, IoStar, IoListCircle, IoCheckmarkCircle, IoApps, IoArrowBack, IoClose, IoChevronBack, IoChevronForward as IoChevronForwardIcon } from "react-icons/io5";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import toast from "react-hot-toast";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [sendError, setSendError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) newErrors.phone = "Valid phone is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSendError("");
        if (!validate()) return;
        setSubmitted(true);
      
		try {
		  const API_BASE = `${window.location.origin}/api`;
          const response = await fetch(`${API_BASE}/send-mail-smtp.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message
            }),
          });
      
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.message || "Submission failed");
          }
      
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
          setSendError("Failed to send. Please try again.");
          console.error(err);
        } finally {
          setSubmitted(false);
        }
      };
      

    return (
        <>
            <main className="mx-auto">
                <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('/img/slider_banner/contactus.jpg')" }}>
                    <div className="absolute inset-0 bg-black/15 z-0"></div>
                    <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Contact Us</h1>
                        <div className="flex justify-center mt-3">
                            <nav aria-label="Breadcrumb" className="mb-6">
                              <div className="flex flex-wrap items-center gap-2 text-sm">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                                  <IoHomeOutline />
                                  <Link to="/" className="hover:underline">
                                    Home
                                  </Link>
                                </span>

                                <IoChevronForward className="opacity-60" />
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1f4fb] text-[var(--primary-color)] font-medium">
                                    Contact Us
                                </span>
                              </div>
                            </nav>
                        </div>
                       
                    </div>
                </section>

                <section className="relative max-w-7xl mx-auto px-4 -mt-10 md:-mt-10 lg:-mt-10 z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                            <div className="flex flex-col items-center gap-3">
                                <BiSolidPhoneCall className="text-4xl bg-primary p-2 text-white rounded-lg" />
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="">+91 9004382696</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                            <div className="flex flex-col items-center gap-3">
                                <IoMdMail className="text-4xl bg-primary p-2 text-white rounded-lg" />
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="">amulpackingonline@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                            <div className="flex flex-col items-center gap-3">
                                <FaLocationDot className="text-4xl bg-primary p-2 text-white rounded-lg" />
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="">P-3A, Raj Laxmi HiTech Textile Park, Sonale Village, Bhiwandi, Maharashtra 421302</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                            <div className="flex flex-col items-center gap-3">
                                <GoClockFill className="text-4xl bg-primary p-2 text-white rounded-lg" />
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Work Hours</p>
                                    <p className="">Mon - Sat: 8:00 AM - 9:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 mt-12 mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-2xl font-bold text-primary">Send us a message</h3>
                            <p className="text-gray-600 mt-1">Our team will get back within 1 business day.</p>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#ffcb08] ${errors.name ? "border-red-500" : "border-gray-300"}`} placeholder="Your name" />
                                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input name="email" type="email" value={formData.email} onChange={handleChange} className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#ffcb08] ${errors.email ? "border-red-500" : "border-gray-300"}`} placeholder="you@example.com" />
                                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input name="phone" value={formData.phone} onChange={handleChange} className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#ffcb08] ${errors.phone ? "border-red-500" : "border-gray-300"}`} placeholder="+91 90043 82696" />
                                        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea name="message" rows="5" value={formData.message} onChange={handleChange} className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#ffcb08] ${errors.message ? "border-red-500" : "border-gray-300"}`} placeholder="Tell us about your requirements" />
                                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                                </div>
                                <button type="submit" disabled={submitted} className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60">
                                    {submitted ? "Sending..." : "Send Message"}
                                </button>
                                {sendError ? (
                                    <p className="text-red-600 text-sm text-center mt-2">{sendError}</p>
                                ) : null}
                            </form>
                        </div>
                        <div>
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[380px]">
                                <iframe title="Amul Packaging Location" src="https://www.google.com/maps?q=P-3A,%20Raj%20Laxmi%20HiTech%20Textile%20Park,%20Sonale%20Village,%20Bhiwandi,%20Maharashtra%20421302&output=embed" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen></iframe>
                            </div>
                            <div className="mt-6 bg-[#F8F9FA] rounded-xl p-5 border border-gray-200">
                                <h4 className="text-lg font-semibold text-primary">Why contact us?</h4>
                                <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                                    <li>Custom flexible packaging solutions</li>
                                    <li>Fast quotes and prototyping</li>
                                    <li>End-to-end guidance from experts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Contact;


