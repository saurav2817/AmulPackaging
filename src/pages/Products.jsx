import React, { useState } from "react";
import {  Link } from "react-router-dom";
import AllProducts from "../components/products/allProducts";
import products from "../api/products";
import SearchBox from "../components/searchBox/SearchBox";
import { IoHomeOutline, IoChevronForward, IoStar, IoListCircle, IoCheckmarkCircle, IoApps, IoArrowBack, IoClose, IoChevronBack, IoChevronForward as IoChevronForwardIcon } from "react-icons/io5";

const Products = () => {
  const [sortBy] = useState("default");
  return (
    <>
      <main className=" mx-auto ">
        <section className="text-center md:py-30 py-10 bg-[url('/img/slider_banner/Service.jpg')] bg-cover bg-center">
          <h1 className="text-3xl font-bold text-blue-900 ">Products</h1>
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
                      Product
                    </span>
                  </div>
                </nav>
          </div>
          

          
        </section>

        <section className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center  py-4">
            <div className="flex justify-between items-center  py-4 gap-4">
              <p> Showing {products.length} products</p>
              {/* <div className="color-[#f1f1ff1]">
                                |
                            </div> */}
              {/* <div> 
                            
                        <label htmlFor="sort" className="mr-3 font-medium">Sort by:</label>
                            <select
                                id="sort"
                                className="border border-[#e5e7eb] rounded-md px-3 py-2 bg-white"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="default">Default</option>
                                <option value="latest">Latest</option>
                                <option value="popularity">Popularity</option>
                                <option value="az">A - Z</option>
                            </select>
                        </div> */}
            </div>

            <div className="">
              <SearchBox />
            </div>
          </div>
        </section>

        <AllProducts sortBy={sortBy} />
      </main>
    </>
  );
};

export default Products;
