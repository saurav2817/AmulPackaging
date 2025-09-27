import React from "react";
import products from "../../api/products";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  return (
    <section className="py-12 xl:py-8 2xl:pt-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {products.slice(0, 8).map((product) => {
           const mainImg = product.img[1] || ""
           const hoverImg = product.img[2] || ""

           return(
            <div key={product.id} className="group text-center relative">
            <Link to={`/products/${product.id}`} className="block">
            <div className="relative w-full overflow-hidden border-[0.8px] border-[#ededed]">
                
                <img
                  src={mainImg}
                  alt={product.name}
                  className="mx-auto w-full h-full object-cover transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-105"
                />
               
                <img
                  src={hoverImg}
                  alt={product.name + ' hover'}
                  className="absolute inset-0 mx-auto w-full h-full object-cover opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-130"
                />
              </div>
            
              <h3 className="font-bold mt-4">{product.name}</h3>
            </Link>
              

              <Link to={`/products/${product.id}`} className="inline-block">
                <button className="mt-3 px-6 py-1 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-full hover:bg-[var(--primary-color)] hover:text-[var(--white)] transition">
                  Get Details
                </button>
              </Link>

            </div>
           )
        })}

        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
