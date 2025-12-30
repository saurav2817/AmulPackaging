/**
 * Blog API Service
 * Handles all API calls for blog operations
 */

// Use relative path - Vite proxy will forward /api requests to PHP server
// If proxy doesn't work, change this to: 'http://localhost/api' (or your XAMPP port)
const API_BASE_URL = '/api';

import { getAuthToken } from '../utils/auth';

// Helper function to handle API calls
async function apiCall(endpoint, options = {}) {
  try {
    const token = getAuthToken();
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Upload a blog-related image (featured image or TinyMCE inline images)
export const uploadBlogImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload.php`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to upload image');
    }

    return data;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

// Get all blogs (admin view)
export const getAllBlogs = async (admin = false, status = null) => {
  let url = 'blogs.php';
  const params = new URLSearchParams();
  
  if (admin) {
    params.append('admin', 'true');
  }
  if (status !== null) {
    params.append('status', status);
  }
  
  if (params.toString()) {
    url += '?' + params.toString();
  }
  
  return apiCall(url);
};

// Get active blogs only (user view)
export const getActiveBlogs = async () => {
  return apiCall('blogs.php');
};

// Get single blog by ID or slug
export const getBlogById = async (id) => {
  // Try path-based first, fallback to query parameter
  try {
    return await apiCall(`blogs.php/${id}`);
  } catch {
    // Fallback to query parameter approach
    return apiCall(`blogs.php?id=${id}`);
  }
};

// Get recent blogs (for sidebar)
export const getRecentBlogs = async (limit = 5, excludeId = null) => {
  const params = new URLSearchParams();
  params.append('action', 'recent');
  params.append('limit', limit);
  if (excludeId) {
    params.append('exclude', excludeId);
  }
  
  return apiCall(`blogs.php?${params.toString()}`);
};

// Create new blog
export const createBlog = async (blogData) => {
  return apiCall('blogs.php', {
    method: 'POST',
    body: JSON.stringify(blogData),
  });
};

// Update blog
export const updateBlog = async (id, blogData) => {
  // Try path-based first, fallback to query parameter
  try {
    return await apiCall(`blogs.php/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  } catch {
    // Fallback to query parameter approach
    return apiCall(`blogs.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  }
};

// Delete blog
export const deleteBlog = async (id) => {
  // Try path-based first, fallback to query parameter
  try {
    return await apiCall(`blogs.php/${id}`, {
      method: 'DELETE',
    });
  } catch {
    // Fallback to query parameter approach
    return apiCall(`blogs.php?id=${id}`, {
      method: 'DELETE',
    });
  }
};

// Toggle blog status (activate/deactivate)
export const toggleBlogStatus = async (id) => {
  // Try path-based first, fallback to query parameter
  try {
    return await apiCall(`blogs.php/${id}/toggle-status`, {
      method: 'PATCH',
    });
  } catch {
    // Fallback to query parameter approach
    return apiCall(`blogs.php?id=${id}&action=toggle-status`, {
      method: 'POST',
    });
  }
};

