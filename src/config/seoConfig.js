// SEO configurations for different pages
export const seoConfig = {
  home: {
    title: "Flexible Packaging Manufacturer in Mumbai & Bhiwandi",
    description: "Amul Packaging is a flexible packaging manufacturer in Bhiwandi, delivering custom printed pouches, roll stock and packaging solutions to brands across Mumbai.",
    keywords: "Flexible packaging manufacturer in Bhiwandi & Mumbai",
    image: "/img/Banner.webp",
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
    title: "About Amul Packaging | Flexible Packaging Manufacturer",
    description: "Learn about Amul Packaging, a flexible packaging manufacturer with decades of experience, operating from Bhiwandi and supporting local brands throughout Mumbai.",
    keywords: "About Amul Packaging",
    image: "/img/about.webp",
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
    title: "Cool Product Packaging for Better Customer Reach",
    description: "Upgrade your brand with cool product packaging that blends style, strength, and creativity to make your products stand out on any shelf.",
    keywords: "cool product packaging",
    image: "/img/slider_banner/Products.webp",
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
    title: "Packaging Services in Mumbai & Bhiwandi | Amul Packaging",
    description: "Explore packaging design, sampling and advanced printing services from Amul Packaging in Bhiwandi, supporting brands across Mumbai from concept to production.",
    keywords: "Packaging services in Bhiwandi & Mumbai",
    image: "/img/slider_banner/Service.webp",
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
    title: "Contact Packaging Manufacturer in Mumbai & Bhiwandi",
    description: "Contact Amul Packaging for custom pouches, printed films and flexible packaging support from our Bhiwandi facility, serving businesses across Mumbai region.",
    keywords: "Packaging manufacturer in Bhiwandi & Mumbai",
    image: "/img/slider_banner/contactus.webp",
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
    title: "Packaging Solutions for Industries in Mumbai & Bhiwandi",
    description: "Discover flexible packaging solutions for food, pharma, beauty, dairy, agro and retail industries, manufactured in Bhiwandi and supplied throughout Mumbai.",
    keywords: "Packaging solutions for industries in Bhiwandi & Mumbai",
    image: "/img/slider_banner/Products.webp",
    url: "https://www.amulpackaging.in/industries-we-serve",
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

  blog: {
    title: "Flexible packaging blog",
    description: "Read useful practical guides from Amul Packaging on pouch formats, materials, printing, sealing and product protection for businesses in Bhiwandi and Mumbai.",
    keywords: "Flexible packaging blog",
    image: "/img/slider_banner/Products.webp",
    url: "https://www.amulpackaging.in/blog",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Amul Packaging Blog",
      "description": "Packaging industry insights, news, and updates from Amul Packaging",
      "url": "https://www.amulpackaging.in/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Amul Packaging",
        "url": "https://www.amulpackaging.in",
        "logo": "https://www.amulpackaging.in/img/logo.webp"
      }
    }
  },

  privacy: {
    title: "Privacy Policy | Amul Packaging",
    description: "Privacy policy and data protection information for Amul Packaging website visitors and customers.",
    keywords: "privacy policy, data protection, Amul Packaging privacy",
    image: "/img/logo.webp",
    url: "https://www.amulpackaging.in/privacyPolicy",
    noindex: true
  },

  terms: {
    title: "Terms & Conditions | Amul Packaging",
    description: "Terms and conditions for using Amul Packaging services and website.",
    keywords: "terms conditions, Amul Packaging terms",
    image: "/img/logo.webp",
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
  const siteUrl = "https://www.amulpackaging.in";

  const productSlug =
    product.slug ||
    product.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  const productUrl = `https://www.amulpackaging.in/products/${productSlug}`;

  // Most product images live in `product.img[]` (not `product.image`).
  const rawImage =
    product.image ||
    (Array.isArray(product.img) ? product.img.find(Boolean) : null) ||
    null;
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${siteUrl}${rawImage}`
    : null;

  const description =
    product.seoDescription || product.description || product.HeroText || "";

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": description,
    "image": imageUrl || undefined,
    "brand": {
      "@type": "Brand",
      "name": "Amul Packaging"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Amul Packaging",
      "url": "https://www.amulpackaging.in"
    },
    "category": product.category || "Flexible Packaging",
    "offers": {
      "@type": "Offer",
      "url": "https://www.amulpackaging.in",
      "priceCurrency": "INR",
      "price": "0",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "price": "On Request"
      },
      "seller": {
        "@type": "Organization",
        "name": "Amul Packaging"
      }
    }
  };

  // Use faqSchema from product if available
  const faqSchema = product.faqSchema || null;

  // Prefer manual serviceSchema from product if present.
  // Otherwise, fall back to an auto-generated Service schema.
  const manualServiceSchema = product.serviceSchema || null;

  // Service schema (JSON-LD) to improve service-related SEO per product page.
  const autoServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": `${(product.name || "").trim()} Manufacturing`.trim(),
    "name": (product.name || "").trim(),
    "description": description,
    "url": productUrl,
    ...(imageUrl ? { "image": imageUrl } : {}),
    "provider": {
      "@type": "Organization",
      "name": "Amul Packaging",
      "url": siteUrl
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  };

  const serviceSchema = manualServiceSchema || autoServiceSchema;

  const structuredData = faqSchema
    ? [baseStructuredData, serviceSchema, faqSchema]
    : [baseStructuredData, serviceSchema];

  return {
    // Use custom seoTitle if available, otherwise fallback to generated title
    title: product.seoTitle || `${product.name} | Flexible Packaging | Amul Packaging`,
    // Use custom seoDescription if available, otherwise fallback to generated description
    description: product.seoDescription || `${product.description} - Custom ${product.name} packaging solutions by Amul Packaging. High-quality flexible packaging for your business needs.`,
    // Use custom seoKeywords if available, otherwise fallback to generated keywords
    keywords: product.seoKeywords || `${product.name}, ${product.category} packaging, flexible packaging, custom packaging, Amul Packaging`,
    image: rawImage || "/img/products/default.webp",
    url: productUrl,
    structuredData: structuredData
  };
};
