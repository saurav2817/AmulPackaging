import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  // Slider content array
  const slides = [
    {
      id: 1,
      bg: "/img/Banner.jpg",
      title: (
        <>
          Delivering <br />
          Incredible Expertise <br />
          In Packaging For <br />
          3 Decades
        </>
      ),
      description:
        "Amul Packaging is one of the most trusted and dependable names when it comes to flexible packaging.",
    },
    {
      id: 2,
      bg: "/img/slider_banner/HomePageBanner2.jpg",
      title: (
        <>
          Premium <br />
          Flexible Packaging <br />
          For Every Industry
        </>
      ),
      description:
        "From food to lifestyle products, our packaging delivers quality, freshness and branding.",
    },
    // {
    //   id: 3,
    //   bg: "/img/Banner.jpg",
    //   title: (
    //     <>
    //       {/* Sustainable <br /> */}
    //       {/* Eco-Friendly <br /> */}
    //       {/* Packaging Solutions */}
    //     </>
    //   ),
    //   description:
    //     "We create innovative packaging with a focus on sustainability and reducing environmental impact.",
    // },
  ];

  const swiperRef = useRef(null);
  const currentTlRef = useRef(null);

  const animateActiveSlide = (swiper, { isInitial = false } = {}) => {
    if (!swiper) return;
    // Reset all slide texts
    const allTitles = swiper.el.querySelectorAll(".hero-title");
    const allDescs = swiper.el.querySelectorAll(".hero-desc");
    const allBtn = swiper.el.querySelectorAll(".hero-btn");
    if (currentTlRef.current) {
      currentTlRef.current.kill();
      currentTlRef.current = null;
    }
    gsap.killTweensOf([...allTitles, ...allDescs, ...allBtn]);
    gsap.set([...allTitles, ...allDescs, ...allBtn], { opacity: 0, y: 24 });

    const active = swiper.slides[swiper.activeIndex];
    if (!active) return;
    const title = active.querySelector(".hero-title");
    const desc = active.querySelector(".hero-desc");
    const Btn = active.querySelector(".hero-btn");
    if (!title || !desc || !Btn) return;

    const tl = gsap.timeline();
    if (isInitial) {
      // Slight delay on first load so user sees it
      tl.addLabel("start", "+=0.2");
    }
    tl.to(title, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, isInitial ? "start" : 0)
      .to(desc, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "+=0.15")
      .to(Btn, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "+=0.20");

    currentTlRef.current = tl;
    return tl;
  };

  return (
    <div className="w-full h-[40vh] md:h-[60vh] lg:h-[60vh] xl:h-[90vh]  relative">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1200} // smooth transition (ms)
        loop={true}
        className="h-full"
        onBeforeInit={(s) => {
          s.params.navigation = {
            ...(s.params.navigation || {}),
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          };
        }}
        onSwiper={(s) => {
          swiperRef.current = s;
          if (s.navigation && typeof s.navigation.init === "function") {
            s.navigation.init();
            s.navigation.update();
          }
          // Pause autoplay for initial entrance animation
          if (s.autoplay && typeof s.autoplay.stop === "function") {
            s.autoplay.stop();
          }
          setTimeout(() => {
            const tl = animateActiveSlide(s, { isInitial: true });
            if (tl) tl.eventCallback("onComplete", () => {
              if (s.autoplay && typeof s.autoplay.start === "function") {
                s.autoplay.start();
              }
            });
          }, 200);
        }}
        onSlideChangeTransitionStart={(s) => {
          // Immediately hide all texts to avoid flash during slide move
          const allTitles = s.el.querySelectorAll(".hero-title");
          const allDescs = s.el.querySelectorAll(".hero-desc");
          const allBtn = s.el.querySelectorAll(".hero-btn");
          gsap.killTweensOf([...allTitles, ...allDescs, ...allBtn]);
          gsap.set([...allTitles, ...allDescs, ...allBtn], { opacity: 0, y: 24 });
          if (currentTlRef.current) {
            currentTlRef.current.kill();
            currentTlRef.current = null;
          }
        }}
        onSlideChangeTransitionEnd={(s) => {
          // Animate after new slide is in place
          animateActiveSlide(s);
        }}
      >
        {/* Themed navigation arrows */}
        <button
          className="hero-prev absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white text-[#003580] hover:text-white hover:bg-[#003580] border border-white/40 shadow rounded-full w-10 h-10 md:w-12 md:h-12 grid place-items-center transition-colors"
          aria-label="Previous slide"
        >
          <IoChevronBack className="text-xl md:text-2xl" />
        </button>
        <button
          className="hero-next absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white text-[#003580] hover:text-white hover:bg-[#003580] border border-white/40 shadow rounded-full w-10 h-10 md:w-12 md:h-12 grid place-items-center transition-colors"
          aria-label="Next slide"
        >
          <IoChevronForward className="text-xl md:text-2xl" />
        </button>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* Text Section */}
              <div className="container mx-auto px-6 md:px-12 lg:px-20">
                 <div className="max-w-xl bg-[#ffffff80] p-4 md:bg-transparent md:p-0"> 
                  <h1 className="hero-title text-xl md:text-3xl lg:text-5xl xl:text-5xl font-extrabold text-blue-900 leading-snug leading-tight">
                    {slide.title}
                  </h1>
                  <p className="hero-desc mt-4  text-gray-700  text-md  md:text-lg ">{slide.description}</p>

                  <button className="
                  hero-btn 
                  mt-6 
                  px-4 py-2 text-sm   /* mobile */
                  sm:px-5 sm:py-2.5 sm:text-base  /* small tablets */
                  md:px-6 md:py-3 md:text-lg      /* tablets and up */
                  bg-secondary text-primary font-semibold 
                  rounded-full shadow 
                  hover:bg-yellow-400 
                  transition-colors duration-200 
                  w-max
                ">
                  <Link to="/products" >
                    View More
                  </Link>
                </button>


                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
