# Blog System - Quick Start Guide

## What's Been Created

### Database
- ✅ SQL script: `api/blog_table.sql` - Run this in MySQL (phpMyAdmin) to create the blogs table

### Backend (PHP API)
- ✅ Database connection: `api/db_connection.php`
- ✅ Blog API: `api/blogs.php` (RESTful routing)
- ✅ Alternative API: `api/blogs_simple.php` (query parameters - use if routing doesn't work)
- ✅ Updated config: `api/config.php` (MSSQL settings)

### Frontend (React)
- ✅ API Service: `src/api/blogs.jsx`
- ✅ Admin Pages:
  - `src/pages/admin/AdminBlogs.jsx` - Blog management table
  - `src/pages/admin/AdminBlogForm.jsx` - Add/Edit blog form
- ✅ User Pages:
  - `src/pages/BlogList.jsx` - Blog grid listing
  - `src/pages/BlogDetail.jsx` - Single blog view with sidebar
- ✅ Routes: Updated `src/routes/index.jsx`

## Quick Setup Steps

1. **Database Setup**
   - Start MySQL in XAMPP
   - Open phpMyAdmin (`http://localhost/phpmyadmin`)
   - Create database `amul_packaging`
   - Import `api/blog_table.sql` or run the SQL script

2. **Configure Database**
   - Edit `api/config.php` if needed (default XAMPP settings should work)
   - Default: user=`root`, password=`` (empty)

4. **Update API URL** (if needed)
   - Edit `src/api/blogs.jsx` - change `API_BASE_URL` if XAMPP is on different port

5. **Run the App**
   ```bash
   npm install
   npm run dev
   ```

## Access URLs

- **Blog List (User)**: http://localhost:3000/blog
- **Blog Detail**: http://localhost:3000/blog/{slug}
- **Admin Dashboard**: http://localhost:3000/admin/blogs
- **Add Blog**: http://localhost:3000/admin/blogs/new
- **Edit Blog**: http://localhost:3000/admin/blogs/edit/{id}

## Features

### Admin Side
- ✅ View all blogs in table format
- ✅ Filter by status (All/Active/Inactive)
- ✅ Edit blog
- ✅ Delete blog
- ✅ Activate/Deactivate blog
- ✅ Add new blog with rich form

### User Side
- ✅ Grid view of active blogs
- ✅ Blog cards with image, title, date, excerpt
- ✅ Full blog detail page
- ✅ Sidebar with recent posts
- ✅ Sidebar with contact information
- ✅ Responsive design

## Customization

### Update Contact Information
Edit `src/pages/BlogDetail.jsx` - find the "Contact Us" section in the sidebar

### Change API Base URL
Edit `src/api/blogs.jsx` - update `API_BASE_URL` constant

### Database Issues?
If RESTful routing doesn't work, use the simple version:
1. Backup `api/blogs.php`
2. Rename `api/blogs_simple.php` to `api/blogs.php`

## Need Help?

See `BLOG_SETUP_GUIDE.md` for detailed setup instructions and troubleshooting.

