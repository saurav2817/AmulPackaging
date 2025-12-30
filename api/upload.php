<?php
/**
 * Simple image upload handler for blog content and featured images.
 * Stores files in /api/uploads and returns a public URL path.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Helper to send JSON responses
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Ensure uploads directory exists
$uploadDir = __DIR__ . '/uploads';
if (!file_exists($uploadDir) && !mkdir($uploadDir, 0777, true)) {
    sendResponse(['success' => false, 'message' => 'Failed to create upload directory'], 500);
}

// Validate file
if (!isset($_FILES['image'])) {
    sendResponse(['success' => false, 'message' => 'No image file provided'], 400);
}

$file = $_FILES['image'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    sendResponse(['success' => false, 'message' => 'Upload failed with error code: ' . $file['error']], 400);
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$fileType = mime_content_type($file['tmp_name']);

if (!in_array($fileType, $allowedTypes)) {
    sendResponse(['success' => false, 'message' => 'Invalid image type. Allowed: jpg, png, gif, webp'], 400);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$safeExtension = $extension ? strtolower($extension) : 'jpg';
$filename = uniqid('blog_', true) . '.' . $safeExtension;
$destination = $uploadDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    sendResponse(['success' => false, 'message' => 'Failed to save uploaded file'], 500);
}

// Return a relative URL that works with the Vite proxy (/api)
$publicPath = '/api/uploads/' . $filename;

sendResponse([
    'success' => true,
    'message' => 'Image uploaded successfully',
    'url' => $publicPath,
    'path' => $publicPath
]);


