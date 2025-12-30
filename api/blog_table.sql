-- SQL Script to create blogs table for MySQL
-- Run this script in your MySQL database (phpMyAdmin or MySQL command line)

CREATE DATABASE IF NOT EXISTS amul_packaging;
USE amul_packaging;

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt VARCHAR(1000) NULL,
    faq LONGTEXT NULL,
    featured_image VARCHAR(500) NULL,
    author VARCHAR(100) NULL,
    status TINYINT NOT NULL DEFAULT 1 COMMENT '1 = Active, 0 = Inactive',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at DATETIME NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (optional - remove if not needed)
-- INSERT INTO blogs (title, slug, content, excerpt, featured_image, author, status, published_at)
-- VALUES 
-- ('Welcome to Our Blog', 'welcome-to-our-blog', 'This is the full content of the blog post...', 'This is a short excerpt', '/img/blog1.jpg', 'Admin', 1, NOW());

