import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline, IoChevronForward, IoStar, IoListCircle, IoCheckmarkCircle, IoApps, IoArrowBack, IoClose, IoChevronBack, IoChevronForward as IoChevronForwardIcon } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import { IoBarChart } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { GiPriceTag } from "react-icons/gi";
import { GiThreeLeaves } from "react-icons/gi";
import ClientsSection from "../components/clients/clientsSection";
import Counters from "../components/counters/counters";
import AnimateOnScroll from "../components/animations/AnimateOnScroll";
import OurValues from "../components/ourvalues/ourValues";

const About = () => {
    return (
        <>
            <main className="">
                <section className="text-center py-10 md:py-30 bg-[url('/img/slider_banner/AboutUs.jpg')] bg-cover bg-center">
                    <h1 className="text-3xl font-bold text-blue-900 ">About Us</h1>
                    <div className="flex justify-center mt-3">
                <nav aria-label="Breadcrumb" className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                      <IoHomeOutline />
                      <Link to="/" className="hover:underline">
                        Home
                      </Link>
                    </span>

                    <IoChevronForward className="opacity-60" />
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1f4fb] text-[var(--primary-color)] font-medium">
                    About Us
                    </span>
                  </div>
                </nav>
          </div>
                </section>

                <section className="py-16 px-6">
                    <div className="container mx-auto max-w-7xl ">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            
                            {/* Left Content */}
                            <AnimateOnScroll
                                as="div"
                                className="w-full lg:w-1/2 flex flex-col justify-start"
                                variant="fadeUp"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                itemsSelector="h1, h4, p, button"
                            >
                                <h4 className="text-xl font-medium text-blue-900 mb-2">Our Story</h4>
                                <h1 className="text-4xl font-bold text-blue-800 mb-4 leading-snug">
                                    We make brand communication easier through innovative packaging solutions
                                </h1>
                                <p className="text-gray-600 max-w-3xl">
                                    Amul Packaging is one of the most reliable and trustworthy brands in the flexible packaging sector with an experience of more than 30 years. The business has evolved from its modest beginnings to a contemporary setup under the leadership of Mr. Amul Bhanushali. We are now a team of 35 people focused on serving at our highest capability every single day.
                                </p>

                                <div className="flex justify-start mt-6">
                                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 border-b-4 border-blue-700 hover:border-blue-500 rounded-lg shadow-md transition duration-300">
                                    <Link to="/products" >
                                    Discover more
                                    </Link>
                                </button>
                                </div>
                            </AnimateOnScroll>

                            {/* Right Image */}
                            <AnimateOnScroll
                                as="div"
                                className="w-full lg:w-1/2"
                                variant="zoomIn"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                            >
                                <img
                                src="img/aboutsec.jpg"
                                alt="About Amul Packaging"
                                className="w-full h-auto object-cover rounded-xl shadow-lg"
                                />
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

                <section class="py-16 relative bg-secondary">
                    {/* Background image */}
                    <div className="absolute inset-0">
                        <img
                        src="img/Machineriesbg1.jpg" alt=""className="w-full h-full bg-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-green-400 to-blue-400 opacity-[0.4]"></div>
                    </div>
                    <div class="max-w-7xl relative mx-auto px-6 lg:px-8 text-center">
                        
                        <h2 class="text-3xl font-bold text-white">Why Us</h2>
                        <h3 class="text-xl font-semibold text-white mt-2">Our Infrastructure</h3>
                        <p class="mt-4 text-white max-w-3xl mx-auto">
                            Our manufacturing plants have cutting-edge technology and procedures along the whole value chain
                            that supports and enhances our capabilities. With the current expertise, knowledge, and dedication,
                            our team is able to facilitate one-of-a-kind packaging solutions.
                        </p>
                        <p class="mt-2 text-white italic">We innovate what leads your product’s identity</p>


                        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <AnimateOnScroll
                                as="div"
                                className="bg-white shadow-lg rounded-2xl p-6 text-left hover:shadow-xl transition"
                                variant="fadeUp"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                <div class="flex items-center mb-4">
                                    <svg class="w-10 h-10 text-secondary" fill="none" stroke="currentColor" stroke-width="2"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h.01M10 14h4" />
                                    </svg>
                                    <h4 class="ml-3 text-lg font-semibold text-gray-900">Printing</h4>
                                </div>
                                <ul class="list-disc list-inside text-gray-600 space-y-2">
                                    <li>8 Colour Rotogravure Printing Machine</li>
                                    <li>6 Colour Flexo Printing Machine</li>
                                    <li>4 Colour Flexo Printing Machine</li>
                                </ul>
                            </AnimateOnScroll>

                            <AnimateOnScroll
                                as="div"
                                className="bg-white shadow-lg rounded-2xl p-6 text-left hover:shadow-xl transition"
                                variant="fadeUp"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                <div class="flex items-center mb-4">
                                    <svg class="w-10 h-10 text-secondary" fill="none" stroke="currentColor" stroke-width="2"
                                        viewBox="0 0 24 24">
                                        <path d="M9 12h6m-6 4h6M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                                    </svg>
                                    <h4 class="ml-3 text-lg font-semibold text-gray-900">Solvent based lamination and solvent less lamination</h4>
                                </div>
                                <p class="text-gray-600 text-base">
                                    Produced with stringent quality standards using a wide range of materials including PET, OPP, PE,
                                    HDPE, Metallocene PE, LLDPE, CPP, and Metallized films.
                                </p>
                            </AnimateOnScroll>


                            <AnimateOnScroll
                                as="div"
                                className="bg-white shadow-lg rounded-2xl p-6 text-left hover:shadow-xl transition"
                                variant="fadeUp"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                <div class="flex items-center mb-4">
                                    <svg class="w-10 h-10 text-secondary" fill="none" stroke="currentColor" stroke-width="2"
                                        viewBox="0 0 24 24">
                                        <path d="M12 3v18m9-9H3" />
                                    </svg>
                                    <h4 class="ml-3 text-lg font-semibold text-gray-900">Slitting & Pouch Making</h4>
                                </div>
                                <ul class="list-disc list-inside text-gray-600 space-y-2">
                                    <li>High Speed Slitting Machine</li>
                                    <li>High Speed Center Seal & Gusset Pouching Machines</li>
                                    <li>Stand Up Zipper Bag Making Machine</li>
                                    <li>High Speed Side Sealing Machines</li>
                                    <li>High Speed Bottom Sealing Machines</li>
                                </ul>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

                {/* our values */}
                <OurValues/>
              
                <section class="py-16 bg-white ">
                        <div class="max-w-7xl mx-auto px-6">
                            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
                            Our Best Qualities
                            </h2>

                            <div class="grid md:grid-cols-2 gap-10">
                            <AnimateOnScroll
                                as="div"
                                className="flex items-start space-x-4"
                                variant="zoomIn"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <FaLightbulb />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Innovative Packaging</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll
                                as="div"
                                className="flex items-start space-x-4"
                                variant="zoomIn"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <RiUserSettingsLine />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Creative Solutions</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll
                                as="div"
                                className="flex items-start space-x-4"
                                variant="zoomIn"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <TbStarsFilled />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Customer Satisfaction</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll
                                as="div"
                                className="flex items-start space-x-4"
                                variant="zoomIn"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                    <div class="bg-primary text-white p-2 rounded-md">
                                    <GiPriceTag />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Offers Significant Value</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll
                                as="div"
                                className="flex items-start space-x-4"
                                variant="zoomIn"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <IoBarChart />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Continuous Improvement</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll
                                as="div"
                                className="flex items-start space-x-4"
                                variant="zoomIn"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                                
                            >
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <GiThreeLeaves />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Conserving Natural Resources</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                </section>


                <section className="relative h-[500px] flex items-center justify-center text-center">
                    {/* Background image */}
                    <div className="absolute inset-0">
                        <img
                        src="img/secbg.jpg" alt=""className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-400/60"></div>
                    </div>

                    {/* Content */}
                    <AnimateOnScroll
                        as="div"
                        className="relative z-10 max-w-6xl px-6"
                        variant="fadeUp"
                        stagger={0.15}
                        once={true}
                        start="top 80%"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            What Do We Do
                        </h2>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                            Add innovative packaging to your life changing product
                        </h3>
                        <p className="text-white/90 mb-6">
                            We are leading manufacturers of flexographic and rotogravure packaging materials which include laminated printed rolls, center seal pouches, three side seal pouches, side gazzeted pouches, standee zipper, vaccum pouches, shaped pouches, poly bags, magazine covers, tape bags, security bags, ziplock bags and more.
                        </p>
                        <a href="#" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
                            <Link to="/contact" >
                            Get Started
                            </Link>
                        </a>
                    </AnimateOnScroll>
                </section>

                <Counters />

                <section className="pb-16 bg-white">
                    <div className="container mx-auto max-w-7xl">
                        <div class="container mx-auto max-w-7xl px-6 lg:px-8 mt-20 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <img src="/img/vision.jpg" alt="Printing" className="rounded-lg shadow-lg" />
                            </div>

                            <AnimateOnScroll
                                as="div"
                                variant="fadeRight"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                            >
                                <h2 class="text-5xl font-bold text-black relative">
                                    <span
                                        class="absolute -top-6 left-0 text-6xl text-secondary font-extrabold opacity-50">Vision</span>
                                    <span class="relative z-10">Our Vision</span>
                                </h2>
                                <p class="mt-6 text-gray-600 leading-relaxed">
                                    To continuously add value to our clients’ businesses by providing them with
                                    cutting-edge printing and packaging solutions that are of the highest
                                    quality and consistency. To be the leading provider of packaging solutions
                                    with a strong customer focus.
                                </p>
                            </AnimateOnScroll>
                        </div>

                        <div class="container mx-auto max-w-7xl px-6 lg:px-8 mt-20 grid lg:grid-cols-2 gap-12 items-center">
                        <AnimateOnScroll
                                as="div"
                                variant="fadeLeft"
                                stagger={0.15}
                                once={true}
                                start="top 80%"
                            >
                                <h2 class="text-5xl font-bold text-black relative">
                                    <span
                                        class="absolute -top-6 left-0 text-6xl text-secondary font-extrabold opacity-50">Mission</span>
                                    <span class="relative z-10">Our Mission</span>
                                </h2>
                                <p class="mt-6 text-gray-600 leading-relaxed">
                                    Serving the changing packaging demands of our customers by offering them
                                    innovative, economical, and high-quality packaging solutions while
                                    continuously delivering above our standards.
                                </p>
                            </AnimateOnScroll>

                            <div>
                                <img src="/img/mission.jpg" alt="Mission" className="rounded-lg shadow-lg w-full " />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white">
                        <div className="container mx-auto max-w-7xl">
                            <div className="border-b-2 border-[#f1f1f1]">
                                <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center  mb-4">
                                    Trusted By Brand Like
                                </h1>
                            </div>
                            <ClientsSection />
                        </div>
                </section>

            </main>
        </>
    );
};

export default About;


