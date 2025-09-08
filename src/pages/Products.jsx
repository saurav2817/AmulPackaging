import React, { useState } from "react";
import AllProducts from "../components/products/allProducts"
import products from "../api/products";
import SearchBox from "../components/searchBox/SearchBox";

const Products = () => {

    const [sortBy, setSortBy] = useState("default");
    return (
        <>
            <main className=" mx-auto ">

                <section className="text-center py-30 bg-[url('/img/bgproduct.jpg')] bg-cover bg-center">
                    <h1 className="text-3xl font-bold text-white">Products</h1>
                </section>

                <section className="max-w-7xl mx-auto px-4">
                    
                    <div className="flex justify-between items-center  py-4">
                        <div className="flex justify-between items-center  py-4 gap-4" >
                            <p> Showing {products.length} products</p>
                            <div className="color-[#f1f1ff1]">
                                |
                            </div>
                            <div> 
                            
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
                        </div>
                        </div>

                        <div className="">
                            <SearchBox/>
                        </div>

                    
                       
                    </div>
                </section>
                
                <AllProducts sortBy={sortBy}/>
            </main>
        </>
    );
};

export default Products;


