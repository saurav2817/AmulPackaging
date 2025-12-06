// SEO configurations for different pages
export const seoConfig = {
  home: {
    title: "Flexible & Product Packaging Services by Amul Packaging",
    description: "Amul Packaging delivers reliable flexible packaging and product packaging with superior quality, custom designs, and fast service for businesses of all sizes.",
    keywords: "flexible packaging, product packging",
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
    title: "Who We Are: Amul Packaging & Our Good Packaging Products",
    description: "Learn how Amul Packaging designs and manufactures good packaging products trusted across industries. Explore our history, expertise, and commitment to quality.",
    keywords: "good packaging products",
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
    title: "Amul Packaging Services | Great Product Packaging Solutions",
    description: "Explore Amul Packaging’s services offering great product packaging designed for durability, branding, and performance across multiple industries.",
    keywords: "great product packaging",
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
    title: "For the Best Product Packaging | Contact Us | Amul Packaging",
    description: "Contact Amul Packaging for the best product packaging solutions. Get expert support, custom options, and reliable service for all your packaging needs.",
    keywords: "best product packaging",
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
    title: "Food Product Packaging Design for Industries | Amul Packaging",
    description: "Industry-specific food product packaging design by Amul Packaging, ensuring quality, protection, and appeal for every product category.",
    keywords: "food product packaging design",
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
