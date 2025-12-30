# Blog System Setup Guide

This guide will help you set up the blog system for your Amul Packaging website.

## Prerequisites

1. **XAMPP** installed and running
2. **MSSQL Server** installed and running
3. **PHP** with `sqlsrv` or `pdo_sqlsrv` extension enabled
4. **Node.js** and npm installed

## Step 1: Database Setup

### 1.1 MySQL is Already Included

XAMPP comes with MySQL pre-installed, so no additional drivers are needed!

### 1.2 Create Database and Table

1. Start MySQL in XAMPP Control Panel

2. Open phpMyAdmin (usually at `http://localhost/phpmyadmin`)

3. Create the database:
   - Click "New" in the left sidebar
   - Database name: `amul_packaging`
   - Collation: `utf8mb4_unicode_ci`
   - Click "Create"

4. Run the SQL script:
   - Select the `amul_packaging` database
   - Click on the "SQL" tab
   - Copy and paste the contents of `api/blog_table.sql`
   - Click "Go" to execute

   **OR** import the SQL file directly:
   - Click on "Import" tab
   - Choose file: `api/blog_table.sql`
   - Click "Go"

## Step 2: Configure PHP API

### 2.1 Update Database Configuration

Edit `api/config.php` and update these values if needed:

```php
define('DB_HOST', 'localhost'); // MySQL host (usually localhost)
define('DB_NAME', 'amul_packaging');
define('DB_USER', 'root'); // MySQL username (default is 'root' in XAMPP)
define('DB_PASS', ''); // MySQL password (empty by default in XAMPP)
define('DB_PORT', '3306'); // MySQL port (default is 3306)
```

**Note:** If you've set a MySQL root password, update `DB_PASS` accordingly.

### 2.2 Test Database Connection

Create a test file `api/test_connection.php`:

```php
<?php
require_once 'db_connection.php';

try {
    $db = new DatabasePDO();
    $conn = $db->getConnection();
    echo "Database connection successful!";
    
    // Test query
    $stmt = $conn->query("SHOW TABLES");
    $tables = $stmt->fetchAll();
    echo "<br>Tables found: " . count($tables);
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
```

Visit `http://localhost/api/test_connection.php` to test the connection.

## Step 3: Configure React API URL

Edit `src/api/blogs.jsx` and update the API base URL if needed:

```javascript
const API_BASE_URL = 'http://localhost/api'; // Change if your XAMPP is on different port
```

If your XAMPP is on a different port (e.g., 8080), use:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Step 4: Install Dependencies and Run

1. Install npm dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Make sure XAMPP Apache is running

## Step 5: Access the Blog System

### User Side:
- **Blog List**: `http://localhost:3000/blog`
- **Blog Detail**: `http://localhost:3000/blog/{slug}`

### Admin Side:
- **Blog Management**: `http://localhost:3000/admin/blogs`
- **Add New Blog**: `http://localhost:3000/admin/blogs/new`
- **Edit Blog**: `http://localhost:3000/admin/blogs/edit/{id}`

## API Endpoints

The PHP API provides these endpoints:

**Main API file:** `api/blogs.php` (RESTful routing)
**Alternative:** `api/blogs_simple.php` (uses query parameters - more compatible)

### Endpoints:

- `GET /api/blogs.php` - Get all active blogs (user) or all blogs (admin)
  - Add `?admin=true` for admin view
  - Add `?status=1` or `?status=0` to filter by status
  
- `GET /api/blogs.php?id={id}` or `GET /api/blogs.php/{id}` - Get single blog by ID or slug

- `GET /api/blogs.php?action=recent&limit=5` - Get recent blogs

- `POST /api/blogs.php` - Create new blog

- `PUT /api/blogs.php?id={id}` or `PUT /api/blogs.php/{id}` - Update blog

- `DELETE /api/blogs.php?id={id}` or `DELETE /api/blogs.php/{id}` - Delete blog

- `POST /api/blogs.php?id={id}&action=toggle-status` or `PATCH /api/blogs.php/{id}/toggle-status` - Toggle blog status

**Note:** If you encounter routing issues, you can rename `blogs_simple.php` to `blogs.php` to use the query parameter approach instead.

## Troubleshooting

### Issue: "Connection failed" error

**Solutions:**
1. Check if MySQL is running in XAMPP Control Panel
2. Verify database credentials in `config.php`
3. Ensure the database `amul_packaging` exists
4. Check if MySQL port 3306 is correct
5. If you set a MySQL root password, update `DB_PASS` in `config.php`

### Issue: CORS errors

If you encounter CORS errors, the PHP API already includes CORS headers. If issues persist:
1. Check browser console for specific error
2. Verify API URL in `src/api/blogs.jsx`
3. Ensure Apache is running in XAMPP

### Issue: "Access denied for user" error

**Solution:**
1. Check MySQL username and password in `config.php`
2. Default XAMPP MySQL user is `root` with no password
3. If you changed MySQL root password, update `config.php` accordingly
4. Test connection using phpMyAdmin first

### Issue: Blog images not showing

**Solution:**
1. Use full URLs for images (e.g., `http://localhost/img/blog.jpg`)
2. Or use relative paths from public folder (e.g., `/img/blog.jpg`)
3. Ensure images are in the `public/img/` folder

## Database Schema

The `blogs` table has the following structure:

- `id` (INT, Primary Key, Auto Increment)
- `title` (VARCHAR(500), Required)
- `slug` (VARCHAR(500), Unique, Required)
- `content` (TEXT, Required)
- `excerpt` (VARCHAR(1000), Optional)
- `featured_image` (VARCHAR(500), Optional)
- `author` (VARCHAR(100), Optional)
- `status` (TINYINT, Default: 1) - 1 = Active, 0 = Inactive
- `created_at` (DATETIME, Auto, Default: CURRENT_TIMESTAMP)
- `updated_at` (DATETIME, Auto, Updates on change)
- `published_at` (DATETIME, Optional)

## Notes

- The blog system uses slugs for SEO-friendly URLs
- Only blogs with `status = 1` are visible to users
- Admin can see all blogs regardless of status
- The sidebar shows recent posts and contact information
- Images should be uploaded to the `public/img/` folder or use external URLs

## Security Recommendations

1. Add authentication to admin routes (not implemented in this version)
2. Validate and sanitize all user inputs
3. Use prepared statements (already implemented)
4. Add rate limiting for API endpoints
5. Implement CSRF protection for admin forms

