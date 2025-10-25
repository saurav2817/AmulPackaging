<?php
// Email configuration
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'sales@amulpackaging.in');
define('SMTP_PASSWORD', '9004382696Ap$'); // Use App Password for Gmail
define('SMTP_FROM_EMAIL', 'sales@amulpackaging.in');
define('SMTP_FROM_NAME', 'Amul Packaging');

// Database configuration (if needed for future features)
define('DB_HOST', 'localhost');
define('DB_NAME', 'amul_packaging');
define('DB_USER', 'root');
define('DB_PASS', '');

// Site configuration
define('SITE_URL', 'https://amulpackaging.in/');
define('SITE_NAME', 'Amul Packaging');

// Security
define('API_KEY', 'your_secure_api_key_here');
define('RATE_LIMIT_PER_HOUR', 10); // Max 10 emails per hour per IP
?>
