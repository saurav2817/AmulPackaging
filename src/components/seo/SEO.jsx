import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Amul Packaging | Flexible Packaging Solutions & Printing",
  description = "Amul Packaging offers cutting-edge flexible packaging solutions using rotogravure, flexographic, and digital printing technologies for all industries.",
  keywords = "Amul Packaging, flexible packaging, rotogravure, flexographic, digital printing, Mumbai, manufacturer",
  image = "/img/Banner.jpg",
  url = "https://www.amulpackaging.in",
  type = "website",
  structuredData = null,
  canonical = null,
  noindex = false,
  nofollow = false,
  author = "Amul Packaging",
  publishedTime = null,
  modifiedTime = null,
  section = null,
  tags = []
}) => {
  const fullTitle = title.includes('Amul Packaging') ? title : `${title} | Amul Packaging`;
  const fullUrl = canonical || `${url}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const fullImage = image.startsWith('http') ? image : `${url}${image}`;

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Amul Packaging",
    "url": "https://www.amulpackaging.in",
    "logo": "https://www.amulpackaging.in/img/logo.png",
    "description": "Leading flexible packaging solutions provider with 30+ years of expertise in rotogravure, flexographic, and digital printing.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2, Pramod Prasad Building, Plot No.232. Next to Brij Albela",
      "addressLocality": "Wadala (W)",
      "addressRegion": "Mumbai",
      "postalCode": "400 031",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9004382696",
      "contactType": "sales",
      "email": "Sales@amulpackaging.in",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/amul-packagingap/",
    ],
    "foundingDate": "1990",
    "numberOfEmployees": "50-100",
    "industry": "Packaging and Printing"
  };

  // Combine default with custom structured data
  const finalStructuredData = structuredData ? 
    Array.isArray(structuredData) ? [defaultStructuredData, ...structuredData] : [defaultStructuredData, structuredData]
    : [defaultStructuredData];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Amul Packaging" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {finalStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#003580" />
      <meta name="msapplication-TileColor" content="#003580" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Amul Packaging" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;
