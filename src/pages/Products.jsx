import React, { useState } from "react";
import AllProducts from "../components/products/allProducts"
const Products = () => {
    const [sortBy, setSortBy] = useState("Default");
    return (
        <>
            <main className=" mx-auto ">

                <section className="text-center py-30 bg-[url('/img/bgproduct.jpg')] ">
                    <h1 className="text-3xl font-bold text-white">Products</h1>
                </section>

                <section className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-end py-4">
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
                </section>
                
                <AllProducts sortBy={sortBy}/>+
            </main>
        </>
    );
};

export default Products;


