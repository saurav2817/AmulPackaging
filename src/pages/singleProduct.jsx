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
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);
  
  // Reorder images so that indices appear as 2,3,4,5,... then 0,1
  const images = [...(product?.img || [])].filter(Boolean);
  const reorderedImages = images.length > 2
    ? images.slice(2).concat(images.slice(0, 2))
    : images;
  
  // Get SEO config for this product
  const seoConfig = product ? getProductSEO(product) : getSEOConfig('products');

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
      <main className="mx-auto  min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden soft-bg">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-color)] via-[#ffd95a] to-[#ffb703] opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-1 md:order-1">
                <div className="rounded-2xl overflow-hidden ring-1 ring-[#ededed] bg-white">
                  <div className="relative border-b border-[#ededed] p-2">
                    <button
                      className="sp-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary-color)] text-[var(--white)] shadow-lg hover:brightness-110 focus:outline-none"
                      aria-label="Previous image"
                      type="button"
                    >
                      <IoChevronBack className="text-xl" />
                    </button>
                    <button
                      className="sp-next absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary-color)] text-[var(--white)] shadow-lg hover:brightness-110 focus:outline-none"
                      aria-label="Next image"
                      type="button"
                    >
                      <IoChevronForwardIcon className="text-xl" />
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
                            className="w-full h-full object-cover cursor-zoom-in rounded-xl"
                            onClick={() => {
                              setActiveIndex(idx);
                              setIsLightboxOpen(true);
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="mt-3 pt-2 pb-2 bg-white rounded-2xl overflow-hidden ring-1 ring-[#ededed]">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      modules={[FreeMode, Navigation, Thumbs]}
                      spaceBetween={8}
                      slidesPerView={4}
                      freeMode
                      watchSlidesProgress
                      className="w-full"
                    >
                      {reorderedImages.map((src, idx) => (
                        <SwiperSlide key={`thumb-${idx}`}>
                          <div className="border border-[#ededed] p-1 rounded-lg cursor-pointer hover:border-[var(--primary-color)] transition">
                            <img
                              src={src}
                              alt={`${product.name} thumb ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-md"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="order-2 md:order-2 text-center md:text-left">
                <nav aria-label="Breadcrumb" className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoHomeOutline />
                      <Link to="/" className="hover:underline">
                        Home
                      </Link>
                    </span>
                    <IoChevronForward className="opacity-60" />
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--secondary-color)]/20 text-[var(--primary-color)] hover:underline"
                    >
                      Products
                    </Link>
                    <IoChevronForward className="opacity-60" />
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1f4fb] text-[var(--primary-color)] font-medium">
                      {product.name}
                    </span>
                  </div>
                </nav>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 text-[var(--primary-color)] shadow">
                  Crafted by Amul Packaging
                </span>
                <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--primary-color)]">
                  {product.name}
                </h1>
                <div className="mt-5">
                <h3 className=" text-2xl text-gray-700 leading-7 max-w-xl md:max-w-none">
                  {product.Tagline ||
                    "Versatile and space-efficient packaging for maximum shelf visibility."}
                </h3>
                <p className="mt-2 text-gray-700 leading-7 max-w-xl md:max-w-none">
                  {product.HeroText ||
                    "Versatile and space-efficient packaging for maximum shelf visibility."}
                </p>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(true)}
                    className="px-6 py-2 rounded-full font-semibold transition text-[var(--primary-color)] bg-gradient-to-r from-[var(--secondary-color)] via-[#ffd95a] to-[#ffb703] hover:brightness-95 shadow"
                  >
                    Enquire Now
                  </button>
                  <Link
                    to="/products"
                    className="px-6 py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-full hover:bg-[var(--primary-color)] hover:text-[var(--white)] transition flex items-center gap-2 shadow-sm"
                  >
                    <IoArrowBack />
                    Back to Products
                  </Link>
                </div>

                {/* Share Section */}
            <div className="mt-12 flex items-center text-primary gap-3">
              <span className="text-sm font-semibold">Share</span>
              <button
                aria-label="Share on Facebook"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20"
                onClick={() => HandleShare("facebook")}
              >
                <FaFacebook />
              </button>
              <button
                aria-label="Share on Twitter"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20"
                onClick={() => HandleShare("twitter")}
              >
                <FaTwitter />
              </button>
              <button
                aria-label="Share on Pinterest"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20"
                onClick={() => HandleShare("pinterest")}
              >
                <FaPinterest />
              </button>
              <button
                aria-label="Share on Whatsapp"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20"
                onClick={() => HandleShare("whatsapp")}
              >
                <FaWhatsapp />
              </button>
            </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        {/* Overview Section */}
        <section className="max-w-7xl mx-auto py-16 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overview Card */}
            <div className="bg-white p-8 rounded-xl soft-bg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[var(--primary-color)] flex items-center justify-center">
                  <IoListCircle className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--primary-color)]">Overview</h3>
                  <div className="h-0.5 w-12 bg-[var(--primary-color)] mt-2"></div>
                </div>
              </div>
              {product.Details && (
                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    {product.Details}
                  </p>
                </div>
              )}
            </div>

            {/* Premium Packaging Card */}
            {product.About && (
              <div className="bg-white p-8 rounded-xl soft-bg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[var(--primary-color)] flex items-center justify-center">
                    <IoStar className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--primary-color)]">
                      {product.About.Title}
                    </h3>
                    <div className="h-0.5 w-12 bg-[var(--primary-color)] mt-2"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-600">
                      {product.About.Description}
                    </p>
                  </div>
                  {product.About.Extended && (
                    <div className="mt-6 border-t border-gray-100 pt-6">
                      <h4 className="text-sm font-semibold text-[var(--primary-color)] uppercase tracking-wide mb-3">
                        Additional Information
                      </h4>
                      <p className="text-gray-600">
                        {product.About.Extended}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* What Is Section */}
        {product.WhatIs && (
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/10 via-[var(--secondary-color)]/5 to-[#ffb703]/10" />
            <div className="relative max-w-7xl mx-auto px-4 py-16">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md text-[var(--primary-color)] font-semibold mb-8">
                  <IoApps className="text-xl text-[var(--secondary-color)]" />
                  {product.WhatIs.Title}
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-[var(--primary-color)]/10">
                  <p className="text-gray-700 leading-7 mb-4">
                    {product.WhatIs.Description}
                  </p>
                  {product.WhatIs.Extra && (
                    <p className="text-gray-700 leading-7 p-4 bg-[var(--primary-color)]/5 rounded-xl mt-4">
                      {product.WhatIs.Extra}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/5 via-transparent to-[var(--secondary-color)]/5" />
          <div className="relative max-w-7xl mx-auto px-4 py-16">
            {product.WhyChoose && (
              <div className="mb-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold text-xl mb-6">
                    <IoStar className="text-2xl" />
                    {product.WhyChoose.Title}
                  </div>
                  {product.WhyChoose.Summary && (
                    <p className="text-gray-700 leading-7 max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md">
                      {product.WhyChoose.Summary}
                    </p>
                  )}
                </div>
                {Array.isArray(product.WhyChoose.KeyFeatures) && (
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.WhyChoose.KeyFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="group bg-white p-6 rounded-2xl shadow-lg border border-[var(--primary-color)]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#0078b3] to-[#66994e] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <IoCheckmarkCircle className="text-xl" />
                          </span>
                          <span className="text-gray-800">{feature}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {product.WhyChoose.Conclusion && (
                  <div className="mt-12 text-center">
                    <p className="text-gray-700 leading-7 max-w-3xl mx-auto bg-[var(--primary-color)]/5 p-6 rounded-2xl border border-[var(--primary-color)]/10 italic">
                      {product.WhyChoose.Conclusion}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Features Section if no WhyChoose section exists */}
            {!product.WhyChoose && Array.isArray(product.Features) && product.Features.length > 0 && (
              <div className="mb-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold text-xl">
                    <IoStar className="text-2xl" />
                    Key Features
                  </div>
                </div>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.Features.map((feature, index) => (
                    <li
                      key={index}
                      className="group bg-white p-6 rounded-2xl shadow-lg border border-[var(--primary-color)]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#0078b3] to-[#66994e] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <IoCheckmarkCircle className="text-xl" />
                        </span>
                        <span className="text-gray-800">{feature}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* CTA moved to hero */}

            {/* Customization Section */}
            {product.Customization && (
              <div className="mt-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/5 via-white to-[var(--secondary-color)]/5" />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[var(--primary-color)]/10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold mb-6">
                    <IoApps className="text-xl" />
                    {product.Customization.Title}
                  </div>
                  <p className="text-gray-700 leading-7 mb-8 bg-white/80 p-4 rounded-xl">
                    {product.Customization.Description}
                  </p>
                  {Array.isArray(product.Customization.Options) && (
                    <div className="mb-8">
                      <h4 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--secondary-color)] text-[var(--primary-color)] font-semibold mb-4">
                        Customization Options
                      </h4>
                      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {product.Customization.Options.map((option, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                          >
                            <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors">
                              <IoListCircle className="text-lg" />
                            </span>
                            <span className="text-gray-700">{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(product.Customization.PrintingCapabilities) && (
                    <div>
                      <h4 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--secondary-color)] text-[var(--primary-color)] font-semibold mb-4">
                        Printing Capabilities
                      </h4>
                      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {product.Customization.PrintingCapabilities.map((capability, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                          >
                            <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors">
                              <IoApps className="text-lg" />
                            </span>
                            <span className="text-gray-700">{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.Customization.PrintingNote && (
                    <div className="mt-6 p-4 bg-[var(--primary-color)]/5 rounded-xl border border-[var(--primary-color)]/10">
                      <p className="text-gray-700 italic">
                        {product.Customization.PrintingNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

              {/* Applications by Industry tiles */}
        <section className="max-w-7xl mx-auto px-6 py-12 ">
          <div className="max-w-7xl ">
            <h3 className="text-xl md:text-2xl font-bold mb-10 text-center text-primary">
              Applications by Industry
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {product.Industry?.map((item, idx) => (
                <div
                  key={item.name || idx}
                  className="group p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition transform flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-3xl mb-4 group-hover:scale-110 transition">
                    {item.Icons}
                  </div>
                  {/* Title */}
                  <h4 className="text-green-600 font-semibold uppercase tracking-wide text-sm">
                    {item.name}
                  </h4>
                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

            {/* Materials Section */}
            {product.MaterialOptions && (
              <div className="mt-12 relative">
                <div className="bg-gradient-to-br from-[#0078b3] to-[#66994e] rounded-2xl p-1">
                  <div className="bg-white rounded-xl p-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold mb-6">
                      <IoStar className="text-xl" />
                      {product.MaterialOptions.Title}
                    </div>
                    {Array.isArray(product.MaterialOptions.Materials) && (
                      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {product.MaterialOptions.Materials.map((material, index) => {
                          let Icon;
                          // Assign different icons based on material type
                          switch(true) {
                            case /PET|BOPP/.test(material):
                              Icon = IoCubeOutline;
                              break;
                            case /PE|film/.test(material):
                              Icon = IoLayersOutline;
                              break;
                            case /Kraft|paper/.test(material):
                              Icon = IoLeafOutline;
                              break;
                            case /barrier|Foil/.test(material):
                              Icon = IoShieldOutline;
                              break;
                            default:
                              Icon = IoSparklesOutline;
                          }
                          
                          return (
                            <li
                              key={index}
                              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                              <div className="flex items-center gap-4">
                                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 flex items-center justify-center group-hover:from-[#0078b3]  group-hover:to-[#66994e] transition-all duration-300">
                                  <Icon className="text-2xl text-[var(--primary-color)] group-hover:text-white" />
                                </span>
                                <span className="font-medium text-gray-700">{material}</span>
                              </div>
                            </li>
                          );

                        })}
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
            )}

            {/* Why Amul Packaging Section */}
            {product.WhyAmulPackaging && (
              <div className="mt-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/products/pattern-bg.png')] opacity-5" />
                <div className="relative bg-gradient-to-br from-[#0078b3] to-[#66994e] text-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[var(--primary-color)] font-semibold text-xl">
                      <IoStar className="text-[var(--secondary-color)]" />
                      {product.WhyAmulPackaging.Title}
                    </div>
                  </div>
                  {Array.isArray(product.WhyAmulPackaging.Points) && (
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {product.WhyAmulPackaging.Points.map((point, index) => (
                        <li
                          key={index}
                          className="group bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-colors duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <span className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <IoCheckmarkCircle className="text-[var(--secondary-color)]" />
                            </span>
                            <span className="text-white/90 group-hover:text-white">{point}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {product.WhyAmulPackaging.ClosingLine && (
                    <div className="mt-8 text-center">
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
              <div className="mt-16 relative overflow-hidden py-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/5 via-transparent to-[var(--secondary-color)]/5" />
                <div className="relative">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#b13675] to-[#2286bb] text-white font-semibold text-xl">
                      <IoListCircle className="text-2xl" />
                      Frequently Asked Questions
                    </div>
                  </div>
                  <div className="grid gap-4 max-w-3xl mx-auto">
                    {product.FAQs.map((faq, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg border border-[var(--primary-color)]/10 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                          className="w-full p-6 flex items-center justify-between gap-4 bg-[var(--primary-color)]/5 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-4">
                            <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              openFAQ === index 
                                ? 'bg-gradient-to-br from-[#0078b3] to-[#66994e] text-white'
                                : 'bg-[var(--primary-color)]/10 text-[var(--primary-color)]'
                            }`}>
                              <IoStar className="text-lg" />
                            </span>
                            <h4 className="font-semibold text-[var(--primary-color)] text-left">
                              {faq.question}
                            </h4>
                          </div>
                          <IoChevronDown className={`text-xl text-[var(--primary-color)] transform transition-transform duration-300 ${
                            openFAQ === index ? 'rotate-180' : ''
                          }`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${
                          openFAQ === index ? 'max-h-96' : 'max-h-0'
                        }`}>
                          <p className="text-gray-700 px-6 py-6 pl-20">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            

          </div>
        </section>

      

        <section className="relative overflow-hidden soft-bg">
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
