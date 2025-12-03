import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { getProductSEO, getSEOConfig } from "../config/seoConfig";
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
import products from "../api/products";
import RecentlyViewed from "../components/products/recentlyViewed";
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa6";
import EnquiryModal from "../components/modal/enquiryModal";

const SingleProduct = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [expandedIndustry, setExpandedIndustry] = useState(null);
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  // Reorder images so that indices appear as 2,3,4,5,... then 0,1
  const images = [...(product?.img || [])].filter(Boolean);
  const reorderedImages =
    images.length > 2 ? images.slice(2).concat(images.slice(0, 2)) : images;

  // Get SEO config for this product
  const seoConfig = product ? getProductSEO(product) : getSEOConfig("products");

  useEffect(() => {
    if (!productId || !product) return;
    try {
      const key = "recently_viewed_products";
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(parsed) ? parsed : [];
      const withoutCurrent = list.filter((pid) => pid !== productId);
      const updated = [productId, ...withoutCurrent];
      const deduped = Array.from(new Set(updated)).slice(0, 12);
      localStorage.setItem(key, JSON.stringify(deduped));
    } catch {
      // ignore storage errors
    }
  }, [productId, product]);

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
          `${shareText} ${shareUrl}`
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

  // Simple mouse tilt effect for 3D demo placeholder
  // const handleTiltMove = (e) => {
  // 	const bounds = e.currentTarget.getBoundingClientRect();
  // 	const x = e.clientX - bounds.left;
  // 	const y = e.clientY - bounds.top;
  // 	const percentX = (x / bounds.width) * 2 - 1; // -1 to 1
  // 	const percentY = (y / bounds.height) * 2 - 1; // -1 to 1
  // 	const maxTilt = 10; // degrees
  // 	const rotateY = maxTilt * percentX;
  // 	const rotateX = -maxTilt * percentY;
  // 	setTiltStyle({ transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)` });
  // };

  // const handleTiltLeave = () => {
  // 	setTiltStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
  // };

  return (
    <>
      <SEO {...seoConfig} />
      <main className="mx-auto min-h-screen bg-gradient-to-b from-white via-[#fafbfc] to-white">
        {/* Hero */}
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
                <nav aria-label="Breadcrumb" className="mb-8">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--primary-color)]/5 text-[var(--primary-color)] font-medium hover:shadow-md transition-shadow">
                      <IoHomeOutline className="text-lg" />
                      <Link to="/" className="hover:underline">
                        Home
                      </Link>
                    </span>
                    <IoChevronForward className="opacity-40 text-lg" />
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--secondary-color)]/15 to-[var(--secondary-color)]/5 text-[var(--primary-color)] hover:shadow-md transition-all duration-300 font-medium"
                    >
                      <IoApps className="text-lg" />
                      Products
                    </Link>
                    <IoChevronForward className="opacity-40 text-lg" />
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#f1f4fb] to-[#e8ecf7] text-[var(--primary-color)] font-semibold shadow-sm">
                      {product.name}
                    </span>
                  </div>
                </nav>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 text-[var(--primary-color)] shadow-md uppercase tracking-wider">
                  <IoSparklesOutline className="text-base" />
                  Crafted by Amul Packaging
                </span>
                <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[#0056a0]">
                  {product.name}
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
                  <Link
                    to="/products"
                    className="px-8 py-3 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-full hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg font-semibold md:text-lg"
                  >
                    <IoArrowBack className="text-xl" />
                    Back to Products
                  </Link>
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

        {/* Main content */}
        {/* Overview Section */}
        <section className="max-w-7xl mx-auto py-20 px-4">
          <div className="">
            {/* Overview Card */}
            <div className="group bg-white p-10 rounded-3xl shadow-xl border border-gray-100/80 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary-color)] to-[#0056a0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IoListCircle className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="md:text-2xl font-semibold text-[var(--primary-color)]">
                    Overview
                  </h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-[var(--primary-color)] to-[#0056a0] mt-3 rounded-full"></div>
                </div>
              </div>
              {product.Details && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 md:text-lg leading-relaxed">
                    {product.Details}
                  </p>
                   
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 md:text-lg leading-relaxed">
                      {product.About.Description}
                    </p>
                  </div>
                  {product.About.Extended && (
                    <div className="mt-6 border-t-2 border-gray-100 pt-6">
                      <h4 className="text-sm font-semibold text-[var(--primary-color)] uppercase tracking-widest mb-3">
                        📌 Additional Information
                      </h4>
                      <p className="text-gray-600 md:text-lg leading-relaxed">
                        {product.About.Extended}
                      </p>
                    </div>
                  )}
                </div>
              
                </div>
              )}

              {/* Premium Packaging Card */}
            {/* {product.About && (
              <div className="mt-8">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-16 h-16 px-4 rounded-2xl bg-gradient-to-br from-[#FFB703] to-[#ffa500] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IoStar className="text-3xl text-white" />
                  </div>
                  <div>
                    <h3 className="md:text-2xl font-semibold text-[var(--primary-color)]">
                      {product.About.Title}
                    </h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-[#FFB703] to-[#ffa500] mt-3 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 md:text-lg leading-relaxed">
                      {product.About.Description}
                    </p>
                  </div>
                  {product.About.Extended && (
                    <div className="mt-6 border-t-2 border-gray-100 pt-6">
                      <h4 className="text-sm font-semibold text-[var(--primary-color)] uppercase tracking-widest mb-3">
                        📌 Additional Information
                      </h4>
                      <p className="text-gray-600 md:text-lg leading-relaxed">
                        {product.About.Extended}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )} */}
            </div>

            
          </div>
        </section>

        {/* What Is Section */}
        {/* {product.WhatIs && (
          <section className="relative overflow-hidden py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/8 via-[var(--secondary-color)]/5 to-[#ffb703]/8" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-bl from-[var(--primary-color)]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[var(--secondary-color)]/10 to-transparent rounded-full blur-3xl" />
            <div className="relative max-w-7xl mx-auto px-4 py-6">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-lg text-[var(--primary-color)] font-semibold mb-10 border border-[var(--primary-color)]/10 hover:shadow-xl transition-shadow">
                  <IoApps className="text-2xl text-[var(--secondary-color)]" />
                  {product.WhatIs.Title}
                </div>
                <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-[var(--primary-color)]/10 hover:shadow-3xl transition-shadow duration-300">
                  <p className="text-gray-700 leading-7 text-base mb-6">
                    {product.WhatIs.Description}
                  </p>
                  {product.WhatIs.Extra && (
                    <div className="text-gray-700 leading-7 p-6 bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--secondary-color)]/5 rounded-2xl border-l-4 border-[var(--primary-color)] text-base">
                      {typeof product.WhatIs.Extra === 'object' ? (
                        <div>
                          <p className="font-semibold mb-4 text-[var(--primary-color)]">
                            {product.WhatIs.Extra.Title}
                          </p>
                          {Array.isArray(product.WhatIs.Extra.subPoints) && (
                            <ul className="space-y-2">
                              {product.WhatIs.Extra.subPoints.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <span className="text-[var(--primary-color)] font-bold">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          
                          <div className="mt-4 ">
                            <p className="text-left text-sm">{product.WhatIs.Extra.note}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="italic">{product.WhatIs.Extra}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )} */}

        {/* Why Choose Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/5 via-transparent to-[var(--secondary-color)]/5" />
          <div className="relative max-w-7xl mx-auto px-4">
            {product.WhyChoose && (
              <div className="mb-10">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold md:text-xl mb-8 shadow-lg hover:shadow-2xl transition-shadow">
                    <IoStar className="text-3xl" />
                    {product.WhyChoose.Title}
                  </div>
                  {Array.isArray(product.WhyChoose.subfeatures) && (
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {product.WhyChoose.subfeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0078b3] to-[#66994e] flex items-center justify-center text-white group-hover:scale-125 transition-transform duration-300 shadow-md">
                            <IoCheckmarkCircle className="text-2xl" />
                          </span>
                          <span className="text-gray-800 font-medium text-base leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                  {product.WhyChoose.Summary && (
                    <div className="text-center">
                      <p className="text-gray-700 leading-7 max-w-3xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-100/50 text-base">
                        {product.WhyChoose.Summary}
                      </p>
                    </div>
                  )}
                </div>
                {Array.isArray(product.WhyChoose.KeyFeatures) && (
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.WhyChoose.KeyFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0078b3] to-[#66994e] flex items-center justify-center text-white group-hover:scale-125 transition-transform duration-300 shadow-md">
                            <IoCheckmarkCircle className="text-2xl" />
                          </span>
                          <span className="text-gray-800 font-medium text-base leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {product.WhyChoose.Conclusion && (
                  <div className="mt-16 text-center">
                    <div className="text-gray-700 leading-8 max-w-3xl mx-auto bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--secondary-color)]/5 p-10 rounded-3xl border-l-4 border-[var(--primary-color)] italic md:text-lg">
                      {product.WhyChoose.Conclusion}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features Section if no WhyChoose section exists */}
            {!product.WhyChoose &&
              Array.isArray(product.Features) &&
              product.Features.length > 0 && (
                <div className="mb-10">
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold md:text-2xl shadow-lg hover:shadow-2xl transition-shadow">
                      <IoStar className="text-3xl" />
                      Key Features
                    </div>
                  </div>
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.Features.map((feature, index) => (
                      <li
                        key={index}
                        className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0078b3] to-[#66994e] flex items-center justify-center text-white group-hover:scale-125 transition-transform duration-300 shadow-md">
                            <IoCheckmarkCircle className="text-2xl" />
                          </span>
                          <span className="text-gray-800 font-medium md:text-lg leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </section>

        {/* Customization Section */}
        {/* <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/5 via-white to-[var(--secondary-color)]/5" />
          <div className="relative max-w-7xl mx-auto px-4">
            {product.Customization && (
              <div className="mt-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/5 via-white to-[var(--secondary-color)]/5" />
                <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-shadow">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#0078b3] to-[#66994e] text-white font-semibold mb-8 shadow-lg">
                    <IoApps className="text-2xl" />
                    {product.Customization.Title}
                  </div>
                  <p className="text-gray-700 leading-8 mb-10 bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--secondary-color)]/5 p-6 rounded-2xl md:text-lg">
                    {product.Customization.Description}
                  </p>
                  {Array.isArray(product.Customization.Options) && (
                    <div className="mb-10">
                      <h4 className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold mb-6">
                        ⚙️ Customization Options
                      </h4>
                      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {product.Customization.Options.map((option, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 group transition-all duration-300"
                          >
                            <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 flex items-center justify-center group-hover:from-[#0078b3]  group-hover:to-[#66994e] group-hover:text-white transition-all duration-300">
                              <IoListCircle className="text-xl" />
                            </span>
                            <span className="text-gray-700 font-medium">
                              {option}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(
                    product.Customization.PrintingCapabilities
                  ) && (
                    <div className="mb-10">
                      <h4 className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold mb-6">
                        🖨️ Printing Capabilities
                      </h4>
                      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {product.Customization.PrintingCapabilities.map(
                          (capability, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 group transition-all duration-300"
                            >
                              <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 flex items-center justify-center group-hover:from-[#0078b3]  group-hover:to-[#66994e] group-hover:text-white transition-all duration-300">
                                <IoApps className="text-xl" />
                              </span>
                              <span className="text-gray-700 font-medium">
                                {capability}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {product.Customization.PrintingNote && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--secondary-color)]/5 rounded-2xl border-l-4 border-[var(--primary-color)]">
                      <p className="text-gray-700 italic md:text-lg">
                        {product.Customization.PrintingNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section> */}

        {/* Applications by Industry tiles */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h3 className="text-2xl md:text-3xl font-medium mb-12 text-center text-[var(--primary-color)]">
            🏭 Applications by Industry
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {product.Industry?.map((item, idx) => {
              const isExpanded = expandedIndustry === idx;
              const previewCount = 6;

              return (
                <div
                  key={item.name || idx}
                  className="group p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 text-3xl mb-4 group-hover:scale-105 transition-transform duration-300">
                    {item.Icons}
                  </div>

                  {/* Title */}
                  <h4 className="text-[var(--primary-color)] font-semibold uppercase tracking-wider text-base">
                    {item.name}
                  </h4>

                  {/* Short Description */}
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {/* Chips (preview) and expand toggle */}
                  {Array.isArray(item.items) && item.items.length > 0 && (
                    <div className="mt-4 w-full">
                      <div className="flex flex-wrap gap-2">
                        {item.items.slice(0, previewCount).map((chip, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] font-medium"
                          >
                            {chip}
                          </span>
                        ))}

                        {item.items.length > previewCount && !isExpanded && (
                          <button
                            onClick={() => setExpandedIndustry(idx)}
                            className="ml-1 px-3 py-1 text-xs rounded-full bg-transparent border border-[var(--primary-color)]/10 text-[var(--primary-color)] font-medium hover:bg-[var(--primary-color)]/5 focus:outline-none"
                            aria-expanded="false"
                          >
                            +{item.items.length - previewCount} more
                          </button>
                        )}

                        {isExpanded && (
                          <button
                            onClick={() => setExpandedIndustry(null)}
                            className="ml-1 px-3 py-1 text-xs rounded-full bg-transparent border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none"
                            aria-expanded="true"
                          >
                            Collapse
                          </button>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="mt-3">
                          <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                            {item.items.slice(previewCount).map((listItem, itemIdx) => (

                              <li
                                key={itemIdx}
                                className="px-3 py-1 text-xs rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] font-medium"
                              >
                                <span>{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

            {/* Materials Section */}
            {/* {product.MaterialOptions && (
              <div className="mt-12 relative">
                <div className="bg-gradient-to-br from-[#0078b3] to-[#66994e] rounded-2xl p-1">
                  <div className="bg-white rounded-xl p-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold mb-6">
                      <IoStar className="text-xl" />
                      {product.MaterialOptions.Title}
                    </div>
                    {Array.isArray(product.MaterialOptions.Materials) && (
                      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {product.MaterialOptions.Materials.map(
                          (material, index) => {
                            // Handle both object and string formats
                            const materialName = typeof material === 'string' ? material : material.name;
                            const materialIcon = typeof material === 'string' ? null : material.icon;

                            let Icon;
                            // Assign different icons based on material type (for legacy string format)
                            if (!materialIcon) {
                              switch (true) {
                                case /PET|BOPP/.test(materialName):
                                  Icon = IoCubeOutline;
                                  break;
                                case /PE|film/.test(materialName):
                                  Icon = IoLayersOutline;
                                  break;
                                case /Kraft|paper/.test(materialName):
                                  Icon = IoLeafOutline;
                                  break;
                                case /barrier|Foil/.test(materialName):
                                  Icon = IoShieldOutline;
                                  break;
                                default:
                                  Icon = IoSparklesOutline;
                              }
                            }

                            return (
                              <li
                                key={index}
                                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                              >
                                <div className="flex items-center gap-4">
                                  <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 flex items-center justify-center group-hover:from-[#0078b3] group-hover:to-[#66994e] transition-all duration-300 md:text-2xl">
                                    {materialIcon ? (
                                      <span className="text-2xl">{materialIcon}</span>
                                    ) : (
                                      <Icon className="text-2xl text-[var(--primary-color)] group-hover:text-white" />
                                    )}
                                  </span>
                                  <span className="font-medium text-gray-700">
                                    {materialName}
                                  </span>
                                </div>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}
                    {product.MaterialOptions.Note && (
                      <div className="mt-6 p-4 bg-[var(--primary-color)]/5 rounded-xl">
                        <p className="text-gray-700">
                          {product.MaterialOptions.Note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )} */}
        <section className="max-w-7xl mx-auto px-4 py-20">
                  {/* Why Amul Packaging Section */}
            {product.WhyAmulPackaging && (
              <div className="relative overflow-hidden mb-20">
                <div className="relative bg-gradient-to-br from-[#b13675] to-[#2286bb]  text-white rounded-3xl p-10 shadow-2xl">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-[var(--primary-color)] font-semibold md:text-xl shadow-lg">
                      <IoStar className="text-[var(--secondary-color)]" />
                      {product.WhyAmulPackaging.Title}
                    </div>
                  </div>
                  {Array.isArray(product.WhyAmulPackaging.Points) && (
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {product.WhyAmulPackaging.Points.map((point, index) => (
                        <li
                          key={index}
                          className="group bg-white/15 backdrop-blur-md p-6 rounded-2xl hover:bg-white/25 border border-white/20 transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <span className="shrink-0 w-10 h-10 rounded-full bg-white/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <IoCheckmarkCircle className="text-2xl text-white" />
                            </span>
                            <span className="text-white/95 group-hover:text-white ">
                              {point}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {product.WhyAmulPackaging.ClosingLine && (
                    <div className="mt-12 text-center">
                      <p className="inline-block font-medium px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm">
                        {product.WhyAmulPackaging.ClosingLine}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {Array.isArray(product.FAQs) && product.FAQs.length > 0 && (
              <div className="relative overflow-hidden absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/5 via-transparent to-[var(--secondary-color)]/5 py-10">
                <div className="relative">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#0078b3] to-[#66994e] text-white font-semibold md:text-xl shadow-lg">
                      ❓ Frequently Asked
                      Questions
                    </div>
                  </div>
                  <div className="grid gap-5 max-w-4xl mx-auto">
                    {product.FAQs.map((faq, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        <button
                          onClick={() =>
                            setOpenFAQ(openFAQ === index ? null : index)
                          }
                          className="w-full p-7 flex items-center justify-between gap-4 bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--secondary-color)]/5 hover:from-[var(--primary-color)]/10 hover:to-[var(--secondary-color)]/10 transition-all duration-300"
                        >
                          <div className="flex items-center gap-4">
                            <span
                              className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 md:text-xl ${
                                openFAQ === index
                                  ? "bg-gradient-to-br from-[#0078b3] to-[#66994e] text-white"
                                  : "bg-[var(--primary-color)]/15 text-[var(--primary-color)]"
                              }`}
                            >
                              <IoStar />
                            </span>
                            <h4 className="font-semibold text-[var(--primary-color)] text-left  leading-relaxed">
                              {faq.question}
                            </h4>
                          </div>
                          <IoChevronDown
                            className={`md:text-2xl text-[var(--primary-color)] transform transition-transform duration-300 shrink-0 ${
                              openFAQ === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            openFAQ === index ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          <p className="text-gray-700 px-7 py-7 pl-24 md:text-lg leading-relaxed bg-gradient-to-r from-white to-gray-50">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          
        </section>

        {/* Recently Viewed Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20">
          <RecentlyViewed max={4} />
        </section>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
              aria-label="Close image preview"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
            >
              <IoClose className="text-2xl" />
            </button>

            <button
              className="absolute left-4 md:left-8 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                const len = reorderedImages.length;
                setActiveIndex((prev) => (prev - 1 + len) % len);
              }}
            >
              <IoChevronBack className="text-2xl" />
            </button>

            <button
              className="absolute right-4 md:right-8 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                const len = reorderedImages.length;
                setActiveIndex((prev) => (prev + 1) % len);
              }}
            >
              <IoChevronForwardIcon className="text-2xl" />
            </button>

            <div
              className="max-w-5xl w-[90%]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={reorderedImages[activeIndex]}
                alt={`${product.name} large ${activeIndex + 1}`}
                className="w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
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

export default SingleProduct;
