// SEO configurations for different pages
export const seoConfig = {
  home: {
    title: "Amul Packaging | Flexible Packaging Solutions & Printing",
    description: "Amul Packaging offers cutting-edge flexible packaging solutions using rotogravure, flexographic, and digital printing technologies for all industries. 30+ years of expertise in Mumbai.",
    keywords: "Amul Packaging, flexible packaging, rotogravure printing, flexographic printing, digital printing, packaging solutions, Mumbai packaging company, custom packaging",
    image: "/img/Banner.jpg",
    url: "https://www.amulpackaging.in",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Amul Packaging",
      "url": "https://www.amulpackaging.in",
      "description": "Leading flexible packaging solutions provider with 30+ years of expertise",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.amulpackaging.in/products?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  },

  about: {
    title: "About Us | Amul Packaging - 30+ Years of Packaging Excellence",
    description: "Learn about Amul Packaging's 30+ years of expertise in flexible packaging, printing, lamination, and client-focused solutions across various industries in Mumbai.",
    keywords: "about Amul Packaging, packaging company history, flexible packaging expertise, Mumbai packaging manufacturer, packaging team",
    image: "/img/about.jpg",
    url: "https://www.amulpackaging.in/about",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Amul Packaging",
      "description": "Learn about our 30+ years of expertise in flexible packaging solutions",
      "mainEntity": {
        "@type": "Organization",
        "name": "Amul Packaging",
        "foundingDate": "1990",
        "description": "Leading flexible packaging solutions provider"
      }
    }
  },

  products: {
    title: "Products | Flexible Packaging Solutions | Amul Packaging",
    description: "Explore our comprehensive range of flexible packaging products including pouches, bags, roll stock, and custom packaging solutions for food, pharma, and industrial sectors.",
    keywords: "flexible packaging products, packaging pouches, standup pouches, vacuum pouches, poly bags, roll stock, custom packaging, food packaging, pharma packaging",
    image: "/img/slider_banner/Products.jpg",
    url: "https://www.amulpackaging.in/products",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Packaging Products",
      "description": "Comprehensive range of flexible packaging products",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Packaging Products",
        "description": "Flexible packaging solutions for various industries"
      }
    }
  },

  services: {
    title: "Services | Packaging Design & Printing Services | Amul Packaging",
    description: "Comprehensive packaging services including design, prototyping, digital printing, rotogravure, and flexographic printing. End-to-end packaging solutions for all industries.",
    keywords: "packaging services, packaging design, digital printing, rotogravure printing, flexographic printing, packaging prototyping, custom packaging services",
    image: "/img/slider_banner/Service.jpg",
    url: "https://www.amulpackaging.in/services",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Packaging Services",
      "description": "Comprehensive packaging design and printing services",
      "provider": {
        "@type": "Organization",
        "name": "Amul Packaging"
      },
      "serviceType": "Packaging Design and Printing",
      "areaServed": "India"
    }
  },

  contact: {
    title: "Contact Us | Get Custom Packaging Quote | Amul Packaging",
    description: "Contact Amul Packaging for custom flexible packaging solutions, fast quotes, and expert guidance. Located in Mumbai with 30+ years of packaging expertise.",
    keywords: "contact Amul Packaging, packaging quote, custom packaging inquiry, Mumbai packaging company, packaging consultation",
    image: "/img/slider_banner/contactus.jpg",
    url: "https://www.amulpackaging.in/contact",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Amul Packaging",
      "description": "Get in touch for custom packaging solutions and quotes",
      "mainEntity": {
        "@type": "Organization",
        "name": "Amul Packaging",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9004382696",
          "contactType": "sales",
          "email": "Sales@amulpackaging.in"
        }
      }
    }
  },

  industries: {
    title: "Industries We Serve | Packaging Solutions for All Sectors | Amul Packaging",
    description: "Amul Packaging serves diverse industries including food, beverage, pharma, pet care, agriculture, fitness, and more with specialized flexible packaging solutions.",
    keywords: "packaging for food industry, pharma packaging, beverage packaging, pet food packaging, agricultural packaging, fitness packaging, industrial packaging",
    image: "/img/slider_banner/Products.jpg",
    url: "https://www.amulpackaging.in/industriesweserve",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Industries We Serve",
      "description": "Packaging solutions for various industries",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Industries Served",
        "itemListElement": [
          { "@type": "ListItem", "name": "Food Industry" },
          { "@type": "ListItem", "name": "Pharmaceutical" },
          { "@type": "ListItem", "name": "Beverage" },
          { "@type": "ListItem", "name": "Pet Care" },
          { "@type": "ListItem", "name": "Agriculture" },
          { "@type": "ListItem", "name": "Fitness" }
        ]
      }
    }
  },

  privacy: {
    title: "Privacy Policy | Amul Packaging",
    description: "Privacy policy and data protection information for Amul Packaging website visitors and customers.",
    keywords: "privacy policy, data protection, Amul Packaging privacy",
    image: "/img/logo.png",
    url: "https://www.amulpackaging.in/privacyPolicy",
    noindex: true
  },

  terms: {
    title: "Terms & Conditions | Amul Packaging",
    description: "Terms and conditions for using Amul Packaging services and website.",
    keywords: "terms conditions, Amul Packaging terms",
    image: "/img/logo.png",
    url: "https://www.amulpackaging.in/termCondition",
    noindex: true
  }
};

// Helper function to get SEO config for a specific page
export const getSEOConfig = (page) => {
  return seoConfig[page] || seoConfig.home;
};

// Helper function to generate product-specific SEO
export const getProductSEO = (product) => {
  return {
    title: `${product.name} | Flexible Packaging | Amul Packaging`,
    description: `${product.description} - Custom ${product.name} packaging solutions by Amul Packaging. High-quality flexible packaging for your business needs.`,
    keywords: `${product.name}, ${product.category} packaging, flexible packaging, custom packaging, Amul Packaging`,
    image: product.image || "/img/products/default.jpg",
    url: `https://www.amulpackaging.in/products/${product.id}/${product.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.image,
      "brand": {
        "@type": "Brand",
        "name": "Amul Packaging"
      },
      "category": product.category,
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Amul Packaging"
        }
      }
    }
  };
};
