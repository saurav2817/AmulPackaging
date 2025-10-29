import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import products from "../../api/products";
import { createProductUrl } from "../../utils/productUrls";

const AllProducts = ({ sortBy = "default" }) => {
  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "latest":
        return list.sort((a, b) => b.id - a.id);
      case "popularity":
        return list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case "az":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [sortBy]);

  return (
    <section className="py-12 xl:py-8 2xl:pt-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {sortedProducts.map((product) => {
            const mainImg = product.img[0] || ""
            const hoverImg = product.img[1] || ""
            const productUrl = createProductUrl(product.id, product.name);

            return (
              <div key={product.id} className="group text-center relative">
                <Link to={productUrl} className="block">
                  <div className="relative w-full overflow-hidden border-[0.8px] border-[#ededed]">
                    <img
                      src={mainImg}
                      alt={product.name}
                      className={`mx-auto w-full h-full object-cover transition-all duration-500 ease-out ${
                        hoverImg ? "group-hover:opacity-0 group-hover:scale-105" : ""
                      }`}
                    />
                    {hoverImg && (
                      <img
                        src={hoverImg}
                        alt={`${product.name} hover`}
                        className="absolute inset-0 mx-auto w-full h-full object-cover opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="font-bold mt-4">{product.name}</h3>
                </Link>

                <Link to={productUrl} className="inline-block">
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

export default AllProducts;
