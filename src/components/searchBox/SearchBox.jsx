import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../../api/products";
import { FaSearch } from "react-icons/fa";
const normalize = (s) => (s || "").toLowerCase().trim();

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const matcher = useMemo(() => normalize(query), [query]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!matcher) {
        setResults([]);
        return;
      }
      const filtered = products
        .filter((p) => normalize(p.name).includes(matcher))
        .slice(0, 8);
      setResults(filtered);
    }, 200);
    return () => clearTimeout(handler);
  }, [matcher]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const submitSearch = (text) => {
    const q = (text ?? query).trim();
    setOpen(false);
    setHighlight(-1);
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter") {
      if (highlight >= 0 && results[highlight]) {
        navigate(`/products/${results[highlight].id}`);
        setOpen(false);
        return;
      }
      submitSearch();
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search products..."
        className="w-full border border-[#e5e7eb] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
      />
      <button
        type="button"
        aria-label="Search"
        onClick={() => submitSearch()}
        className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-2 py-1.5 bg-[var(--primary-color)] text-white rounded-full text-sm"
      >
        <FaSearch />
      </button>

      {open && (matcher ? results.length > 0 : false) && (
        <ul className="absolute mt-2 w-full bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
          {results.map((p, idx) => (
            <li
              key={p.id}
              onMouseEnter={() => setHighlight(idx)}
              onMouseLeave={() => setHighlight(-1)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                navigate(`/products/${p.id}`);
                setOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
                idx === highlight ? "bg-gray-100" : "bg-white"
              }`}
            >
              {p.img ? (
                <img src={p.img} alt={p.name} className="w-10 h-10 object-cover border" />
              ) : (
                <div className="w-10 h-10 bg-gray-100 border" />
              )}
              <span className="text-sm">{p.name}</span>
            </li>
          ))}
          {matcher && results.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;


