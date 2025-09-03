import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Suyash",
    role: "Client",
    image: "/img/testimonial1.png",
    text: "“Innovative and sustainable packaging solutions”: I’m impressed with the Amul packaging commitment to innovation and sustainability. They are constantly developing new materials and designs that not only protect products but also minimize environmental impact. It’s refreshing to work with a company that shares my values and is committed to creating a better future.",
  },
  {
    id: 2,
    name: "Ramesh Tenkale",
    role: "Client",
    image: "/img/testimonial2.png",
    text: "“Efficient and reliable service”: As a business owner, I appreciate working with companies that are efficient and reliable. The Amul packaging has consistently provided me with timely deliveries, and their customer service team is always responsive and helpful. I can count on them to provide me with the packaging I need, when I need it.",
  },
  {
    id: 3,
    name: "Vivek Sinha",
    role: "Client",
    image: "/img/testimonial1.png",
    text: "“Great packaging solutions for my business needs!”: The Amul Packaging has provided me with a wide variety of solutions that perfectly fit my business needs. From durable corrugated boxes to attractive retail packaging, I’ve been able to present my products in a way that enhances their appeal to customers. The Amul Packaging has been an invaluable partner in helping me grow my business.",
  },
];

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
                <div className="flex flex-col items-start ">
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
