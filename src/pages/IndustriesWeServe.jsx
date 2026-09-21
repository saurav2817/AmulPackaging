import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { getSEOConfig } from "../config/seoConfig";
import {
  IoHomeOutline,
  IoChevronForward,
  IoStar,
  IoListCircle,
  IoCheckmarkCircle,
  IoApps,
  IoArrowBack,
  IoClose,
  IoChevronBack,
  IoChevronForward as IoChevronForwardIcon,
} from "react-icons/io5";
import { createProductUrl } from "../utils/productUrls";
import products from "../api/products";

const IndustriesWeServe = () => {
  const seoConfig = getSEOConfig("industries");
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // Helper function to get product data by name
  const getProductByName = (productName) => {
    return products.find(
      (product) =>
        product.name.toLowerCase() === productName.toLowerCase() ||
        product.name.toLowerCase().includes(productName.toLowerCase()) ||
        productName.toLowerCase().includes(product.name.toLowerCase())
    );
  };

  // Mapping pouch types to their corresponding images and product links
  const pouchImageMapping = {
    "Standup Zipper Pouch": {
      image: "/img/products/Standup-zipper-pouch-Main.webp",
      product: getProductByName("Standup Zipper Pouch"),
    },
    "Flat Bottom Pouches": {
      image: "/img/products/Flat-Bottom-Pouch-Main.webp",
      product: getProductByName("Flat Bottom Pouch"),
    },
    "Center Seal Pouch": {
      image: "/img/products/Centre-Seal-Pouch-Main.webp",
      product: getProductByName("Centre Seal Pouch"),
    },
    "Spout Pouch": {
      image: "/img/products/Spout-Pouch-Main.webp",
      product: getProductByName("Spout Pouch"),
    },
    "Shaped Pouch": {
      image: "/img/products/Shaped-Pouch-Main.webp",
      product: getProductByName("Shaped Pouch"),
    },
    "Laminated Roll-Stock": {
      image: "/img/products/Laminated-Roll-Stock-Main.webp",
      product: getProductByName("Laminated Roll-Stock"),
    },
    "Quad Seal Pouch": {
      image: "/img/products/Quad-Seal-Pouch-Main.webp",
      product: getProductByName("Quad Seal Pouch"),
    },
    "Three-Side Seal Pouch": {
      image: "/img/products/3-Side-Seal-Pouch-Main.webp",
      product: getProductByName("3 side seal  pouch"),
    },
    "Polybags": {
      image: "/img/products/Poly-bags-Main.webp",
      product: getProductByName("Poly bags"),
    },
    "Security Bags": {
      image: "/img/products/Security-Bags.webp",
      product: getProductByName("Security Bags"),
    },
    "Ziplock Pouch": {
      image: "/img/products/Ziplock-bags-Main.webp",
      product: getProductByName("Ziplock poly bags"),
    },
    "Vacuum Pouch": {
      image: "/img/products/Vacuum-Pouch-Main.webp",
      product: getProductByName("Vacuum Pouch"),
    },
  };

  const industriesData = [
    {
      id: "food",
      name: "Food Industry",
      emoji: "🥗",
      tagline: "Sealing Freshness. Elevating Taste.",
      description: [
        "Food packaging is about more than containment — it’s about preserving taste, aroma, and trust. Whether it’s a crispy snack, a rich blend of spices, or a ready-to-eat meal, our solutions ensure that every bite tastes as fresh as it was intended.",
        "Our multilayer films and high-barrier laminates protect products from oxygen, moisture, and contamination. Each pouch is designed for convenience, long shelf life, and brand impact — turning packaging into a silent salesman on retail shelves.",
      ],
      pouchTypes: [
        "Standup Zipper Pouch",
        "Flat Bottom Pouches",
        "Center Seal Pouch",
        "Three-Side Seal Pouch",
        "Laminated Roll-Stock",
      ],
      icon: "/img/serviceICN/food.webp",
    },
    {
      id: "beverage",
      name: "Beverage Industry",
      emoji: "🥤",
      tagline: "Pack Bold. Pour Fresh.",
      description: [
        "Beverages demand packaging that’s durable, portable, and safe — without compromising on freshness or flavor. Our beverage pouches are designed to handle liquid and semi-liquid products efficiently while offering flexibility and convenience to the end consumer.",
        "From spouted pouches for juices and energy drinks to laminated rollstock for automatic filling machines, our materials ensure superior seal integrity and product safety — ideal for both ambient and cold storage.",
      ],
      pouchTypes: [
        "Spout Pouch",
        "Standup Zipper Pouch",
        "Laminated Roll-Stock",
      ],
      icon: "/img/serviceICN/beverage.webp",
    },
    {
      id: "pet",
      name: "Pet Food Industry",
      emoji: "🐾",
      tagline: "Keeping Nutrition Fresh for Every Paw.",
      description: [
        "Pet owners trust packaging to preserve freshness, nutrients, and aroma — we deliver all three. Our pouches are built to handle heavy fills, prevent punctures, and maintain the natural aroma and crunch of pet food.",
        "These pouches stand tall on shelves and reflect the strength and reliability your brand stands for. Whether you’re packing dry kibble, treats, or wet meals, our packaging combines durability with convenience.",
      ],
      pouchTypes: [
        "Flat Bottom Pouches",
        "Quad Seal Pouch",
        "Standup Zipper Pouch",
      ],
      icon: "/img/serviceICN/pet.webp",
    },
    {
      id: "pharma",
      name: "Pharma Industry",
      emoji: "💊",
      tagline: "Protecting What Heals.",
      description: [
        "In the pharmaceutical and healthcare sector, safety, hygiene, and compliance are non-negotiable. We design packaging that upholds the highest standards of product integrity — from moisture barriers to tamper-evident seals.",
        "Our laminates and pouches maintain medicinal stability and extend shelf life while preventing contamination or degradation. We provide solutions for both over-the-counter and specialized healthcare products.",
      ],
      pouchTypes: ["Three-Side Seal Pouch", "Center Seal Pouch", "Vacuum Pouch", "Security Bags",],
      icon: "/img/serviceICN/pharma.webp",
    },
    {
      id: "agro",
      name: "Agro Industry",
      emoji: "🌾",
      tagline: "Tough Protection for Every Harvest.",
      description: [
        "Agro and fertilizer products require tough, weather-resistant, and long-lasting packaging. Our high-barrier laminated structures ensure that products stay protected against moisture, sunlight, and rough handling during storage and transport.",
        "We engineer our pouches to meet the unique needs of the agricultural sector — from compact seed packs to large fertilizer bags — with optimal sealing strength and print quality.",
      ],
      pouchTypes: ["Center Seal Pouch", "Quad Seal Pouch", "Flat Bottom Pouches", "Laminated Roll-Stock"],
      icon: "/img/serviceICN/agri.webp",
    },
    {
      id: "industrial",
      name: "Industrial Sector",
      emoji: "🏭",
      tagline: "Strength That Holds It All Together.",
      description: [
        "For industrial and chemical products, packaging must withstand extreme conditions. Our pouches and films are designed to be chemically resistant, tamper-proof, and capable of holding dense or abrasive materials without failure.",
        "We use advanced barrier laminations to contain and protect powders, granules, and liquids — ensuring that your products reach safely from factory to field.",
      ],
      pouchTypes: [
        "Center Seal Pouch",
        "Vacuum Pouch",
        "Laminated Roll-Stock",
        "Security Bags",
      ],
      icon: "/img/serviceICN/indstrial.webp",
    },
    {
      id: "fitness",
      name: "Fitness & Nutrition ",
      emoji: "🏋️",
      tagline: "Power-Packed Packaging for Power-Packed Products.",
      description: [
        "The fitness and nutrition industry thrives on quality, hygiene, and brand loyalty. Our packaging ensures that every scoop of protein or supplement stays fresh, safe, and potent until it’s consumed.",
        "We offer premium matte or glossy pouches that combine strong barrier protection with modern aesthetics — perfect for direct-to-consumer and retail brands alike.",
      ],
      pouchTypes: [
        "Flat Bottom Pouches",
        "Standup Zipper Pouch",
        "Three-Side Seal Pouch",
      ],
      icon: "/img/serviceICN/fitness.webp",
    },
    {
      id: "confectionery",
      name: "Confectionery Industry",
      emoji: "🍬",
      tagline: "Sweet Packaging That Sells.",
      description: [
        "Confectionery products require packaging that protects delicate textures while standing out on shelves. Our pouches are engineered to maintain crispness, prevent melting, and showcase premium branding through vibrant printing.",
        "We combine performance with visual appeal — because packaging isn’t just a wrapper, it’s an experience.",
      ],
      pouchTypes: [
        "Polybags",
        "Three-Side Seal Pouch",
        "Standup Zipper Pouch",
      ],
      icon: "/img/serviceICN/confectionery.webp",
    },
    {
      id: "clothing",
      name: "Clothing & Apparel",
      emoji: "👕",
      tagline: "Packaging That Speaks Style.",
      description: [
        "Clothing packaging should reflect brand identity while keeping garments safe during transit and storage. Our poly and ziplock bags are crystal-clear, smooth, and strong — designed to maintain product presentation and protection.",
        "",
      ],
      pouchTypes: ["Polybags", "Ziplock Pouch", "Security Bags",],
      icon: "/img/serviceICN/clothing.webp",
    },
    {
      id: "beauty",
      name: "Beauty & Personal Care",
      emoji: "💄",
      tagline: "Where Elegance Meets Protection.",
      description: [
        "For personal care products, packaging must combine aesthetics with protection. Our flexible packaging prevents leakage, oxidation, and contamination — ensuring your products look luxurious and stay effective longer.",
        "We help brands express elegance through packaging that feels premium and performs perfectly.",
      ],
      pouchTypes: ["Spout Pouch", "Standup Zipper Pouch", "Three-Side Seal Pouch",],
      icon: "/img/serviceICN/beauty&personalcare.webp",
    },
    {
      id: "dairy",
      name: "Dairy Industry",
      emoji: "🥛",
      tagline: "Pure Packaging for Pure Goodness.",
      description: [
        "Dairy products demand superior hygiene and protection. Our pouches and roll films are designed to preserve purity and freshness while maintaining strength under refrigeration or frozen conditions.",
        "We provide efficient, machine-friendly packaging solutions compatible with high-speed filling and sealing systems.",
      ],
      pouchTypes: [
        "Polybags",
        "Spout Pouch",
        "Laminated Roll-Stock",
      ],
      icon: "/img/serviceICN/dairy.webp",
    },
  ];

  return (
    <>
      <SEO {...seoConfig} />
      <main className="">
        <section className="text-center md:py-30 py-10 bg-[url('/img/slider_banner/IndustriesWeServe.webp')] bg-cover bg-center">
          <h1 className="text-3xl font-bold text-primary">
            Industries We Serve
          </h1>
          <p className="text-xl font-bold text-primary mt-3 mb-5">Complete Packaging Solutions for Industries in Bhiwandi, Mumbai</p>
          <div className="flex justify-center mt-3">
            <nav aria-label="Breadcrumb" className="mb-6">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                  <IoHomeOutline />
                  <Link
                    to="/"
                    className="hover:underline"
                    aria-label="Go to home page"
                  >
                    Home
                  </Link>
                </span>

                <IoChevronForward className="opacity-60" />
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1f4fb] text-[var(--primary-color)] font-medium">
                  Industries We Serve
                </span>
              </div>
            </nav>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how our specialized packaging solutions cater to
                diverse industries, ensuring product protection, freshness, and
                brand appeal across sectors.
                <br />
                Our Packaging Solutions for Industries in Bhiwandi, Mumbai are developed around each sector’s storage, sealing, printing and product-protection requirements.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {industriesData.map((industry) => (
                <div
                  key={industry.id}
                  className="flex flex-col items-center bg-white shadow-lg hover:shadow-xl px-2 py-6 md:px-6 md:py-6 lg:px-6 lg:py-6  rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 border border-gray-100"
                  onClick={() => setSelectedIndustry(industry)}
                >
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 mb-4">
                    <span className="text-3xl">{industry.emoji}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 text-center mb-2">
                    {industry.name}
                  </h4>
                  <p className="text-sm text-gray-600 text-center italic">
                    "{industry.tagline}"
                  </p>
                  <div className="mt-3 text-xs text-blue-600 font-medium">
                    Click to learn more →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Detail Modal */}
        {selectedIndustry && (
          <div className="fixed inset-0 bg-[#000000bf] bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] flex flex-col">
              <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedIndustry.emoji}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {selectedIndustry.name}
                      </h3>
                      <p className="text-lg text-blue-600 italic">
                        "{selectedIndustry.tagline}"
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedIndustry(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <IoClose className="text-2xl text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    About Our Solutions
                  </h4>
                  {selectedIndustry.description.map((para, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-3"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Popular Pouch Types
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedIndustry.pouchTypes.map((pouch, index) => {
                      const pouchData = pouchImageMapping[pouch] || {
                        image: "/img/products/3-Side-Seal-Pouch-Main.webp",
                        product: null,
                      };

                      // Generate URL with ID and name if product exists
                      const productUrl = pouchData.product
                        ? createProductUrl(
                          pouchData.product.id,
                          pouchData.product.name
                        )
                        : "/products";

                      return (
                        <Link
                          key={index}
                          to={productUrl}
                          className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 group"
                        >
                          <div className="p-3">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  src={pouchData.image}
                                  alt={pouch}
                                  className="w-16 h-16 object-cover object-center rounded-lg border border-gray-100 group-hover:border-blue-200 transition-colors"
                                  onError={(e) => {
                                    e.target.src =
                                      "/img/products/3-Side-Seal-Pouch-Main.webp";
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-800 font-semibold text-sm truncate group-hover:text-blue-700 transition-colors">
                                    {pouch}
                                  </span>
                                  <IoChevronForwardIcon className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-b-2xl">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Ready to Get Started?
                </h4>
                <p className="text-gray-700 mb-4">
                  Contact our experts to discuss your specific packaging needs
                  for the {selectedIndustry.name.toLowerCase()}.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)]/90 transition-colors font-medium"
                >
                  Get Quote
                  <IoChevronForwardIcon className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default IndustriesWeServe;
