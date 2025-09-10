# Amul Packaging Email API

This PHP backend API handles email sending for the Amul Packaging website contact forms.

## Features

- ✅ Contact form email handling
- ✅ Product enquiry email handling
- ✅ Auto-reply to customers
- ✅ Rate limiting (10 emails per hour per IP)
- ✅ Input validation and sanitization
- ✅ CORS support for React frontend
- ✅ HTML email templates
- ✅ SMTP support with PHPMailer
- ✅ Security headers

## Setup Instructions

### 1. Install Dependencies

```bash
cd api
composer install
```

### 2. Configure Email Settings

Edit `config.php` and update:

```php
define('SMTP_USERNAME', 'amulpackingonline@gmail.com');
define('SMTP_PASSWORD', 'your_app_password_here'); // Use App Password for Gmail
```

### 3. Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `config.php`

### 4. Server Requirements

- PHP 7.4 or higher
- `mail()` function enabled (for basic setup)
- PHPMailer (for SMTP setup)
- Composer (for dependency management)

## API Endpoints

### POST /send-mail.php
Basic email sending using PHP's `mail()` function.

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "message": "Hello, I need packaging solutions",
    "companyName": "ABC Company",
    "companyWebsite": "https://abc.com",
    "product": "Standup Pouch"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Email sent successfully!"
}
```

### POST /send-mail-smtp.php
Advanced email sending using SMTP with PHPMailer.

Same request/response format as above, but with better delivery rates.

## Frontend Integration

Update your React components to use the PHP API:

### Contact Form (Contact.jsx)
```javascript
const response = await fetch("http://yourdomain.com/api/send-mail.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
    })
});
```

### Enquiry Modal (enquiryModal.jsx)
```javascript
const response = await fetch("http://yourdomain.com/api/send-mail.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        companyWebsite: formData.CompanyWebsite,
        message: formData.message,
        product: product?.name || ""
    })
});
```

## Security Features

- Rate limiting (10 emails per hour per IP)
- Input validation and sanitization
- CORS protection
- Security headers
- File access restrictions

## Troubleshooting

### Email not sending
1. Check SMTP credentials in `config.php`
2. Verify server has `mail()` function enabled
3. Check server error logs
4. Test with PHPMailer version

### CORS errors
1. Ensure `.htaccess` is properly configured
2. Check server supports mod_headers
3. Verify API URL in frontend

### Rate limiting
- Each IP can send maximum 10 emails per hour
- Rate limit files are automatically cleaned up
- Adjust `RATE_LIMIT_PER_HOUR` in `config.php` if needed

## File Structure

```
api/
├── send-mail.php          # Basic email API
├── send-mail-smtp.php     # SMTP email API
├── config.php             # Configuration
├── composer.json          # Dependencies
├── .htaccess             # Server configuration
└── README.md             # This file
```
