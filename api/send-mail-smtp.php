<?php
ini_set('display_errors', '0');
error_reporting(E_ALL);
require_once 'config.php';
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Rate limiting (simple IP-based)
$clientIP = $_SERVER['REMOTE_ADDR'];
$rateLimitFile = 'rate_limit_' . md5($clientIP) . '.txt';
$currentTime = time();
$rateLimitData = [];

if (file_exists($rateLimitFile)) {
    $rateLimitData = json_decode(file_get_contents($rateLimitFile), true);
}

// Clean old entries (older than 1 hour)
$rateLimitData = array_filter($rateLimitData, function($timestamp) use ($currentTime) {
    return ($currentTime - $timestamp) < 3600;
});

// Check rate limit
if (count($rateLimitData) >= RATE_LIMIT_PER_HOUR) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Rate limit exceeded. Please try again later.']);
    exit();
}

// Add current request to rate limit
$rateLimitData[] = $currentTime;
file_put_contents($rateLimitFile, json_encode($rateLimitData));

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$requiredFields = ['name', 'email', 'message'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
        exit();
    }
}

// Sanitize input
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($input['phone']) ? htmlspecialchars(trim($input['phone'])) : '';
$companyName = isset($input['companyName']) ? htmlspecialchars(trim($input['companyName'])) : '';
$companyWebsite = isset($input['companyWebsite']) ? htmlspecialchars(trim($input['companyWebsite'])) : '';
$message = htmlspecialchars(trim($input['message']));
$product = isset($input['product']) ? htmlspecialchars(trim($input['product'])) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Email configuration
$to = SMTP_FROM_EMAIL;
$subject = !empty($product) ? "New Product Enquiry: $product" : "New Contact Form Submission";
$replyTo = $email;

// Create email body
$emailBody = "
<html>
<head>
    <title>$subject</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #ffcb08; color: #000; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .footer { background-color: #333; color: #fff; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Amul Packaging - New " . (!empty($product) ? 'Product Enquiry' : 'Contact Form') . "</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>$email</div>
            </div>";

if (!empty($phone)) {
    $emailBody .= "
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>$phone</div>
            </div>";
}

if (!empty($companyName)) {
    $emailBody .= "
            <div class='field'>
                <div class='label'>Company Name:</div>
                <div class='value'>$companyName</div>
            </div>";
}

if (!empty($companyWebsite)) {
    $emailBody .= "
            <div class='field'>
                <div class='label'>Company Website:</div>
                <div class='value'>$companyWebsite</div>
            </div>";
}

if (!empty($product)) {
    $emailBody .= "
            <div class='field'>
                <div class='label'>Product:</div>
                <div class='value'>$product</div>
            </div>";
}

$emailBody .= "
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the Amul Packaging website contact form.</p>
            <p>Reply directly to this email to respond to the customer.</p>
        </div>
    </div>
</body>
</html>";

// Use PHPMailer for better email delivery (recommended)
if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;

        // Recipients
        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        $mail->addAddress($to);
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $emailBody;

        $mail->send();

        // Send auto-reply to customer
        $customerSubject = "Thank you for contacting Amul Packaging";
        $customerBody = "
        <html>
        <head>
            <title>$customerSubject</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #ffcb08; color: #000; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; }
                .footer { background-color: #333; color: #fff; padding: 15px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>Amul Packaging</h2>
                </div>
                <div class='content'>
                    <p>Dear $name,</p>
                    <p>Thank you for contacting Amul Packaging! We have received your " . (!empty($product) ? 'product enquiry' : 'message') . " and our team will get back to you within 1 business day.</p>
                    <p>If you have any urgent requirements, please call us at <strong>+91 9004382696</strong>.</p>
                    <p>Best regards,<br>Amul Packaging Team</p>
                </div>
                <div class='footer'>
                    <p>P-3A, Raj Laxmi HiTech Textile Park, Sonale Village, Bhiwandi, Maharashtra 421302</p>
                    <p>Email: amulpackingonline@gmail.com | Phone: +91 9004382696</p>
                </div>
            </div>
        </body>
        </html>";

        $mail->clearAddresses();
        $mail->addAddress($email, $name);
        $mail->Subject = $customerSubject;
        $mail->Body = $customerBody;
        $mail->send();

        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully!'
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send email: ' . $mail->ErrorInfo
        ]);
    }
} else {
    // Fallback to basic mail() function
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . SMTP_FROM_NAME . ' <' . SMTP_FROM_EMAIL . '>',
        'Reply-To: ' . $name . ' <' . $replyTo . '>',
        'X-Mailer: PHP/' . phpversion()
    ];

    $mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

    if ($mailSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully!'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send email. Please try again later.'
        ]);
    }
}
?>
