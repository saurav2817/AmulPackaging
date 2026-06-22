import React, { useState } from "react";
import {
  IoListCircle,
  IoCheckmarkCircle,
  IoLayersOutline,
  IoShieldOutline,
  IoLeafOutline,
  IoSparklesOutline,
  IoCubeOutline,
  IoChevronDown,
  IoApps,
  IoStar,
  IoArrowBack,
  IoClose,
  IoChevronBack,
  IoChevronForward as IoChevronForwardIcon,
} from "react-icons/io5";
import EnquiryModal from "../../components/modal/enquiryModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa6";
import SchemaInjector from "../../seo/SchemaInjector";

const PillowPouch = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const pillowPouchImages = [
    "../img/pillowpouch.png",
    "../img/pillowpouch2.png",
    "../img/pillowpouch3.png",
    // Add more image URLs here if needed
  ];

  const HandleShare = async (platform) => {
    const shareUrl = window.location.href;
    const shareTitle =
      "Pillow Pouch Manufacturer in India for Custom Printed Packaging"; // Static title for now
    const shareText = `Check out ${shareTitle}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    const productImage = pillowPouchImages[0] || ""; // Use the first image as the product image
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

  const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Pillow Pouch Manufacturing",
  "name": "Pillow Pouch",
  "description": "Get durable, cost-effective pillow pouch (centre seal) packaging for food, snacks, spices, powders, FMCG, and industrial products with custom printing from Amul Packaging.",
  "url": "https://www.amulpackaging.in/services/pillow-pouch",
  "image": "https://www.amulpackaging.in/img/pillowpouch.png",
  "provider": {
    "@type": "Organization",
    "name": "Amul Packaging",
    "url": "https://www.amulpackaging.in"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Pillow Pouch used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Pillow Pouch is used for packing food, snacks, spices, flour, powders, FMCG products, household items, pet food, and other retail products that need lightweight and secure flexible packaging."
      }
    },
    {
      "@type": "Question",
      "name": "Is a Pillow Pouch the same as a centre seal pouch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A Pillow Pouch is commonly called a centre seal pouch, back seal pouch, or T-seal pouch because the main seal runs vertically at the back of the pack."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get custom printed packaging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Amul Packaging provides custom printed pouch solutions with your brand logo, colours, product details, artwork, barcode, and required packaging information."
      }
    },
    {
      "@type": "Question",
      "name": "Which material is best for this type of pouch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best material depends on your product. Food items, powders, spices, snacks, and frozen products may need different laminate structures for moisture control, aroma protection, strength, or display quality."
      }
    },
    {
      "@type": "Question",
      "name": "Is this pouch suitable for food packaging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it is widely used for food packaging. The final suitability depends on the selected material, sealing requirement, product type, and storage conditions."
      }
    },
    {
      "@type": "Question",
      "name": "How can I get a quote?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can share your product name, pouch size, quantity, artwork requirement, and material preference with Amul Packaging. Our team will review your requirement and suggest a suitable packaging solution."
      }
    }
  ]
};

const faqItems = [
  {
    id: "used-for",
    question: "What is a Pillow Pouch used for?",
    answer:
      "A Pillow Pouch is used for packing food, snacks, spices, flour, powders, FMCG products, household items, pet food, and other retail products that need lightweight and secure flexible packaging.",
  },
  {
    id: "same-as-centre",
    question: "Is a Pillow Pouch the same as a centre seal pouch?",
    answer:
      "Yes. A Pillow Pouch is commonly called a centre seal pouch, back seal pouch, or T-seal pouch because the main seal runs vertically at the back of the pack.",
  },
  {
    id: "custom-print",
    question: "Can I get custom printed packaging?",
    answer:
      "Yes. Amul Packaging provides custom printed pouch solutions with your brand logo, colours, product details, artwork, barcode, and required packaging information.",
  },
  {
    id: "which-material",
    question: "Which material is best for this type of pouch?",
    answer:
      "The best material depends on your product. Food items, powders, spices, snacks, and frozen products may need different laminate structures for moisture control, aroma protection, strength, or display quality.",
  },
  {
    id: "suitable",
    question: "Is this pouch suitable for food packaging?",
    answer:
      "Yes, it is widely used for food packaging. The final suitability depends on the selected material, sealing requirement, product type, and storage conditions.",
  },
  {
    id: "quote",
    question: "How can I get a quote?",
    answer:
      "You can share your product name, pouch size, quantity, artwork requirement, and material preference with Amul Packaging. Our team will review your requirement and suggest a suitable packaging solution.",
  },
];

  return (
    <>
      <SchemaInjector data={serviceSchema} />
      <SchemaInjector data={faqSchema} />
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
                      {pillowPouchImages.map((src, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={src}
                            alt={`Pillow Pouch ${idx + 1}`}
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
                      {pillowPouchImages.map((src, idx) => (
                        <SwiperSlide key={`thumb-${idx}`}>
                          <div className="border-2 border-gray-200 p-2 rounded-xl cursor-pointer hover:border-[var(--primary-color)] transition-all duration-300 hover:shadow-md">
                            <img
                              src={src}
                              alt={`Pillow Pouch thumb ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-1 text-center md:text-left">
                <h1 className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[#0056a0]">
                  Pillow Pouch Manufacturer in India for Custom Printed
                  Packaging
                </h1>
                <h3 className="mt-6 md:text-2xl text-gray-700 leading-7 max-w-xl">
                  Durable, attractive, and cost-effective centre seal packaging.
                </h3>

                <p className="mt-4 text-gray-700 leading-7 max-w-2xl">
                  A Pillow Pouch is also known as a centre seal pouch, back seal
                  pouch, or T-seal pouch. It has a strong seal running at the
                  back, along with top and bottom sealing, creating a compact
                  pillow-like shape after filling.
                </p>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(true)}
                    className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 text-white bg-gradient-to-r from-[var(--primary-color)] via-[#0078b3] to-[var(--primary-color)]"
                  >
                    Enquire Now
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

        <section className="relative py-12 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-justify">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                  <IoListCircle className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Overview
                  </h2>
                </div>
              </div>

              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  The right packaging does more than hold a product. It protects
                  freshness, supports transport, improves shelf visibility, and
                  gives customers confidence before they even open the pack.
                  This pouch format works well for these needs because it
                  balances strength, flexibility, appearance, and production
                  efficiency.
                </p>

                <p>
                 At <a className="text-[#155dfc]" href="https://www.amulpackaging.in/" target="_blank" rel="noopener noreferrer"> Amul Packaging</a>, we produce laminated and custom printed
                  packaging that can be designed around your product size,
                  weight, shelf-life requirement, branding, and filling process.
                  Our focus is to deliver packaging that looks clean, seals
                  properly, and performs consistently in real business
                  conditions. From small retail packs to larger quantity
                  packing, our team supports brands with practical packaging
                  guidance and manufacturing quality.
                </p>

                <p>
                  This pouch style is especially useful when your product needs
                  a secure pack that is lightweight, space-saving, and suitable
                  for automated or semi-automated filling. This format can be
                  made in different material combinations depending on whether
                  your product needs moisture resistance, aroma protection,
                  light barrier, puncture resistance, or attractive printing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#679a4f] to-[#0074b1] text-white shadow-lg">
                  <IoCheckmarkCircle className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    What Is a Pillow Pouch?
                  </h2>
                </div>
              </div>

              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  A Pillow Pouch is a flexible packaging pouch formed with a
                  vertical seal at the back and horizontal seals at the top and
                  bottom. Once filled, it takes a soft rectangular shape that
                  resembles a pillow. This design is common in packaged foods,
                  snacks, spices, powders, grains, confectionery, frozen
                  products, and many everyday retail items.
                </p>

                <p>
                  The main advantage of this packaging format is its simplicity.
                  It uses material efficiently, supports quick filling, and
                  gives enough printable space for branding, product details,
                  nutrition information, barcodes, ingredients, and other
                  mandatory details. Because of this, many manufacturers prefer
                  it for both high-speed and cost-sensitive packaging.
                </p>

                <p>
                  For brands looking for a practical option, a Pillow Pouch
                  offers the right combination of protection and presentation.
                  It can be made with transparent, metallized, or printed
                  laminated films based on the product’s storage needs and
                  visual style.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Why Choose <a className="text-[#155dfc]" href="https://www.amulpackaging.in/products/4/centre-seal-pouch" target="_blank" rel="noopener noreferrer"> Pillow Pouch Packaging? </a>
              </h2>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  Businesses choose this packaging because it is reliable,
                  affordable, and suitable for many product categories. The back
                  seal keeps the product enclosed securely, while the front and
                  back surfaces provide good space for branding. This makes it
                  ideal for products that need both protection and attractive
                  shelf presence.
                </p>

                <p>
                  Another benefit is packing efficiency. The structure works
                  well with roll stock films and filling machines, helping
                  brands maintain speed and consistency during production. It
                  also reduces unnecessary packaging bulk, making storage and
                  transport easier.
                </p>

                <p>
                  For food and FMCG brands, this format can help maintain
                  product freshness when the right laminate is selected.
                  Depending on the material structure, the pouch can protect
                  against moisture, dust, aroma loss, oil migration, and
                  external handling damage. With good printing and finishing,
                  the same pack can also create a premium look on retail
                  shelves.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 md:p-14">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-color)] to-[#0074b1] text-white shadow-lg">
                  <IoLayersOutline className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Applications and Product Uses
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base md:text-lg leading-relaxed">
                <div>
                  <p>
                    Amul Packaging supplies centre seal options for a wide range
                    of industries. In food packaging, it is commonly used for
                    namkeen, wafers, chips, biscuits, cookies, chocolates,
                    candies, pasta, noodles, grains, pulses, flour, sugar, salt,
                    dry fruits, tea, coffee, masala, spice powders, and
                    ready-to-cook mixes.
                  </p>
                </div>
                <div>
                  <p>
                    For FMCG and household products, the same format can be used
                    for detergent powder, cleaning products, agarbatti, personal
                    care items, refill packs, and dry utility goods. It is also
                    suitable for pharma support products, industrial components,
                    pet food, seeds, and small retail items that require neat
                    packing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 bg-gradient-to-br from-white via-gray-50 to-sky-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl border border-gray-100 p-8 md:p-10 lg:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Custom Printed Pillow Pouch Solutions
              </h3>
              <div className="mt-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Your packaging is often the first brand touchpoint for your
                  customer. A well-designed pack helps your product look
                  professional, trustworthy, and easy to identify. Amul
                  Packaging offers custom printed Pillow Pouch solutions that
                  can be created according to your brand colours, logo, artwork,
                  product information, and market positioning.
                </p>

                <p>
                  We can support packaging for simple everyday products as well
                  as premium retail brands. The print area can be used for
                  product name, brand story, benefits, ingredients, usage
                  instructions, nutrition panel, manufacturing details, MRP, QR
                  code, barcode, and promotional messages.
                </p>

                <p>
                  You can choose from different finishes such as glossy, matte,
                  transparent window-based designs, metallized appearance, or a
                  clean laminated look depending on your product category. Good
                  design and clear printing can make a major difference,
                  especially in competitive categories like snacks, spices, dry
                  fruits, tea, coffee, and FMCG products.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 md:p-14">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Material and Lamination Options
              </h3>
              <div className="text-gray-700 text-lg leading-relaxed">
                <p>
                  The performance of any pouch depends on the material structure
                  used. This pack can be made using different laminate
                  combinations based on the protection needed by the product.
                  Common structures may include PET, BOPP, CPP, LDPE, MET PET,
                  and other suitable laminated films depending on application,
                  compatibility, and barrier requirement.
                </p>

                <p>
                  For products sensitive to moisture, a moisture-resistant
                  structure may be recommended. For products where aroma,
                  flavour, or freshness is important, a suitable barrier
                  laminate can help maintain quality for longer. For products
                  that need stronger shelf impact, metallized or high-quality
                  printed films can be selected.
                </p>

                <p>
                  The final structure should be chosen after understanding the
                  product type, filling process, storage conditions, transport
                  requirements, weight, and branding needs. At Amul Packaging,
                  we focus on practical packaging selection so that the pouch is
                  not only attractive but also fit for its intended purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 md:p-14">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Printing and Finishing Quality
              </h3>
              <div className="text-gray-700 text-lg leading-relaxed">
                <p>
                  A good pack should look sharp and feel dependable. Our
                  printing and finishing approach is designed to help brands
                  achieve clear visuals, readable product information, and
                  consistent packaging output. Whether your artwork is bold,
                  minimal, colourful, or premium, we aim to maintain print
                  clarity and clean presentation.
                </p>

                <p>
                  The outer finish can be planned according to your market
                  segment. Glossy finishes often work well for bright retail
                  products. Matte finishes create a softer, premium appearance.
                  Transparent sections can help customers see the product
                  inside. Metallized looks can improve shelf impact and barrier
                  performance when suitable.
                </p>

                <p>
                  For every Pillow Pouch, print design should be planned with
                  enough space for seal areas, cutting margins, batch coding,
                  and product information. This avoids design loss during
                  packing and gives the final pouch a balanced look.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 md:p-14">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
               <a className="text-[#155dfc]" href="https://maps.app.goo.gl/n1vzNBjfbmoEgoKF6" target="_blank" rel="noopener noreferrer"> Quality Checks and Packaging </a> Performance
              </h3>
              <div className="text-gray-700 text-lg leading-relaxed">
                <p>
                  Packaging failure can affect product quality, customer trust,
                  and brand reputation. That is why quality matters at every
                  step. At Amul Packaging, we focus on pouch strength, clean
                  sealing, laminate bonding, print alignment, material
                  consistency, and overall finish.
                </p>

                <p>
                  A well-made Pillow Pouch should seal properly, hold the
                  product safely, and maintain its appearance during handling
                  and display. The pack should not look weak, loose, or poorly
                  finished. For food and retail products, the pouch should also
                  support hygiene, freshness, and shelf-life needs when matched
                  with the right material.
                </p>

                <p>
                  Quality packaging also helps during transport. Products move
                  through warehouses, cartons, retail counters, and customer
                  handling. Strong laminated packaging reduces the risk of
                  leakage, contamination, tearing, or loss of freshness. This is
                  especially important for spices, powders, snacks, and dry food
                  products.
                </p>
                <p>
                  Before final production, it is helpful to share complete
                  details about the product, filling weight, storage life,
                  packing machine, expected quantity, and artwork size. These
                  details allow the packaging team to suggest the right film
                  thickness, seal area, print layout, and finish. Clear planning
                  reduces wastage and avoids practical issues during filling. It
                  also helps your product reach the market with a pack that is
                  easy to handle, easy to display, and easy for customers to
                  understand. This approach keeps the final packaging more
                  useful for your business and more convenient for your buyers
                  across retail shelves and delivery channels as well.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 bg-gradient-to-br from-white via-gray-50 to-sky-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 md:p-14">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Benefits for Brands
              </h3>
              <div className="text-gray-700 text-lg leading-relaxed">
                <p>
                  A <a className="text-[#155dfc]" href="https://www.amulpackaging.in/blog/why-businesses-prefer-pillow-pouch-packaging-today" target="_blank" rel="noopener noreferrer"> Pillow Pouch </a> is
                  cost-effective compared with many rigid packaging options, and
                  it uses less storage space. It is lightweight, flexible,
                  printable, and suitable for many product sizes. This makes it
                  a smart choice for businesses that want professional packaging
                  without increasing unnecessary packaging costs.
                </p>

                <p>
                  The pouch also gives good shelf visibility. With the right
                  artwork and finish, the front panel can highlight your brand,
                  while the back panel can carry important product details. It
                  can be designed for mass-market products, premium ranges,
                  trial packs, refill packs, and large-volume products.
                </p>

                <p>
                  Another major advantage is scalability. Once the pouch design
                  and material structure are finalized, the format can be
                  adapted for different SKUs, weights, flavours, or product
                  variants. This helps brands maintain packaging consistency
                  across their product range.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-14 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-2xl md:text-7xl font-bold text-gray-900 mb-4">
              Why Choose Amul Packaging?
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed max-w-7xl mx-auto">
              Amul Packaging understands the real needs of product brands:
              strong packaging, clean print quality, timely support, and
              practical customization. We work with businesses that need
              packaging for food, FMCG, retail, industrial, and daily-use
              products. Our aim is to make packaging easier, clearer, and more
              dependable for growing brands.
            </p>
            <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-7xl mx-auto">
              When you choose us for Pillow Pouch manufacturing, you get support
              from a team that understands flexible packaging requirements,
              laminated film use, custom printing, and product-wise packaging
              planning. We do not treat every product the same because every
              product needs different protection and presentation.
            </p>
            <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-7xl mx-auto">
              We help you select the right size, material, print style, and
              finish based on your requirement. Whether you are launching a new
              product or upgrading existing packaging, Amul Packaging can
              support you with professional pouch manufacturing that suits your
              product and market.
            </p>

            <div className="mt-8">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="px-8 py-3 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[var(--primary-color)] to-[#0056a0]"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </section>

        <section className="relative py-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl bg-gradient-to-r from-white to-[var(--primary-color)]/5 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Need custom packaging for your product?
                  </h3>
                  <p className="mt-3 text-gray-700 text-lg">
                    Get in touch with Amul Packaging for durable and attractive
                    Pillow Pouch manufacturing. Share your product details,
                    quantity, size, artwork, and packaging requirement, and our
                    team will guide you with a suitable solution.
                  </p>
                </div>

                <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-4 mx-auto md:mx-0">
                  <button
                    onClick={() => setIsEnquiryOpen(true)}
                    className="px-6 py-3 rounded-full font-semibold text-white bg-[var(--primary-color)] shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                  >
                    Enquire Now
                  </button>

                  <a
                    href="/contact"
                    className="px-6 py-3 rounded-full font-semibold text-[var(--primary-color)] bg-white border border-[var(--primary-color)]/10 shadow-sm hover:bg-gray-50"
                  >
                    Request a Custom Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl border border-gray-100 p-8 md:p-10 lg:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                FAQs
              </h3>
              <div className="mt-6 space-y-3">
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
                        onClick={() => setOpenFAQ(isOpen ? null : item.id)}
                      >
                        <span className="font-semibold text-gray-900">
                          {item.question}
                        </span>
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
        </section>

        <EnquiryModal
          open={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          product={{ name: "Pillow Pouch" }}
        />
      </main>
    </>
  );
};

export default PillowPouch;
