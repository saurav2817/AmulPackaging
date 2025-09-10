import React from "react";
import { FaLightbulb } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import { IoBarChart } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { GiPriceTag } from "react-icons/gi";
import { GiThreeLeaves } from "react-icons/gi";
import ClientsSection from "../components/clients/clientsSection";
const About = () => {
    return (
        <>
            <main className="">
                <section className="text-center py-30 bg-[url('/img/bgproduct.jpg')] bg-cover bg-center">
                    <h1 className="text-3xl font-bold text-white">About Us</h1>
                </section>

                <section className="py-16 ">
                    <div className="container mx-auto max-w-7xl ">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                        
                        {/* Left Content */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-start">
                            <h4 className="text-xl font-medium text-blue-900 mb-2">WHO WE ARE</h4>
                            <h1 className="text-4xl font-bold text-blue-800 mb-4 leading-snug">
                            The wrap that makes you love the product.
                            </h1>
                            <p className="text-gray-600 max-w-3xl">
                            Amul packaging offers rotogravure, flexographic & digital flexible
                            packaging enhancing tamper evidence, security & shelf appeal to
                            consumers worldwide. We are now one of the leading manufacturers of
                            stock packaging products in various formats like stand-up Pouches,
                            zipper pouches, tape bags, laminated pouches, etc.
                            </p>

                            <div className="flex justify-start mt-6">
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 border-b-4 border-blue-700 hover:border-blue-500 rounded-lg shadow-md transition duration-300">
                                Discover more
                            </button>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="w-full lg:w-1/2">
                            <img
                            src="img/about.jpg"
                            alt="About Amul Packaging"
                            className="w-full h-auto object-cover rounded-xl shadow-lg"
                            />
                        </div>
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
                    <div className="relative z-10 max-w-3xl px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Let&apos;s your Product look nice by packaging.
                        </h2>
                        <p className="text-white/90 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
                        luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                        <a href="#" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
                            Get Started
                        </a>
                    </div>
                </section>


                <section class="py-16 bg-white">
                        <div class="max-w-7xl mx-auto px-6">
                            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
                            Our Best Qualities
                            </h2>

                            <div class="grid md:grid-cols-2 gap-10">
                        
                                <div class="flex items-start space-x-4">
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <FaLightbulb />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Innovative Packaging</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </div>

                            
                                <div class="flex items-start space-x-4">
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <RiUserSettingsLine />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Creative Solutions</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </div>

                            
                                <div class="flex items-start space-x-4">
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <TbStarsFilled />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Customer Satisfaction</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </div>

                                
                                <div class="flex items-start space-x-4">
                                    <div class="bg-primary text-white p-2 rounded-md">
                                    <GiPriceTag />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Offers Significant Value</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <IoBarChart />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Continuous Improvement</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div class="bg-primary text-white p-2 rounded-md">
                                        <GiThreeLeaves />
                                    </div>
                                    <div>
                                    <h3 class="text-lg font-semibold mb-2">Conserving Natural Resources</h3>
                                    <p class="text-gray-600">
                                        
                                    </p>
                                    </div>
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


