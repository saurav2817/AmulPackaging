import React from "react";
import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoChevronForward,
  IoListCircle,
  IoCheckmarkCircle,
  IoApps,
  IoArrowBack,
  IoStar,
  IoChevronForward as IoChevronForwardIcon,
} from "react-icons/io5";

const SERVICES = [
  {
    icon: <IoListCircle className="h-10 w-10 text-[var(--primary-color)]" />,
    title: "Packaging Designing",
    desc: "Our expert in-house design team crafts impactful, functional, and brand-driven packaging. We ensure your product stands out and remains protected.",
    features: [
      "Creative and innovative design concepts",
      "Tailored packaging structures",
      "Brand-focused artwork & graphics",
      "Material and finish recommendations",
    ],
    featureColor: "text-[var(--secondary-color)]",
  },
  {
    icon: <IoApps className="h-10 w-10 text-amber-500" />,
    title: "Prototyping & Sampling",
    desc: "Before scaling, visualize your packaging with real product mockups and make confident decisions with ease.",
    features: [
      "Real product mockups and samples",
      "Multiple design variations",
      "Rapid turnaround for approvals",
      "Ideal for startups and new launches",
    ],
    featureColor: "text-orange-500",
  },
  {
    icon: <IoStar className="h-10 w-10 text-pink-600" />,
    title: "Digital Printing (Low MOQ)",
    desc: "Enjoy flexibility and speed for short runs, pilot projects, and limited-edition launches—perfect for startups and personalization.",
    features: [
      "No cylinder cost, faster turnaround",
      "High-res vibrant prints",
      "On-demand customization",
      "Small batches & market entry",
    ],
    featureColor: "text-pink-600",
  },
  {
    icon: (
      <IoChevronForwardIcon className="h-10 w-10 text-green-600 rotate-90" />
    ),
    title: "Rotogravure Printing",
    desc: "For large-scale needs, our multi-color rotogravure ensures precise color registration, durability and premium finish.",
    features: [
      "Sharp, detailed prints",
      "High-speed production capability",
      "Cost-effective for bulk",
      "Durable, premium finish",
    ],
    featureColor: "text-green-600",
  },
  {
    icon: <IoArrowBack className="h-10 w-10 text-sky-500 -rotate-45" />,
    title: "Flexographic Printing",
    desc: "Combine speed and quality for medium to large runs: clean, efficient printing on diverse substrates.",
    features: [
      "Fast setup, high efficiency",
      "Cost-effective for volume",
      "Multiple material support",
      "Consistent color, quality",
    ],
    featureColor: "text-sky-500",
  },
];

const Services = () => {
  return (
    <main className="bg-[#f4f7fa] min-h-screen">
      {/* Banner Section */}
      <section className="text-center md:py-30 py-10 bg-[url('/img/slider_banner/Products.jpg')] bg-cover bg-center">
        <h1 className="text-3xl font-bold text-white">Services</h1>
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
              Services
              </span>
            </div>
          </nav>
        </div>
      </section>

      <section className="mt-20 glass-bg">
    <div className="our-values-inner">
      <p className="our-values-subheading">
      At Amul Packaging we provide end-to-end packaging solutions — from concept creation to final production. Our goal is to help brands of all sizes bring their packaging vision to life with innovation, flexibility, and uncompromised quality. Whether you’re a startup or an established brand, we offer the right solutions to match your needs.
      </p>
      </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 animate-fadeIn ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc, idx) => (
            <div
              key={svc.title}
              className="group bg-white/75 backdrop-blur-md rounded-3xl shadow-2xl px-8 py-10 flex flex-col hover:scale-[1.025] hover:-translate-y-2 transition-all duration-300 relative border border-white/70 overflow-hidden"
            >
              <div className="absolute right-2 top-2 opacity-10 text-[90px] pointer-events-none select-none">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </div>
              <span className="mb-4">{svc.icon}</span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[var(--primary-color)] transition">
                {svc.title}
              </h3>
              <p className="text-gray-600 mb-5 min-h-[56px]">{svc.desc}</p>
              <ul className="space-y-2 mb-6">
                {svc.features.map((f, i) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2 text-gray-800 text-base font-medium`}
                  >
                    <IoCheckmarkCircle
                      className={svc.featureColor + " text-lg"}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {/* Glow hover effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-[var(--primary-color)]/20 opacity-0 group-hover:opacity-40 transition-all duration-200 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Services;
