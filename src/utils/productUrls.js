// Helper function to create SEO-friendly product URLs
export const createProductUrl = (productId, productName) => {
  // Convert product name to URL-friendly format
  const slug = productName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
  
  return `/products/${productId}/${slug}`;
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
