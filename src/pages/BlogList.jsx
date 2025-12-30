import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getActiveBlogs } from '../api/blogs';
import toast from 'react-hot-toast';
import { Calendar, ArrowRight } from 'lucide-react';
import SEO from '../components/seo/SEO';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getActiveBlogs();
      if (response.success) {
        const data = response.data;
        setBlogs(Array.isArray(data) ? data : (data ? [data] : []));
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

  return (
    <>
      <SEO
        title="Blog - Amul Packaging"
        description="Read our latest blog posts about packaging solutions, industry insights, and more."
        keywords="packaging blog, industry news, packaging solutions"
      />
      
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

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                            e.target.src = '/img/about.jpg'; // Fallback image
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
                  <div className="p-6">
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

                    {/* Read More Link */}
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      Read More
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;

