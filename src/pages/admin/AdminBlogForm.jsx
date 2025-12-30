import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, updateBlog, getBlogById, uploadBlogImage } from '../../api/blogs';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/code';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    faq_raw: '',
    featured_image: '',
    author: 'Admin',
    status: 1,
    published_at: '',
  });

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBlogById(id);
      if (response.success) {
        // Normalize response: API may return a single-item array instead of an object
        const raw = response.data;
        const blog = Array.isArray(raw) && raw.length === 1 ? raw[0] : raw;
        // Load raw faq/script content if present
        let faqRaw = '';
        try {
          if (blog && blog.faq) {
            faqRaw = blog.faq;
          }
        } catch (err) {
          faqRaw = '';
        }
        setFormData({
          title: blog.title || '',
          slug: blog.slug || '',
          content: blog.content || '',
          excerpt: blog.excerpt || '',
          faq_raw: faqRaw,
          featured_image: blog.featured_image || '',
          author: blog.author || 'Admin',
          status: blog.status !== undefined ? blog.status : 1,
          published_at: blog.published_at ? blog.published_at.split(' ')[0] : '',
        });
      }
    } catch (error) {
      toast.error('Failed to fetch blog: ' + error.message);
      navigate('/admin/blogs');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEditMode) {
      fetchBlog();
    }
  }, [fetchBlog, isEditMode]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug from title if slug is empty or title changed
      if (name === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleFeaturedImageUpload = async () => {
    if (!imageFile) {
      toast.error('Please select an image to upload');
      return;
    }

    try {
      setImageUploading(true);
      const response = await uploadBlogImage(imageFile);
      setFormData((prev) => ({ ...prev, featured_image: response.url }));
      toast.success('Image uploaded and set as featured');
    } catch (error) {
      toast.error('Image upload failed: ' + error.message);
    } finally {
      setImageUploading(false);
    }
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  // FAQ handlers
  // no-op: admin will paste raw JSON-LD into textarea

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      const submitData = {
        ...formData,
        status: parseInt(formData.status),
      };
      // API expects `faq` field; admin pastes raw script/JSON into `faq_raw`
      if (submitData.faq_raw !== undefined) {
        submitData.faq = submitData.faq_raw;
        delete submitData.faq_raw;
      }

      let response;
      if (isEditMode) {
        response = await updateBlog(id, submitData);
        toast.success('Blog updated successfully');
      } else {
        response = await createBlog(submitData);
        toast.success('Blog created successfully');
      }

      if (response.success) {
        navigate('/admin/blogs');
      }
    } catch (error) {
      toast.error('Failed to save blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Blog' : 'Create New Blog'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter blog title"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL-friendly)
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="blog-post-slug"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave empty to auto-generate from title
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (Short Description)
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the blog post"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <Editor
              apiKey='vx2z1l0pa9p00v59elwdykhinjf8ak1jeljikw0de613ywh7'
              value={formData.content}
              onEditorChange={handleEditorChange}
              init={{
                // Agree to open-source GPL to suppress evaluation warning
                license_key: 'gpl',
                height: 500,
                menubar: true,
                branding: false,
                plugins: [
                  'link',
                  'image',
                  'media',
                  'table',
                  'lists',
                  'code',
                  'preview',
                  'fullscreen',
                  'autolink',
                  'charmap',
                ],
                toolbar:
                  'undo redo | styles | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | code preview fullscreen',
                images_upload_handler: async (blobInfo) => {
                  try {
                    const upload = await uploadBlogImage(blobInfo.blob());
                    return upload.url;
                  } catch (err) {
                    toast.error('TinyMCE image upload failed: ' + err.message);
                    throw err;
                  }
                },
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img { max-width: 100%; height: auto; }',
              }}
            />
            <p className="mt-1 text-sm text-gray-500">Rich text editor powered by TinyMCE.</p>
          </div>

          {/* Featured Image */}
          <div>
            <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="space-y-3">
              <input
                type="text"
                id="featured_image"
                name="featured_image"
                value={formData.featured_image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg or /api/uploads/yourfile.png"
              />
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm"
                />
                <button
                  type="button"
                  onClick={handleFeaturedImageUpload}
                  disabled={imageUploading}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-60"
                >
                  {imageUploading ? 'Uploading...' : 'Upload & Use'}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Upload an image or paste a direct URL. Accepted: JPG, PNG, GIF, WEBP.
              </p>
            </div>
            {formData.featured_image && (
              <img
                src={formData.featured_image}
                alt="Preview"
                className="mt-2 h-32 w-auto rounded object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>

          {/* Author and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Author name"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>

          {/* Published Date */}
          <div>
            <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-2">
              Published Date (Optional)
            </label>
            <input
              type="date"
              id="published_at"
              name="published_at"
              value={formData.published_at}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* FAQ Schema (raw JSON-LD) */}
          <div>
            <label htmlFor="faq_raw" className="block text-sm font-medium text-gray-700 mb-2">FAQ Schema (paste full &lt;script&gt; JSON-LD or raw JSON)</label>
            <textarea
              id="faq_raw"
              name="faq_raw"
              value={formData.faq_raw}
              onChange={handleChange}
              rows={8}
              placeholder={`<script type="application/ld+json">{...}</script>`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">You can paste the full &lt;script type="application/ld+json"&gt;...&lt;/script&gt; or just the JSON object/array.</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/blogs')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {loading ? 'Saving...' : isEditMode ? 'Update Blog' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogForm;

