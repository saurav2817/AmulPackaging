import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import products from "../../api/products";

const RecentlyViewed = ({ max = 8 }) => {
  const viewedIds = useMemo(() => {
    try {
      const raw = localStorage.getItem("recently_viewed_products");
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, max);
    } catch {
      return [];
    }
  }, [max]);

  const items = useMemo(() => {
    const idSet = new Set(viewedIds);
    const found = products.filter((p) => idSet.has(p.id));
    // Keep order by viewedIds (most recent first)
    const mapped = viewedIds
      .map((id) => found.find((p) => p && p.id === id))
      .filter(Boolean);
    return mapped;
  }, [viewedIds]);

  if (!items.length) return null;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recently viewed</h2>
          <Link to="/products" className="text-[var(--primary-color)] underline">View all</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.slice(0,4).map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group block">
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
              <h3 className="font-medium mt-3 text-center">{product.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;


