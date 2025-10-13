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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => "Field 'email' is required"]);
    exit();
}

$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

$ownerTo = SMTP_FROM_EMAIL;
$subject = 'New Newsletter Subscription';
$ownerBody = "<html><body>" .
             "<p>A new user subscribed to the newsletter.</p>" .
             "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>" .
             "</body></html>";

try {
    if (!class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
        throw new Exception('Mailer not available');
    }

    $mailer = new PHPMailer(true);
    // SMTP config
    $mailer->isSMTP();
    $mailer->Host = SMTP_HOST;
    $mailer->SMTPAuth = true;
    $mailer->Username = SMTP_USERNAME;
    $mailer->Password = SMTP_PASSWORD;
    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mailer->Port = SMTP_PORT;

    // Owner notification
    $mailer->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
    $mailer->addAddress($ownerTo);
    $mailer->isHTML(true);
    $mailer->Subject = $subject;
    $mailer->Body = $ownerBody;
    $mailer->send();

    // Confirmation to subscriber (best-effort)
    $mailer->clearAddresses();
    $mailer->addAddress($email);
    $mailer->Subject = 'You are subscribed to Amul Packaging newsletter';
    $mailer->Body = "<html><body><p>Thank you for subscribing to the Amul Packaging newsletter.</p><p>If this wasn't you, please ignore this email.</p></body></html>";
    $mailer->send();

    echo json_encode(['success' => true, 'message' => 'Subscribed successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to process subscription: ' . $e->getMessage()]);
}
?>


