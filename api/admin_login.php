<?php
/**
 * Admin Login Endpoint
 * Verifies admin credentials stored in MySQL (admin_users table)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db_connection.php';

$db = new DatabasePDO();
$conn = $db->getConnection();

function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Ensure admin_users table exists (idempotent) and seed a default admin if table is empty
function ensureAdminTable($conn) {
    $createTableSql = "
        CREATE TABLE IF NOT EXISTS admin_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(150) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            api_token VARCHAR(255) NULL,
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            last_login_at DATETIME NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $conn->exec($createTableSql);

    // Seed a default admin if none exists
    $stmt = $conn->query("SELECT COUNT(*) as total FROM admin_users");
    $count = (int)$stmt->fetch()['total'];

    if ($count === 0) {
        $defaultUsername = 'admin';
        $defaultPassword = 'amul@123';
        $passwordHash = password_hash($defaultPassword, PASSWORD_BCRYPT);

        $seedSql = "INSERT INTO admin_users (username, password_hash, is_active) VALUES (?, ?, 1)";
        $seedStmt = $conn->prepare($seedSql);
        $seedStmt->execute([$defaultUsername, $passwordHash]);
    }
}

try {
    ensureAdminTable($conn);
} catch (PDOException $e) {
    sendResponse(['success' => false, 'message' => 'DB setup failed: ' . $e->getMessage()], 500);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);
$username = isset($data['username']) ? trim($data['username']) : '';
$password = isset($data['password']) ? $data['password'] : '';

if ($username === '' || $password === '') {
    sendResponse(['success' => false, 'message' => 'Username and password are required'], 400);
}

try {
    $stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = ? AND is_active = 1 LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        sendResponse(['success' => false, 'message' => 'Invalid credentials'], 401);
    }

    // Generate and persist a new API token
    $token = bin2hex(random_bytes(32));
    $update = $conn->prepare("UPDATE admin_users SET api_token = ?, last_login_at = NOW() WHERE id = ?");
    $update->execute([$token, $user['id']]);

    sendResponse([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
        ]
    ]);
} catch (PDOException $e) {
    sendResponse(['success' => false, 'message' => 'Login error: ' . $e->getMessage()], 500);
} catch (Exception $e) {
    sendResponse(['success' => false, 'message' => 'Unexpected error: ' . $e->getMessage()], 500);
}

?>

