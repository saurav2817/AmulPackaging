import React, { useMemo } from "react";
import products from "../../api/products";


const AllProducts = ({ sortBy = "Default" }) => {
  const sortedProducts = useMemo(() => {
    const cloned = [...products];
    if (sortBy === "latest") {
      return cloned.sort((a, b) => b.id - a.id);
    }
    if (sortBy === "popularity") {
      return cloned.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    if (sortBy === "az") {
      return cloned.sort((a, b) => a.name.localeCompare(b.name));
    }
    return cloned;
  }, [sortBy]);
  return (
    <section className="py-12 xl:py-8 2xl:pt-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {sortedProducts.map((product) => (
            <div key={product.id} className="group text-center relative">
             
              <div className="relative w-full overflow-hidden border-[0.8px] border-[#ededed]">
                
                <img
                  src={product.img}
                  alt={product.name}
                  className="mx-auto w-full h-full object-cover transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-105"
                />
               
                <img
                  src={product.hoverImg}
                  alt={product.name + ' hover'}
                  className="absolute inset-0 mx-auto w-full h-full object-cover opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-130"
                />
              </div>
            
              <h3 className="font-bold mt-4">{product.name}</h3>

              <button className="mt-3 px-6 py-1 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-full hover:bg-[var(--primary-color)] hover:text-[var(--white)] transition">
                Get Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
