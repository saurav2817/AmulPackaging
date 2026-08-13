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
    ClientImg: "/img/clientlogo/thyrocare.webp",
    Name: "Thyrocare",
  },
  {
    id: "2",
    ClientImg: "/img/clientlogo/lupin.webp",
    Name: "Lupin",
  },
  {
    id: "3",
    ClientImg: "/img/clientlogo/chandan.webp", 
    Name: "Chandan",
  },
    {
    id: "4",
    ClientImg: "/img/clientlogo/whole-truth.webp", 
    Name: "Whole Truth",
  },  
  {
    id: "5",
    ClientImg: "/img/clientlogo/bazana.webp", 
    Name: "bazana",
  },
  {
    id: "6",
    ClientImg: "/img/clientlogo/oziva.webp", 
    Name: "Oziva",
  },
    {
    id: "7",
    ClientImg: "/img/clientlogo/fazlaniexports.webp", 
    Name: "fazlani exports",
  },
    {
    id: "8",
    ClientImg: "/img/clientlogo/himedia.webp", 
    Name: "Himedia",
  },
   {
    id: "9",
    ClientImg: "/img/clientlogo/superyou.webp", 
    Name: "Superyou",
  },
  {
    id: "10",
    ClientImg: "/img/clientlogo/nykaa.webp", 
    Name: "Nykaa",
  },
  {
    id: "11",
    ClientImg: "/img/clientlogo/cachet.webp", 
    Name: "Cachet",
  },
    {
    id: "12",
    ClientImg: "/img/clientlogo/prov.webp", 
    Name: " prov",
  },
   {
    id: "13",
    ClientImg: "/img/clientlogo/candor.webp", 
    Name: " candor",
  },
  {
    id: "14",
    ClientImg: "/img/clientlogo/Consciousfoods.webp", 
    Name: "Conscious",
  },
 
  {
    id: "15",
    ClientImg: "/img/clientlogo/khetika.webp", 
    Name: "Khetika",
  },
  {
    id: "16",
    ClientImg: "/img/clientlogo/toi.webp", 
    Name: "The Times of India",
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
                  loading="lazy"
                  width="160"
                  height="80"
                  className="max-h-18 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
};

export default ClientsSection;
