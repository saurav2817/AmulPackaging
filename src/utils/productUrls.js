import products from "../api/products";

// Helper to convert string to URL-friendly slug
export const slugify = (text = "") => {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
};

// Helper function to create SEO-friendly product URLs
export const createProductUrl = (productIdOrProduct, productName, customSlug) => {
  if (customSlug) {
    return `/products/${customSlug}`;
  }

  // If the whole product object was passed
  if (productIdOrProduct && typeof productIdOrProduct === "object") {
    if (productIdOrProduct.slug) {
      return `/products/${productIdOrProduct.slug}`;
    }
    return `/products/${slugify(productIdOrProduct.name || "")}`;
  }

  // If productId was passed, check if that product has a custom slug defined
  if (productIdOrProduct) {
    const found = products.find((p) => p.id === productIdOrProduct);
    if (found?.slug) {
      return `/products/${found.slug}`;
    }
  }

  const slug = slugify(productName || "");
  return `/products/${slug}`;
};

// Helper function to get product ID from URL
export const getProductIdFromUrl = (url) => {
  const match = url.match(/\/products\/(\d+)/);
  return match ? parseInt(match[1]) : null;
};

// Helper function to get product name from URL
export const getProductNameFromUrl = (url) => {
  const match = url.match(/\/products\/\d+\/(.+)/);
  return match ? match[1].replace(/-/g, ' ') : null;
};
