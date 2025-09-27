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
import EnquiryModal from "../components/modal/enquiryModal";


const SingleProduct = () =>{
    const { id } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
	const [tiltStyle, setTiltStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
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

	// Simple mouse tilt effect for 3D demo placeholder
	const handleTiltMove = (e) => {
		const bounds = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - bounds.left;
		const y = e.clientY - bounds.top;
		const percentX = (x / bounds.width) * 2 - 1; // -1 to 1
		const percentY = (y / bounds.height) * 2 - 1; // -1 to 1
		const maxTilt = 10; // degrees
		const rotateY = maxTilt * percentX;
		const rotateX = -maxTilt * percentY;
		setTiltStyle({ transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)` });
	};

	const handleTiltLeave = () => {
		setTiltStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
	};

	return(
        <>
					<main className="mx-auto soft-bg  min-h-screen">
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
												navigation={{ nextEl: '.sp-next', prevEl: '.sp-prev' }}
												thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
												spaceBetween={10}
												className="w-full h-full"
												onSlideChange={(s) => setActiveIndex(s.activeIndex)}
											>
												{[...product.img].filter(Boolean).map((src, idx) => (
													<SwiperSlide key={idx}>
														<img
															src={src}
															alt={`${product.name} ${idx + 1}`}
															className="w-full h-full object-cover cursor-zoom-in rounded-xl"
															onClick={() => { setActiveIndex(idx); setIsLightboxOpen(true); }}
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
												{[...product.img].filter(Boolean).map((src, idx) => (
													<SwiperSlide key={`thumb-${idx}`}>
														<div className="border border-[#ededed] p-1 rounded-lg cursor-pointer hover:border-[var(--primary-color)] transition">
															<img src={src} alt={`${product.name} thumb ${idx + 1}`} className="w-full h-20 object-cover rounded-md" />
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
							            		<Link to="/" className="hover:underline">Home</Link>
							            	</span>
							            	<IoChevronForward className="opacity-60" />
							            	<Link to="/products" className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--secondary-color)]/20 text-[var(--primary-color)] hover:underline">Products</Link>
							            	<IoChevronForward className="opacity-60" />
							            	<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1f4fb] text-[var(--primary-color)] font-medium">{product.name}</span>
							            </div>
						            </nav>
									<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 text-[var(--primary-color)] shadow">Crafted by Amul Packaging</span>
									<h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--primary-color)]">{product.name}</h1>
									<p className="mt-4 text-gray-700 leading-7 max-w-xl md:max-w-none">
										{product.Details || 'Versatile and space-efficient packaging for maximum shelf visibility.'}
									</p>
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
								</div>
							</div>
						</div>
					</section>


                {/* Main content */}
				<section className="max-w-7xl mx-auto pt-4 pb-0 py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
					<div>
						<h3 className="text-xl md:text-2xl font-semibold mb-2 mt-4 text-primary ">Overview</h3>
                        {product.Details && (
                            <p className="text-gray-700 leading-7">{product.Details}</p>
                        )}
                    </div>
				</section>
                
                <section className="max-w-7xl mx-auto px-4 py-10 ">
					<div>                        
						{Array.isArray(product.Features) && product.Features.length > 0 && (
							<div className="">
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">Key Features</h3>
								<ul className="grid sm:grid-cols-2 gap-3">
									{product.Features.map((feature, index) => (
										<li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--primary-color)]/5 border border-[var(--primary-color)]/10">
											<IoCheckmarkCircle className="text-[var(--secondary-color)] mt-[2px] shrink-0" />
											<span className="text-gray-800">{feature}</span>
										</li>
									))}
								</ul>
							</div>
						)}
                        {/* CTA moved to hero */}

						<div className="mt-8 flex items-center text-primary gap-3">
							<span className="text-sm font-semibold">Share</span>
							<button aria-label="Share on Facebook" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20" onClick={() => HandleShare('facebook')}>
								<FaFacebook />
							</button>
							<button aria-label="Share on Twitter" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20" onClick={() => HandleShare('twitter')}>
								<FaTwitter />
							</button>
							<button aria-label="Share on Pinterest" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20" onClick={() => HandleShare('pinterest')}>
								<FaPinterest />
							</button>
							<button aria-label="Share on Whatsapp" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20" onClick={() => HandleShare('whatsapp')}>
								<FaWhatsapp />
							</button>
						</div>
                    </div>                   
				</section>
				
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
                              <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                            </div>
                          ))}
                        </div>
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
                            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                        >
                            <IoClose className="text-2xl" />
                        </button>

                        <button
                            className="absolute left-4 md:left-8 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
                            aria-label="Previous image"
                            onClick={(e) => {
                                e.stopPropagation();
                                const images = [...product.img].filter(Boolean);
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
                                const images = [...product.img].filter(Boolean);
                                setActiveIndex((prev) => (prev + 1) % images.length);
                            }}
                        >
                            <IoChevronForwardIcon className="text-2xl" />
                        </button>

                        <div className="max-w-5xl w-[90%]" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={[...product.img].filter(Boolean)[activeIndex]}
                                alt={`${product.name} large ${activeIndex + 1}`}
                                className="w-full max-h-[80vh] object-contain"
                            />
                        </div>
                    </div>
                )}
                {/* Enquiry Modal */}
                <EnquiryModal open={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} product={product} />
            </main>
        </>
    )
}

export default SingleProduct;