import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById, getRecentBlogs } from '../api/blogs';
import toast from 'react-hot-toast';
import { Calendar, User, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { Helmet } from 'react-helmet-async';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
      fetchRecentBlogs();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await getBlogById(slug);
      if (response.success) {
        const data = response.data;
        if (Array.isArray(data)) {
          const matched = data.find((b) => b.slug === slug || String(b.id) === String(slug));
          setBlog(matched || data[0] || null);
        } else {
          setBlog(data);
        }
      } else {
        toast.error('Blog not found');
      }
    } catch (error) {
      toast.error('Failed to fetch blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      const response = await getRecentBlogs(5);
      if (response.success) {
        setRecentBlogs(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch recent blogs:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <Link
            to="/blog"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Blog List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Prepare FAQ structured data if present (accept raw <script> or raw JSON) */}
      {(() => {
        let structured = null;
        let rawInner = null;
        try {
          if (blog && blog.faq) {
            const raw = blog.faq;
            // If admin pasted a <script> tag, extract inner JSON
            const match = raw.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
            const inner = match ? match[1].trim() : raw.trim();
            rawInner = inner;
            // Try parse inner JSON
            try {
              const parsed = JSON.parse(inner);
              if (parsed && (parsed['@type'] === 'FAQPage' || parsed.mainEntity || Array.isArray(parsed))) {
                if (parsed['@type'] === 'FAQPage') {
                  structured = parsed;
                } else if (Array.isArray(parsed)) {
                  structured = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": parsed.map((q) => ({
                      "@type": "Question",
                      "name": q.question || q.name || '',
                      "acceptedAnswer": { "@type": "Answer", "text": q.answer || q.acceptedAnswer?.text || '' }
                    }))
                  };
                } else if (parsed.mainEntity) {
                  structured = parsed;
                }
              }
            } catch (e) {
              console.error(e);
            }
          }
        } catch (e) {
          structured = null;
          rawInner = null;
          console.error(e);
        }

        return (
          <>
            <SEO
              title={`${blog.title} - Amul Packaging Blog`}
              description={blog.excerpt || blog.content?.substring(0, 160)}
              keywords="packaging blog, industry news"
              structuredData={structured}
              type="article"
              publishedTime={blog.published_at || blog.created_at}
              author={blog.author}
            />
            {!structured && rawInner && (
              <Helmet>
                <script type="application/ld+json">{rawInner}</script>
              </Helmet>
            )}
          </>
        );
      })()}

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        {blog.featured_image && (
          <div className="relative h-96 w-full overflow-hidden">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Back Button */}
              <Link
                to="/blog"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Blog
              </Link>

              {/* Article */}
              <article className="bg-white rounded-lg shadow-sm p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
                  {blog.created_at && (
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {formatDate(blog.created_at)}
                    </div>
                  )}
                  {blog.author && (
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      {blog.author}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {blog.title}
                </h1>

                {/* Excerpt */}
                {blog.excerpt && (
                  <p className="text-xl text-gray-600 mb-8 italic">
                    {blog.excerpt}
                  </p>
                )}

                {/* Content */}
                <div
                  className="blog-content text-gray-700"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 space-y-6">
              {/* Recent Posts */}
              {recentBlogs.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h2>
                  <div className="space-y-4">
                    {recentBlogs
                      .filter((b) => b.id !== blog.id)
                      .slice(0, 5)
                      .map((recentBlog) => (
                        <Link
                          key={recentBlog.id}
                          to={`/blog/${recentBlog.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            {recentBlog.featured_image && (
                              <img
                                src={recentBlog.featured_image}
                                alt={recentBlog.title}
                                className="w-20 h-20 rounded object-cover flex-shrink-0"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {recentBlog.title}
                              </h3>
                              {recentBlog.created_at && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDate(recentBlog.created_at)}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a
                        href="tel:+91 9004382696"
                        className="text-sm text-gray-600 hover:text-blue-600"
                      >
                        +91 9004382696
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a
                        href="mailto:sales@amulpackaging.in"
                        className="text-sm text-gray-600 hover:text-blue-600 break-all"
                      >
                        sales@amulpackaging.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin size={20} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600">
                       2, Pramod Prasad Building, Plot No.232. Next to Brij Albela, Wadala (W), Mumbai 400 031.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;

