import React from "react";
import AnimateOnScroll from "../animations/AnimateOnScroll";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import testimonials from "../../api/testimonials"

const Testimonials = () => {
  return (
    <section className=" mt-4 sm:mt-12 md:mt-12">
      <div className="max-w-7xl mx-auto  text-center  xl:absolute md:left-1/2 xl:-translate-x-1/2 xl:-translate-y-[50px]">
        <div className="mt-0 px-6 sm:px-0 md:px-6 lg:px-6 xl:px-0  sm:mt-16 md:mt-16 ">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={1000}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 2, spaceBetween: 30 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <AnimateOnScroll as="div" variant="zoomIn" className="flex flex-col items-start ">
                  <div className="relative z-10 mx-14">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                    />
                  </div>
                  <div className="relative bg-white  rounded-2xl p-6 text-left mt-[-2.5rem] w-full  border-1 border-[#f1f1f1]">
                    <FaQuoteLeft className="text-3xl text-primary mb-4" />

                    <p className="text-gray-600 leading-relaxed">
                      {testimonial.text}
                    </p>

                    <p className="text-gray-600 font-bold leading-relaxed mt-4">
                      - {testimonial.name}
                    </p>

                    <FaQuoteRight className="text-3xl text-primary mt-4 ml-auto" />
                  </div>
                </AnimateOnScroll>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
