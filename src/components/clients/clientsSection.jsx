import React from "react";
import { Swiper, SwiperSlide, } from "swiper/react";
import {  Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const clients = [
  {
    id: "1",
    ClientImg: "/img/clientlogo/thyrocare.jpg",
    Name: "Thyrocare",
  },
  {
    id: "2",
    ClientImg: "/img/clientlogo/lupin.jpg",
    Name: "Lupin",
  },
  {
    id: "3",
    ClientImg: "/img/clientlogo/toi.jpg",
    Name: "Times Of India",
  },
  {
    id: "4",
    ClientImg: "/img/clientlogo/chandan.jpg", 
    Name: "Chandan mukhwas",
  },
  {
    id: "5",
    ClientImg: "/img/clientlogo/oziva.jpg", 
    Name: "Oziva",
  },
  
  {
    id: "6",
    ClientImg: "/img/clientlogo/hrx.jpg", 
    Name: "HRX",
  },
  {
    id: "7",
    ClientImg: "/img/clientlogo/superyou.jpg", 
    Name: "Superyou",
  },
  {
    id: "8",
    ClientImg: "/img/clientlogo/Trunativ.jpg", 
    Name: "Trunativ",
  },
  {
    id: "9",
    ClientImg: "/img/clientlogo/delta.jpg", 
    Name: "Delta Nutritives",
  },
  {
    id: "10",
    ClientImg: "/img/clientlogo/blg.jpg", 
    Name: "BLG",
  },
  {
    id: "11",
    ClientImg: "/img/clientlogo/urban.jpg", 
    Name: "Urban platte",
  },
  {
    id: "12",
    ClientImg: "/img/clientlogo/purshottam.jpg", 
    Name: "Purshottam Kandoi",
  },
  {
    id: "13",
    ClientImg: "/img/clientlogo/whole-truth.jpg", 
    Name: "Whoile Truth",
  },
];


const ClientsSection = () => {

  return (

    <div className="max-w-7xl mx-auto px-4 relative">
        <Swiper
          modules={[ Autoplay, Navigation]}
          slidesPerView={5}
          spaceBetween={10}
          navigation={{
            prevEl: ".clients-prev",
            nextEl: ".clients-next",
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={1200} // smooth transition
          loop={true}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          onBeforeInit={(s) => {
            s.params.navigation = {
              ...(s.params.navigation || {}),
              prevEl: ".clients-prev",
              nextEl: ".clients-next",
            };
          }}
          onSwiper={(s) => {
            if (s.navigation && typeof s.navigation.init === "function") {
              s.navigation.init();
              s.navigation.update();
            }
          }}
        >
          <button
            className="clients-prev absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white text-[#003580] hover:text-white hover:bg-[#003580] border border-white/40 shadow rounded-full w-10 h-10 md:w-12 md:h-12 grid place-items-center transition-colors"
            aria-label="Previous slide"
          >
            <IoChevronBack className="text-xl md:text-2xl" />
          </button>
          <button
            className="clients-next absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white text-[#003580] hover:text-white hover:bg-[#003580] border border-white/40 shadow rounded-full w-10 h-10 md:w-12 md:h-12 grid place-items-center transition-colors"
            aria-label="Next slide"
          >
            <IoChevronForward className="text-xl md:text-2xl" />
          </button>
          {clients.map((client) => (
            <SwiperSlide key={client.id}>
              <div className="flex justify-center items-center h-24">
                <img
                  src={client.ClientImg}
                  alt={client.Name}
                  className="max-h-18 object-cover  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
};

export default ClientsSection;
