import React from "react";
import "./ourValues.css";
import AnimateOnScroll from "../animations/AnimateOnScroll"; // Assuming you have this

const values = [
  {
    icon: "🏆",
    color: "#f7b731",
    title: "Quality First",
    desc: "We believe packaging is more than just protection — it’s a reflection of your brand. Every pouch, roll, and print we deliver is crafted to meet the highest standards of precision and performance."
  },
  {
    icon: "💡",
    color: "#4bcffa",
    title: "Innovation & Sustainability",
    desc: "We embrace new technologies and eco-friendly solutions to stay ahead of industry trends. Our focus is on creating smart, sustainable packaging that adds value to your product and the planet."
  },
  {
    icon: "🤝",
    color: "#05c46b",
    title: "Customer-Centric Approach",
    desc: "Your success drives us. We build strong, long-term partnerships by understanding your needs and offering customized packaging solutions that elevate your brand."
  },
  {
    icon: "⏱",
    color: "#fd5e53",
    title: "Reliability & Consistency",
    desc: "We value trust. Our processes are designed to ensure timely delivery, consistent quality, and dependable service every time."
  },
  {
    icon: "🌍",
    color: "#26de81",
    title: "Integrity & Responsibility",
    desc: "We operate with honesty and transparency — from our sourcing practices to our customer interactions — ensuring we remain a trusted partner in your growth journey."
  }
];

const OurValues = () => (
  <section className="our-values-section glass-bg">
    <div className="our-values-inner">
      <h2 className="our-values-heading-with-accent text-center">Our Values</h2>
      <p className="our-values-subheading">
        At the heart of everything we do lies a commitment to quality, innovation, and trust. Our values shape the way we work, the solutions we deliver, and the partnerships we build.
      </p>
      <AnimateOnScroll as="div" className="our-values-grid flashy-grid" variant="fadeUp" stagger={0.11} once={true}>
        {values.map(({ icon, title, desc, color }, idx) => (
          <div className="value-card glass-card" key={title} style={{ animationDelay: `${idx * 100}ms` }}>
            <span
              className="value-icon gradient-ring"
              style={{ background: `radial-gradient(circle at 60% 30%, ${color} 60%, #fff0 100%)` }}
            >
              {icon}
            </span>
            <h3 className="value-title flashy-title">{title}</h3>
            <p className="value-desc">{desc}</p>
          </div>
        ))}
      </AnimateOnScroll>
    </div>
    {/* Optional: decorative SVG or shape accents/background image */}
    <div className="our-values-svg-bg"></div>
  </section>
);

export default OurValues;