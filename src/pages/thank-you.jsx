import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoHomeOutline, IoChevronForward } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import SEO from "../components/seo/SEO";

const ThankYou = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO
                title="Thank You | Amul Packaging"
                description="Thank you for contacting Amul Packaging. We'll be in touch soon!"
                url="https://amulpackaging.in/thank-you"
            />
            <main className="mx-auto">
                {/* Hero Section */}
                <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('/img/slider_banner/contactus.jpg')" }}>
                    <div className="absolute inset-0 bg-black/15 z-0"></div>
                    <div className="relative z-10 max-w-6xl mx-auto px-4 md:py-24 py-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Thank You!</h1>
                        <div className="flex justify-center mt-3">
                            <nav aria-label="Breadcrumb" className="mb-6">
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                                        <IoHomeOutline />
                                        <Link to="/" className="hover:underline" aria-label="Go to home page">
                                            Home
                                        </Link>
                                    </span>

                                    <IoChevronForward className="opacity-60" />
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1f4fb] text-[var(--primary-color)] font-medium">
                                        Thank You
                                    </span>
                                </div>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Thank You Content */}
                <section className="relative max-w-6xl mx-auto px-4 py-20 mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Success Message */}
                        <div className="space-y-6 order-2 lg:order-1">
                            <div className="inline-block">
                                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[var(--secondary-color)]/20 to-[var(--primary-color)]/20">
                                    <IoCheckmarkCircle className="text-6xl text-[var(--secondary-color)] animate-bounce" />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-color)] mb-3">
                                    We've Received Your Message!
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Thank you for reaching out to Amul Packaging. We appreciate your interest and will review your inquiry carefully.
                                </p>
                            </div>

                            <div className="space-y-4 bg-gradient-to-br from-[var(--secondary-color)]/5 to-[var(--primary-color)]/5 rounded-2xl p-6 border border-[var(--secondary-color)]/20">
                                <h3 className="text-lg font-semibold text-[var(--primary-color)] flex items-center gap-2">
                                    <MdOutlineInfo className="text-xl" />
                                    What Happens Next
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="inline-block w-2 h-2 bg-[var(--secondary-color)] rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Our team will review your inquiry within 1 business day</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="inline-block w-2 h-2 bg-[var(--secondary-color)] rounded-full mt-2 flex-shrink-0"></span>
                                        <span>We'll contact you via email or phone with tailored solutions</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="inline-block w-2 h-2 bg-[var(--secondary-color)] rounded-full mt-2 flex-shrink-0"></span>
                                        <span>You'll receive samples and detailed proposals based on your needs</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-700">
                                        <span className="inline-block w-2 h-2 bg-[var(--secondary-color)] rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Our expert team will guide you through every step</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Link
                                    to="/"
                                    className="px-8 py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 text-center"
                                >
                                    Back to Home
                                </Link>
                                <Link
                                    to="/products"
                                    className="px-8 py-3 border-2 border-[var(--secondary-color)] text-[var(--primary-color)] font-semibold rounded-lg hover:bg-[var(--secondary-color)]/10 transition-all text-center"
                                >
                                    Explore Products
                                </Link>
                            </div>
                        </div>

                        {/* Right - Illustration/Info Cards */}
                        <div className="space-y-4 order-1 lg:order-2">
                            {/* Contact Info Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">Need Immediate Assistance?</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium mb-1">Call Us</p>
                                        <a href="tel:+919004382696" className="text-lg font-semibold text-[var(--secondary-color)] hover:underline">
                                            +91 9004382696
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium mb-1">Email Us</p>
                                        <a href="mailto:Sales@amulpackaging.in" className="text-lg font-semibold text-[var(--secondary-color)] hover:underline">
                                            Sales@amulpackaging.in
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium mb-1">Working Hours</p>
                                        <p className="text-gray-700">Mon - Sat: 9:00 AM - 8:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose Us Card */}
                            <div className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-color)]/80 rounded-2xl shadow-lg p-8 text-white">
                                <h3 className="text-xl font-bold mb-4">Why Choose Amul Packaging?</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-[var(--secondary-color)] rounded-full"></span>
                                        <span>Industry-leading expertise since 1985</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-[var(--secondary-color)] rounded-full"></span>
                                        <span>Custom flexible packaging solutions</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-[var(--secondary-color)] rounded-full"></span>
                                        <span>ISO certified & eco-friendly options</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-[var(--secondary-color)] rounded-full"></span>
                                        <span>Fast turnaround & competitive pricing</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Fun Fact */}
                            <div className="bg-[var(--secondary-color)]/10 rounded-2xl p-6 border border-[var(--secondary-color)]/30">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    <span className="font-semibold text-[var(--secondary-color)]">Did you know?</span> Amul Packaging has been trusted by 500+ brands across India for their flexible packaging needs. Join our growing family of satisfied clients!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-[var(--primary-color)]/95 to-[var(--primary-color)] py-16 px-4 mb-0">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                            Explore Our Solutions
                        </h2>
                        <p className="text-white/90 text-lg mb-8">
                            Discover our wide range of packaging products and services tailored to your industry needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/products"
                                className="px-8 py-3 bg-[var(--secondary-color)] text-[var(--primary-color)] font-semibold rounded-lg hover:brightness-95 transition-all transform hover:scale-105"
                            >
                                Browse All Products
                            </Link>
                            <Link
                                to="/services"
                                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                            >
                                Our Services
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ThankYou;
