import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  IoLayersOutline,
  IoShieldOutline,
  IoLeafOutline,
  IoSparklesOutline,
  IoCubeOutline,
  IoChevronDown,
} from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import products from "../../api/products";
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa6";
import EnquiryModal from "../../components/modal/enquiryModal";

const StandupZipperPouch = () => {
  const product = products.find((p) => p.name === "Standup Zipper Pouch");

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const faqItems = [
    {
      id: "food-safe",
      question: "Are stand up pouches food-safe?",
      answer:
        "Yes, we use certified, food-grade materials that are safe for direct food contact.",
    },
    {
      id: "logo-printing",
      question: "Can I print my logo and design?",
      answer:
        "Yes, we offer full stand up pouch printing services including rotogravure, flexographic, and digital printing options.",
    },
    {
      id: "wholesale-pricing",
      question: "Do you offer wholesale pricing?",
      answer:
        "Yes, we supply stand up pouches wholesale with competitive rates for bulk orders.",
    },
    {
      id: "moq",
      question: "What is the minimum order quantity?",
      answer:
        "MOQ depends on size, material, and print type. Contact us for details specific to your requirement.",
    },
    {
      id: "samples",
      question: "Can I get sample pouches?",
      answer:
        "Yes, samples can be arranged before bulk orders so you can evaluate quality and fit before committing.",
    },
  ];

  // Reorder images so that indices appear as 2,3,4,5,... then 0,1
  const images = [...(product?.img || [])].filter(Boolean);
  const reorderedImages =
    images.length > 2 ? images.slice(2).concat(images.slice(0, 2)) : images;

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-lg">Product not found.</p>
        <Link
          to="/products"
          className="mt-6 inline-block text-[var(--primary-color)] underline"
        >
          Back to products
        </Link>
      </main>
    );
  }

  const HandleShare = async (platform) => {
    const shareUrl = window.location.href;
    const shareTitle = product?.name || document.title;
    const shareText = `Check out ${shareTitle}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    const productImage =
      [product?.img, product?.hoverImg].filter(Boolean)[0] || "";
    const encodedImage = encodeURIComponent(productImage);

    let urlToOpen = "";

    switch (platform) {
      case "facebook":
        urlToOpen = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        urlToOpen = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "pinterest":
        urlToOpen = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedText}`;
        break;
      case "whatsapp":
        urlToOpen = `https://wa.me/?text=${encodeURIComponent(
          `${shareText} ${shareUrl}`,
        )}`;
        break;
      default:
        break;
    }

    if (urlToOpen) {
      window.open(urlToOpen, "_blank", "noopener,noreferrer");
      return;
    }
  };

  return (
    <>
      <main className="mx-auto min-h-screen bg-gradient-to-b from-white via-[#fafbfc] to-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-color)]/20 via-[#ffd95a]/15 to-[#ffb703]/20 opacity-60" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#ffb703]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[var(--primary-color)]/10 to-transparent rounded-full blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-1 md:order-1 animate-fade-in">
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-white border border-white/50 backdrop-blur-xl">
                  <div className="relative border-b border-gray-100 p-3 bg-gradient-to-b from-white to-gray-50">
                    <button
                      className="sp-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[#0056a0] text-white shadow-lg hover:shadow-2xl hover:scale-110 focus:outline-none transition-all duration-300"
                      aria-label="Previous image"
                      type="button"
                    >
                      <IoChevronBack className="text-2xl" />
                    </button>
                    <button
                      className="sp-next absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[#0056a0] text-white shadow-lg hover:shadow-2xl hover:scale-110 focus:outline-none transition-all duration-300"
                      aria-label="Next image"
                      type="button"
                    >
                      <IoChevronForwardIcon className="text-2xl" />
                    </button>

                    <Swiper
                      modules={[FreeMode, Navigation, Thumbs]}
                      navigation={{ nextEl: ".sp-next", prevEl: ".sp-prev" }}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      spaceBetween={10}
                      className="w-full h-full"
                      onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                    >
                      {reorderedImages.map((src, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={src}
                            alt={`${product.name} ${idx + 1}`}
                            className="w-full h-full object-cover cursor-zoom-in rounded-2xl hover:scale-105 transition-transform duration-300"
                            onClick={() => {
                              setActiveIndex(idx);
                              setIsLightboxOpen(true);
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="mt-4 pt-3 pb-3 bg-gradient-to-b from-white to-gray-50 rounded-3xl overflow-hidden shadow-md border border-gray-100">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      modules={[FreeMode, Navigation, Thumbs]}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode
                      watchSlidesProgress
                      className="w-full"
                    >
                      {reorderedImages.map((src, idx) => (
                        <SwiperSlide key={`thumb-${idx}`}>
                          <div className="border-2 border-gray-200 p-2 rounded-xl cursor-pointer hover:border-[var(--primary-color)] transition-all duration-300 hover:shadow-md">
                            <img
                              src={src}
                              alt={`${product.name} thumb ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="order-2 md:order-2 text-center md:text-left animate-fade-in animation-delay-100">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 text-[var(--primary-color)] shadow-md uppercase tracking-wider">
                  <IoSparklesOutline className="text-base" />
                  Crafted by Amul Packaging
                </span>
                <h1 className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[#0056a0]">
                  Stand up Pouch Manufacturer in Bhiwandi | Stronger, Fresher
                  Pouches
                </h1>
                <div className="mt-6 space-y-3">
                  <h3 className=" md:text-2xl text-gray-700 leading-7 max-w-xl md:max-w-none">
                    {product.Tagline ||
                      "Versatile and space-efficient packaging for maximum shelf visibility."}
                  </h3>
                  <p className="mt-2 text-gray-700 leading-7 max-w-xl md:max-w-none">
                    {product.HeroText ||
                      "Versatile and space-efficient packaging for maximum shelf visibility."}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(true)}
                    className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 text-white bg-gradient-to-r from-[var(--primary-color)] via-[#0078b3] to-[var(--primary-color)] hover:shadow-2xl hover:scale-105 active:scale-95 shadow-lg"
                  >
                    ✨ Enquire Now
                  </button>
                </div>

                {/* Share Section */}
                <div className="mt-12 flex flex-col items-center md:items-start">
                  <span className="text-sm font-semibold uppercase tracking-widest text-[var(--primary-color)] mb-4">
                    🔗 Share This Product
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      aria-label="Share on Facebook"
                      className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#4267B2] to-[#2d4a7b] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                      onClick={() => HandleShare("facebook")}
                    >
                      <FaFacebook className="text-xl" />
                    </button>
                    <button
                      aria-label="Share on Twitter"
                      className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#1a7db8] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                      onClick={() => HandleShare("twitter")}
                    >
                      <FaTwitter className="text-xl" />
                    </button>
                    <button
                      aria-label="Share on Pinterest"
                      className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#E60023] to-[#a80520] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                      onClick={() => HandleShare("pinterest")}
                    >
                      <FaPinterest className="text-xl" />
                    </button>
                    <button
                      aria-label="Share on Whatsapp"
                      className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#1a9c4a] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                      onClick={() => HandleShare("whatsapp")}
                    >
                      <FaWhatsapp className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
          {/* Decorative Background Blur */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="text-justify">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                  <IoListCircle className="text-3xl" />
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    About Our Stand Up Zipper Pouch
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mt-3 rounded-full"></div>
                </div>
              </div>

              {/* Content */}
              <div className="">
                {/* Left Column */}
                <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                  <p>
                    At{" "}
                    <span className="font-semibold text-gray-800">
                      Amul Packaging
                    </span>
                    , we make high-quality stand up pouches designed to protect
                    your product, keep it fresh, and help your brand look strong
                    on the shelf. Whether you sell snacks, spices, pet food,
                    cosmetics, or supplements — our Stand up Pouch manufacturer
                    in bhiwandi packaging solutions help your product speak for
                    itself.
                  </p>
                </div>

                {/* Right Column */}
                <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Standup zipper pouches are a modern, flexible packaging
                    solution designed to keep products fresh, secure, and
                    visually appealing. With a stable base, they stand upright
                    on shelves, ensuring better visibility and brand presence.
                    Our team manufactures and prints custom stand up pouches in
                    different materials, sizes, colors, and finishes. With
                    durable laminated structure, secure zipper, and strong base,
                    our pouches are built for performance and made to highlight
                    your brand clearly.
                  </p>

                  <p>
                    Flexible, durable, and designed to perform — our Standup
                    Zipper Pouches ensure your products stay protected and your
                    brand stays visible. As a leading Packaging Pouch
                    manufacturer in mumbai with 30+ years of expertise in
                    rotogravure, flexographic, and digital printing, we deliver
                    packaging that performs and impresses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  Why Choose Our Standup Zipper Pouch? start */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute inset-0 " />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 md:p-14 ">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#679a4f] to-[#0074b1] text-white shadow-lg">
                  <IoCheckmarkCircle className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Why Choose Our Standup Zipper Pouch?
                  </h2>
                  <div className="w-20 h-1 bg-[var(--primary-color)] mt-3 rounded-full" />
                  <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-2xl">
                    Our standup zipper pouches come loaded with features that
                    protect your product and elevate your brand on the shelf.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-base md:text-lg leading-relaxed">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <IoShieldOutline className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>
                      Secure zipper lock — open and reseal multiple times.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoLayersOutline className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>
                      Laminated film structure for strength and barrier
                      protection.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoSparklesOutline className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>
                      Blocks moisture, oxygen, dust, and aroma leakage.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoShieldOutline className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>Leak-proof and tamper-resistant options.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoLeafOutline className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>Food-grade, safe, and durable materials.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoCubeOutline className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>
                      Lightweight and takes minimal space during transport.
                    </span>
                  </li>
                </ul>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <IoSparklesOutline className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>
                      Available in matte, glossy, metallic, kraft, and
                      transparent finishes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoApps className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>Clear window pouches available.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoStar className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>Full printing and custom branding support.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoListCircle className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>Multiple sizes and shapes available.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IoSparklesOutline className="mt-1 text-[var(--primary-color)] text-xl" />
                    <span>Digital Printed pouch manufacturer in mumbai.</span>
                  </li>
                </ul>
              </div>

              <p className="mt-10 text-gray-700 text-lg leading-relaxed">
                These features make our stand up zipper bags ideal for brands
                that care about product safety and appearance.
              </p>
            </div>
          </div>
        </section>
        {/* Why Choose Our Standup Zipper Pouch? end */}

        {/* Stand Up Pouch Printing & Customization Options start */}
        <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-25" />
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-25" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-color)] to-[#0074b1] text-white shadow-lg">
                  <IoLayersOutline className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Stand Up Pouch Printing &amp; Customization Options
                  </h2>
                  <div className="w-24 h-1 bg-[var(--primary-color)] mt-3 rounded-full" />
                  <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-3xl">
                    We help you design packaging that looks good, feels premium,
                    and clearly communicates your product value. Our
                    customization options include:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-gray-700 text-base md:text-lg leading-relaxed">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-blue-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                        <IoCubeOutline className="text-xl" />
                      </div>
                      <p className="font-semibold text-gray-900">
                        Size &amp; Thickness
                      </p>
                    </div>
                    <p>Size and thickness as per your product requirement.</p>
                  </div>

                  <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-amber-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                        <IoApps className="text-xl" />
                      </div>
                      <p className="font-semibold text-gray-900">Base Shape</p>
                    </div>
                    <p>Base shape customization.</p>
                  </div>

                  <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-green-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                        <IoLayersOutline className="text-xl" />
                      </div>
                      <p className="font-semibold text-gray-900">
                        Material Combination
                      </p>
                    </div>
                    <p>Material combination — PET, BOPP, PE, Kraft, Foil.</p>
                  </div>

                  <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-purple-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                        <IoSparklesOutline className="text-xl" />
                      </div>
                      <p className="font-semibold text-gray-900">
                        Window Design
                      </p>
                    </div>
                    <p>Window area and shape.</p>
                  </div>

                  <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-rose-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                        <IoStar className="text-xl" />
                      </div>
                      <p className="font-semibold text-gray-900">
                        Printing &amp; Finish
                      </p>
                    </div>
                    <p>Printing style and finishes.</p>
                  </div>

                  <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-teal-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                        <IoChevronDown className="text-xl" />
                      </div>
                      <p className="font-semibold text-gray-900">Zipper Type</p>
                    </div>
                    <p>Zipper type.</p>
                  </div>

                  <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-indigo-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                        <IoCubeOutline className="text-xl" />
                      </div>
                      <p className="font-semibold text-gray-900">
                        Spout Option
                      </p>
                    </div>
                    <p>Spout option.</p>
                  </div>

                  <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-yellow-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                        <IoListCircle className="text-xl" />
                      </div>
                      <p className="font-semibold text-gray-900">
                        Tear-notch &amp; Punch
                      </p>
                    </div>
                    <p>Tear-notch and punch options.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-[var(--primary-color)]/10 bg-gradient-to-br from-[var(--primary-color)]/5 via-white to-[#e0f2ff] p-6 shadow-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-xs font-semibold uppercase tracking-widest text-[var(--primary-color)] mb-4">
                      <IoSparklesOutline className="text-sm" />
                      Printing Capabilities
                    </div>
                    <p className="text-gray-700">
                      We provide Rotogravure, Flexographic, and Digital printing
                      solutions tailored to different packaging needs.
                    </p>
                    <p className="mt-3 text-gray-700">
                      You get sharp color, high clarity images, and durable
                      print that does not fade or scratch easily.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-[var(--primary-color)] border border-[var(--primary-color)]/20">
                        Rotogravure
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-[var(--primary-color)] border border-[var(--primary-color)]/20">
                        Flexographic
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-[var(--primary-color)] border border-[var(--primary-color)]/20">
                        Digital Printing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-sky-50 overflow-hidden">
          <div className="absolute -top-10 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-20" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 md:p-14 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-color)] to-[#679a4f] text-white shadow-lg">
                  <IoApps className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Applications - Packaging Pouch manufacturer in mumbai
                  </h2>
                  <div className="w-24 h-1 bg-[var(--primary-color)] mt-3 rounded-full" />
                  <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-3xl">
                   Our standup zipper pouches are trusted across a wide range of product categories:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-base md:text-lg leading-relaxed">
                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-amber-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoCubeOutline className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Dry Fruits &amp; Snacks</p>
                  </div>
                  <p>Dry fruits, nuts, and snacks.</p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-green-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoLeafOutline className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Spices &amp; Staples</p>
                  </div>
                  <p>Spices, pulses, and cereals.</p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-blue-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoSparklesOutline className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Beverage Powders</p>
                  </div>
                  <p>Tea, coffee, and powdered products.</p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-rose-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoStar className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Confectionery &amp; Bakery</p>
                  </div>
                  <p>Confectionery and bakery items.</p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-emerald-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoListCircle className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Pet Food &amp; Nutrition</p>
                  </div>
                  <p>Pet food and nutritional products.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
          <div className="absolute -top-10 left-0 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-20" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-color)] to-[#679a4f] text-white shadow-lg">
                  <IoLayersOutline className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Industries We Serve
                  </h2>
                  <div className="w-24 h-1 bg-[var(--primary-color)] mt-3 rounded-full" />
                  <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-3xl">
                    From everyday food products to specialized industrial applications, our stand up zipper pouches are engineered to protect, present, and perform across multiple industries.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-base md:text-lg leading-relaxed">
                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-amber-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoStar className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Food &amp; Beverage</p>
                  </div>
                  <p>
                    Airtight seal maintains freshness and protects taste and aroma. Ideal for snacks and chips, coffee and tea, spices and masalas, dry fruits and nuts, biscuits and cookies, protein powder, confectionery and chocolates, frozen food, juices (spout pouches), and ready-to-eat mixes.
                  </p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-emerald-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoListCircle className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Pet Food</p>
                  </div>
                  <p>
                    Perfect for dry dog food, cat treats, fish, and bird feed. High-barrier standup pouches keep pet food fresh and protect it from moisture and contamination.
                  </p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-rose-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoSparklesOutline className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Cosmetics &amp; Personal Care</p>
                  </div>
                  <p>
                    Gives a clean, premium look and saves shipping weight. Used for bath salts, face masks, dry shampoo, lotion refills, and powder and beauty products.
                  </p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-indigo-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoCubeOutline className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Nutraceuticals &amp; Pharma</p>
                  </div>
                  <p>
                    Strong barrier layers protect sensitive ingredients including supplements, vitamins, capsules and powders, and herbal products.
                  </p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-slate-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoShieldOutline className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">Household &amp; Industrial</p>
                  </div>
                  <p>
                    Moisture barrier keeps products safe and intact for cleaning powder, detergents, industrial components, adhesives, and small hardware.
                  </p>
                </div>

                <div className="h-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-teal-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoApps className="text-xl" />
                    </div>
                    <p className="font-semibold text-gray-900">E-commerce &amp; Retail</p>
                  </div>
                  <p>
                    Many D2C brands prefer stand up pouches for branding and easy handling. Ideal for subscription boxes, retail products, and online store packaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-sky-50 overflow-hidden">
          <div className="absolute -top-10 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-20" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl border border-gray-100 p-8 md:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-color)]/5 text-[var(--primary-color)] text-xs font-semibold uppercase tracking-widest">
                    <IoSparklesOutline className="text-sm" />
                    Why Choose Amul Packaging
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  For Stand Up Zipper Pouches?
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Your product stays protected and looks premium at the same time
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-amber-50 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                          <IoCheckmarkCircle className="text-lg" />
                        </span>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          In-house manufacturing
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-emerald-50 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                          <IoCheckmarkCircle className="text-lg" />
                        </span>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          Quality-checked material
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-sky-50 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                          <IoCheckmarkCircle className="text-lg" />
                        </span>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          Food-safe certified supplies
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-rose-50 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                          <IoCheckmarkCircle className="text-lg" />
                        </span>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          Bulk and wholesale availability
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-amber-50 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                          <IoCheckmarkCircle className="text-lg" />
                        </span>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                         Fast turnaround
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-emerald-50 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                          <IoCheckmarkCircle className="text-lg" />
                        </span>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          Sharp colors and premium finish
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-sky-50 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                          <IoCheckmarkCircle className="text-lg" />
                        </span>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          Professional printing support
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-rose-50 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                          <IoCheckmarkCircle className="text-lg" />
                        </span>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                         Decades of packaging experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {faqItems.map((item) => {
                      const isOpen = openFAQ === item.id;
                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-gray-200 bg-white shadow-sm"
                        >
                          <button
                            type="button"
                            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                            onClick={() =>
                              setOpenFAQ(isOpen ? null : item.id)
                            }
                          >
                            <span className="font-semibold text-gray-900">
                              {item.question}
                            </span>
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            >
                              <IoChevronDown className="text-lg" />
                            </span>
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-4 text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-100">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
         {/* Enquiry Modal */}
        <EnquiryModal
          open={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          product={product}
        />
      </main>
    </>
  );
};

export default StandupZipperPouch;
