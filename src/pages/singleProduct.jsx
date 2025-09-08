import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoHomeOutline, IoChevronForward, IoStar, IoListCircle, IoCheckmarkCircle, IoApps, IoArrowBack, IoClose, IoChevronBack, IoChevronForward as IoChevronForwardIcon } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import products from "../api/products";
import RecentlyViewed from "../components/products/recentlyViewed";
import { FaFacebook,FaTwitter,FaPinterest,FaWhatsapp} from "react-icons/fa6";


const SingleProduct = () =>{
    const { id } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const productId = Number(id);
    const product = products.find((p) => p.id === productId);

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
                <Link to="/products" className="mt-6 inline-block text-[var(--primary-color)] underline">Back to products</Link>
            </main>
        );
    }

    const HandleShare = async (platform) => {
        const shareUrl = window.location.href;
        const shareTitle = product?.name || document.title;
        const shareText = `Check out ${shareTitle}`;
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedText = encodeURIComponent(shareText);
        const productImage = [product?.img, product?.hoverImg].filter(Boolean)[0] || '';
        const encodedImage = encodeURIComponent(productImage);

        let urlToOpen = '';

        switch (platform) {
            case 'facebook':
                urlToOpen = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                urlToOpen = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
                break;
            case 'pinterest':
                urlToOpen = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedText}`;
                break;
            case 'whatsapp':
                urlToOpen = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
                break;
            default:
                break;
        }

        if (urlToOpen) {
            window.open(urlToOpen, '_blank', 'noopener,noreferrer');
            return;
        }
    }

    return(
        <>
            <main className="mx-auto">
                {/* Breadcrumb */}


                {/* Title / Hero */}
                <section className="py-12 md:py-16 bg-[#f1f4fb]">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-2xl md:text-4xl font-extrabold text-primary">{product.name}</h1>
                        {/* {product.Details && (
                            <p className="max-w-3xl mx-auto mt-3 text-gray-700 leading-7">
                                {product.Details}
                            </p>
                        )} */}
                    </div>
                </section>


                {/* Main content */}
                <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white">
                        {/* Product Gallery */}
                        <div className="relative border border-[#ededed] p-2">
                            {/* Themed navigation arrows for main gallery */}
                            <button
                                className="sp-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary-color)] text-[var(--white)] shadow hover:brightness-110 focus:outline-none"
                                aria-label="Previous image"
                                type="button"
                            >
                                <IoChevronBack className="text-xl" />
                            </button>
                            <button
                                className="sp-next absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary-color)] text-[var(--white)] shadow hover:brightness-110 focus:outline-none"
                                aria-label="Next image"
                                type="button"
                            >
                                <IoChevronForwardIcon className="text-xl" />
                            </button>

                            <Swiper
                                modules={[FreeMode, Navigation, Thumbs]}
                                navigation={{ nextEl: '.sp-next', prevEl: '.sp-prev' }}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                spaceBetween={10}
                                className="w-full h-full"
                                onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                            >
                                {[product.img, product.hoverImg].filter(Boolean).map((src, idx) => (
                                    <SwiperSlide key={idx}>
                                        <img
                                            src={src}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover cursor-zoom-in"
                                            onClick={() => { setActiveIndex(idx); setIsLightboxOpen(true); }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="mt-3">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                modules={[FreeMode, Navigation, Thumbs]}
                                spaceBetween={8}
                                slidesPerView={4}
                                freeMode
                                watchSlidesProgress
                                className="w-full"
                            >
                                {[product.img, product.hoverImg].filter(Boolean).map((src, idx) => (
                                    <SwiperSlide key={`thumb-${idx}`}>
                                        <div className="border border-[#ededed] p-1 cursor-pointer">
                                            <img src={src} alt={`${product.name} thumb ${idx + 1}`} className="w-full h-20 object-cover" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div>
                        <nav aria-label="Breadcrumb" className="bg-[#f7f8fb] border-b border-[#ededed] mb-4">
                            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-gray-600 gap-2">
                                <IoHomeOutline className="text-[var(--primary-color)]" />
                                <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
                                <IoChevronForward className="opacity-60" />
                                <Link to="/products" className="hover:text-[var(--primary-color)]">Products</Link>
                                <IoChevronForward className="opacity-60" />
                                <span className="font-medium text-[var(--primary-color)]">{product.name}</span>
                            </div>
                        </nav>
                                
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 mt-4 text-primary ">Overview</h2>
                        {product.Details && (
                            <p className="text-gray-700 leading-7">{product.Details}</p>
                        )}

                        {Array.isArray(product.Features) && product.Features.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.Features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <IoCheckmarkCircle className="text-[var(--secondary-color)] mt-[2px]" />
                                            <span className="text-gray-800">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {Array.isArray(product.Applications) && product.Applications.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">Applications</h3>
                                <ul className="space-y-2">
                                    {product.Applications.map((app, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <IoApps className="text-[var(--secondary-color)] mt-[2px]" />
                                            <span className="text-gray-800">{app}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link
                                to="/contact"
                                className="px-6 py-2 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-full font-semibold hover:brightness-95 transition"
                            >
                                Enquire Now
                            </Link>
                            <Link
                                to="/products"
                                className="px-6 py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-full hover:bg-[var(--primary-color)] hover:text-[var(--white)] transition flex items-center gap-2"
                            >
                                <IoArrowBack />
                                Back to Products
                            </Link>
                        </div>

                        <div className="mt-8 flex items-center text-primary  gap-4 ">
                            
                                Share :
                                <FaFacebook onClick={() => HandleShare('facebook')}/>
                                <FaTwitter onClick={() => HandleShare('twitter')}/>
                                <FaPinterest onClick={() => HandleShare('pinterest')}/>
                                <FaWhatsapp onClick={() => HandleShare('whatsapp')}/>
                           
                        </div>
                    </div>
                </section>

                <RecentlyViewed max={4} />

                {/* Lightbox Modal */}
                {isLightboxOpen && (
                    <div
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
                            aria-label="Close image preview"
                            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                        >
                            <IoClose className="text-2xl" />
                        </button>

                        <button
                            className="absolute left-4 md:left-8 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
                            aria-label="Previous image"
                            onClick={(e) => {
                                e.stopPropagation();
                                const images = [product.img, product.hoverImg].filter(Boolean);
                                setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
                            }}
                        >
                            <IoChevronBack className="text-2xl" />
                        </button>

                        <button
                            className="absolute right-4 md:right-8 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
                            aria-label="Next image"
                            onClick={(e) => {
                                e.stopPropagation();
                                const images = [product.img, product.hoverImg].filter(Boolean);
                                setActiveIndex((prev) => (prev + 1) % images.length);
                            }}
                        >
                            <IoChevronForwardIcon className="text-2xl" />
                        </button>

                        <div className="max-w-5xl w-[90%]" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={[product.img, product.hoverImg].filter(Boolean)[activeIndex]}
                                alt={`${product.name} large ${activeIndex + 1}`}
                                className="w-full max-h-[80vh] object-contain"
                            />
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default SingleProduct;