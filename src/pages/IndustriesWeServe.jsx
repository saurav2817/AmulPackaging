import React, { useState } from "react";
import {  Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { getSEOConfig } from "../config/seoConfig";
import { IoHomeOutline, IoChevronForward, IoStar, IoListCircle, IoCheckmarkCircle, IoApps, IoArrowBack, IoClose, IoChevronBack, IoChevronForward as IoChevronForwardIcon } from "react-icons/io5";
import { createProductUrl } from "../utils/productUrls";
import products from "../api/products";

const IndustriesWeServe = () => {
    const seoConfig = getSEOConfig('industries');
    const [selectedIndustry, setSelectedIndustry] = useState(null);

    // Helper function to get product data by name
    const getProductByName = (productName) => {
        return products.find(product => 
            product.name.toLowerCase() === productName.toLowerCase() ||
            product.name.toLowerCase().includes(productName.toLowerCase()) ||
            productName.toLowerCase().includes(product.name.toLowerCase())
        );
    };

    // Mapping pouch types to their corresponding images and product links
    const pouchImageMapping = {
        'Standup Zipper Pouch': {
            image: '/img/products/Standup-zipper-pouch-Main.jpg',
            product: getProductByName('Standup Zipper Pouch')
        },
        'Flat Bottom Pouches': {
            image: '/img/products/Flat-Bottom-Pouch-Main.jpg',
            product: getProductByName('Flat Bottom Pouch')
        },
        'Center Seal Pouch': {
            image: '/img/products/Centre-Seal-Pouch-Main.jpg',
            product: getProductByName('Centre Seal Pouch')
        },
        'Spout Pouch': {
            image: '/img/products/Spout-Pouch-Main.jpg',
            product: getProductByName('Spout Pouch')
        },
        'Shaped Pouch': {
            image: '/img/products/Shaped-Pouch-Main.jpg',
            product: getProductByName('Shaped Pouch')
        },
        'Laminated Roll-Stock': {
            image: '/img/products/Laminated-Roll-Stock-Main.jpg',
            product: getProductByName('Laminated Roll-Stock')
        },
        'Quad Seal Pouch': {
            image: '/img/products/Quad-Seal-Pouch-Main.jpg',
            product: getProductByName('Quad Seal Pouch')
        },
        'Three-Side Seal Pouch': {
            image: '/img/products/3-Side-Seal-Pouch-Main.jpg',
            product: getProductByName('3 side seal  pouch')
        },
        'Polybags': {
            image: '/img/products/Poly-bags-Main.jpg',
            product: getProductByName('Poly bags')
        },
        'Ziplock Pouch': {
            image: '/img/products/Ziplock-bags-Main.jpg',
            product: getProductByName('Ziplock poly bags')
        },
        'Vacuum Pouch': {
            image: '/img/products/Vacuum-Pouch-Main.jpg',
            product: getProductByName('Vacuum Pouch')
        },
    };

    const industriesData = [
        {
            id: 'food',
            name: 'Food Industry',
            emoji: '🥗',
            tagline: 'Sealing Freshness. Elevating Taste.',
            description: 'We provide high-barrier packaging that locks in flavor, aroma, and freshness for snacks, dry fruits, spices, ready-to-eat meals, and more. Designed for shelf appeal and product protection, our pouches keep food fresher for longer.',
            pouchTypes: ['Standup Zipper Pouch',  'Flat Bottom Pouches',  'Center Seal Pouch'],
            icon: '/img/serviceICN/food.png'
        },
        {
            id: 'beverage',
            name: 'Beverage Industry',
            emoji: '🥤',
            tagline: 'Pack Bold. Pour Fresh.',
            description: 'Leak-proof, durable packaging for juices, energy drinks, flavored water, and dairy-based beverages. Built for easy handling, storage, and strong shelf presence.',
            pouchTypes: ['Spout Pouch', 'Standup Zipper Pouch', 'Shaped Pouch', 'Laminated Roll-Stock'],
            icon: '/img/serviceICN/beverage.png'
        },
        {
            id: 'pet',
            name: 'Pet Food Industry',
            emoji: '🐾',
            tagline: 'Keeping Nutrition Fresh for Every Paw.',
            description: 'Our high-strength laminates and resealable packs keep pet food fresh, aromatic, and easy to use. Strong branding ensures visibility and durability on the shelf.',
            pouchTypes: ['Flat Bottom Pouches', 'Standup Zipper Pouch', 'Quad Seal Pouch'],
            icon: '/img/serviceICN/pet.png'
        },
        {
            id: 'pharma',
            name: 'Pharma Industry',
            emoji: '💊',
            tagline: 'Protecting What Heals.',
            description: 'Secure and hygienic packaging that preserves product efficacy and meets strict industry standards. Ideal for tablets, powders, supplements, and medical consumables.',
            pouchTypes: ['Three-Side Seal Pouch', 'Laminated Roll-Stock'],
            icon: '/img/serviceICN/pharma.png'
        },
        {
            id: 'agro',
            name: 'Agro Industry',
            emoji: '🌾',
            tagline: 'Tough Protection for Every Harvest.',
            description: 'Moisture-resistant packaging designed for fertilizers, seeds, and agrochemicals. Strong barrier films provide reliable protection during storage and transport.',
            pouchTypes: ['Flat Bottom Pouches', 'Laminated Roll-Stock'],
            icon: '/img/serviceICN/agri.png'
        },
        {
            id: 'industrial',
            name: 'Industrial Sector',
            emoji: '🏭',
            tagline: 'Strength That Holds It All Together.',
            description: 'Durable and high-performance packaging built to handle lubricants, resins, powders, and adhesives. Ensures product protection during heavy-duty logistics.',
            pouchTypes: ['Standup Zipper Pouch', 'Center Seal Pouch', 'Laminated Roll-Stock'],
            icon: '/img/serviceICN/indstrial.png'
        },
        {
            id: 'fitness',
            name: 'Fitness & Nutrition',
            emoji: '🏋️',
            tagline: 'Power-Packed Packaging for Power-Packed Products.',
            description: 'Airtight and resealable packaging that keeps protein powders, supplements, and energy mixes fresh and protected from moisture.',
            pouchTypes: ['Flat Bottom Pouches', 'Standup Zipper Pouch', 'Quad Seal Pouch', 'Laminated Roll-Stock'],
            icon: '/img/serviceICN/fitness.png'
        },
        {
            id: 'confectionery',
            name: 'Confectionery Industry',
            emoji: '🍬',
            tagline: 'Sweet Packaging That Sells.',
            description: 'Bright and vibrant packaging for chocolates, candies, and sweets that enhances shelf appeal and protects aroma and freshness.',
            pouchTypes: ['Standup Zipper Pouch', 'Center Seal Pouch', 'Laminated Roll-Stock'],
            icon: '/img/serviceICN/confectionery.png'
        },
        {
            id: 'clothing',
            name: 'Clothing & Apparel',
            emoji: '👕',
            tagline: 'Packaging That Speaks Style.',
            description: 'Elegant and secure packaging for garments, ideal for retail and e-commerce. Protects from moisture and dust while showcasing your brand.',
            pouchTypes: ['Polybags', 'Ziplock Pouch'],
            icon: '/img/serviceICN/clothing.png'
        },
        {
            id: 'beauty',
            name: 'Beauty & Personal Care',
            emoji: '💄',
            tagline: 'Where Elegance Meets Protection.',
            description: 'Premium moisture-proof packaging for skincare, cosmetics, and hygiene products. Designed to look good and keep contents secure.',
            pouchTypes: ['Spout Pouch', 'Shaped Pouch'],
            icon: '/img/serviceICN/beauty&personalcare.png'
        },
        {
            id: 'dairy',
            name: 'Dairy Industry',
            emoji: '🥛',
            tagline: 'Pure Packaging for Pure Goodness.',
            description: 'Leak-proof and hygienic packaging that maintains freshness for ghee, butter, paneer, and other dairy products. Ideal for retail and bulk.',
            pouchTypes: ['Spout Pouch', 'Three-Side Seal Pouch', 'Laminated Roll-Stock'],
            icon: '/img/serviceICN/dairy.png'
        }
    ];
    
    return (
        <>
            <SEO {...seoConfig} />
            <main className="">
                <section className="text-center md:py-30 py-10 bg-[url('/img/slider_banner/IndustriesWeServe.jpg')] bg-cover bg-center">
                    <h1 className="text-3xl font-bold text-primary">Industries We Serve</h1>
                    <div className="flex justify-center mt-3">
                        <nav aria-label="Breadcrumb" className="mb-6">
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                              <IoHomeOutline />
                              <Link to="/" className="hover:underline" aria-label="Go to Amul Packaging home page">
                                Amul Packaging Home
                              </Link>
                            </span>
            
                            <IoChevronForward className="opacity-60" />
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1f4fb] text-[var(--primary-color)] font-medium">
                            Industries We Serve
                            </span>
                          </div>
                        </nav>
                    </div>
                </section>

                <section className="py-16 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-12">
                            
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Discover how our specialized packaging solutions cater to diverse industries, 
                                ensuring product protection, freshness, and brand appeal across sectors.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {industriesData.map((industry) => (
                                <div 
                                    key={industry.id}
                                    className="flex flex-col items-center bg-white shadow-lg hover:shadow-xl px-2 py-6 md:px-6 md:py-6 lg:px-6 lg:py-6  rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 border border-gray-100"
                                    onClick={() => setSelectedIndustry(industry)}
                                >
                                    <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 mb-4">
                                        <span className="text-3xl">{industry.emoji}</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800 text-center mb-2">{industry.name}</h4>
                                    <p className="text-sm text-gray-600 text-center italic">"{industry.tagline}"</p>
                                    <div className="mt-3 text-xs text-blue-600 font-medium">
                                        Click to learn more →
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industry Detail Modal */}
                {selectedIndustry && (
                    <div className="fixed inset-0 bg-[#000000bf] bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] flex flex-col">
                            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-4xl">{selectedIndustry.emoji}</span>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">{selectedIndustry.name}</h3>
                                            <p className="text-lg text-blue-600 italic">"{selectedIndustry.tagline}"</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedIndustry(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <IoClose className="text-2xl text-gray-600" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-3">About Our Solutions</h4>
                                    <p className="text-gray-700 leading-relaxed">{selectedIndustry.description}</p>
                                </div>
                                
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Popular Pouch Types</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {selectedIndustry.pouchTypes.map((pouch, index) => {
                                            const pouchData = pouchImageMapping[pouch] || { 
                                                image: '/img/products/3-Side-Seal-Pouch-Main.jpg', 
                                                product: null 
                                            };
                                            
                                            // Generate URL with ID and name if product exists
                                            const productUrl = pouchData.product 
                                                ? createProductUrl(pouchData.product.id, pouchData.product.name)
                                                : '/products';
                                            
                                            return (
                                                <Link 
                                                    key={index} 
                                                    to={productUrl}
                                                    className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 group"
                                                >
                                                    <div className="p-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <img 
                                                                    src={pouchData.image} 
                                                                    alt={pouch}
                                                                    className="w-16 h-16 object-cover object-center rounded-lg border border-gray-100 group-hover:border-blue-200 transition-colors"
                                                                    onError={(e) => {
                                                                        e.target.src = '/img/products/3-Side-Seal-Pouch-Main.jpg';
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-gray-800 font-semibold text-sm truncate group-hover:text-blue-700 transition-colors">{pouch}</span>
                                                                    <IoChevronForwardIcon className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-b-2xl">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Ready to Get Started?</h4>
                                <p className="text-gray-700 mb-4">
                                    Contact our experts to discuss your specific packaging needs for the {selectedIndustry.name.toLowerCase()}.
                                </p>
                                <Link 
                                    to="/contact" 
                                    className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)]/90 transition-colors font-medium"
                                >
                                    Get Quote
                                    <IoChevronForwardIcon className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default IndustriesWeServe;


