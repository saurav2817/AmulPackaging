import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getActiveBlogs } from '../api/blogs';
import toast from 'react-hot-toast';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { getSEOConfig } from '../config/seoConfig';

const BLOGS_PER_PAGE = 9;

const BlogList = () => {
  const seoConfig = getSEOConfig('blog');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogSectionRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getActiveBlogs();
      if (response.success) {
        const data = response.data;
        const list = Array.isArray(data) ? data : (data ? [data] : []);
        setBlogs(list);
        setCurrentPage(1);
      }
    } catch (error) {
      toast.error('Failed to fetch blogs: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Pagination calculations
  const totalBlogs = blogs.length;
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <SEO {...seoConfig} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-blue-100">
              Stay updated with the latest insights, news, and updates from Amul Packaging
            </p>
          </div>
        </div>

        {/* Blog Content Section */}
        <div ref={blogSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm p-8">
              <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Blog Top Counter & Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-gray-200 text-sm text-gray-600">
                <p>
                  Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span>–
                  <span className="font-semibold text-gray-900">{Math.min(endIndex, totalBlogs)}</span> of{' '}
                  <span className="font-semibold text-gray-900">{totalBlogs}</span> total blogs
                </p>
                {totalPages > 1 && (
                  <p className="text-gray-500">
                    Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
                    <span className="font-semibold text-gray-900">{totalPages}</span>
                  </p>
                )}
              </div>

              {/* 9 Blogs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    {/* Featured Image */}
                    {blog.featured_image ? (
                      <Link to={`/blog/${blog.slug}`}>
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = '/img/about.webp'; // Fallback image
                            }}
                          />
                        </div>
                      </Link>
                    ) : (
                      <Link to={`/blog/${blog.slug}`}>
                        <div className="h-48 w-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">Blog</span>
                        </div>
                      </Link>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Date */}
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Calendar size={16} className="mr-2" />
                          {formatDate(blog.created_at)}
                        </div>

                        {/* Title */}
                        <Link to={`/blog/${blog.slug}`}>
                          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                            {blog.title}
                          </h2>
                        </Link>

                        {/* Excerpt */}
                        {blog.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>
                        )}
                        {!blog.excerpt && blog.content && (
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {truncateText(blog.content.replace(/<[^>]*>/g, ''))}
                          </p>
                        )}

                        {/* Author */}
                        {blog.author && (
                          <p className="text-sm text-gray-500 mb-4">
                            By {blog.author}
                          </p>
                        )}
                      </div>

                      {/* Read More Link */}
                      <div className="pt-2">
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                        >
                          Read More
                          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-xs border border-gray-200'
                    }`}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={18} className="mr-1" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-gray-400 text-sm select-none"
                          >
                            ...
                          </span>
                        );
                      }

                      const isActive = currentPage === page;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-10 h-10 px-3 rounded-lg font-medium text-sm transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 shadow-xs'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-xs border border-gray-200'
                    }`}
                    aria-label="Next Page"
                  >
                    Next
                    <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;

