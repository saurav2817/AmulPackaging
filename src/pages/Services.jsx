import React from "react";
import { useParams, Link } from "react-router-dom";
import { IoHomeOutline, IoChevronForward, IoStar, IoListCircle, IoCheckmarkCircle, IoApps, IoArrowBack, IoClose, IoChevronBack, IoChevronForward as IoChevronForwardIcon } from "react-icons/io5";

const Services = () => {
    return (
        <>
            <main className="">
                <section className="text-center py-30 bg-[url('/img/slider_banner/Products.jpg')] bg-cover bg-center">
                    <h1 className="text-3xl font-bold text-white">Services</h1>
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
                            Services
                            </span>
                          </div>
                        </nav>
                    </div>
                </section>

                <section className="py-16 px-6">
                    <div className="container mx-auto max-w-7xl ">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                <img src="/img/serviceICN/food.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Food</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/beverage.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Beverage</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/pet.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Pet</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/pharma.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Pharma</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/agri.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Agri</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/indstrial.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Industrial</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/fitness.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Fitness</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/confectionery.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Confectionery</h4>
                            </div>

                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/clothing.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Clothing</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/printingpress.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Printing Press</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/beauty&personalcare.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Beauty & Personal Care</h4>
                            </div>
                            
                            <div class="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
                                <div class=" flex items-center justify-center rounded-full ">
                                    <img src="/img/serviceICN/dairy.png" alt="Food" class="" />
                                </div>
                                <h4 class="mt-4 text-xl font-medium text-gray-800">Dairy</h4>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Services;


