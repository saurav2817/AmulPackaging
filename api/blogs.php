<?php
/**
 * Blog API Endpoints
 * Handles CRUD operations for blogs
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db_connection.php';

// Use PDO for better compatibility (you can switch to Database class if using sqlsrv)
$db = new DatabasePDO();
$conn = $db->getConnection();

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];

// Handle PATCH method (some servers don't support it natively)
if ($method === 'POST' && isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
    $method = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
}

$path = $_SERVER['REQUEST_URI'];
$pathInfo = parse_url($path, PHP_URL_PATH);
$pathParts = array_filter(explode('/', trim($pathInfo, '/')));
$pathParts = array_values($pathParts); // Re-index array

// Remove the script filename (e.g. blogs.php) from path parts so
// requests like /api/blogs.php?admin=true are treated as the root
// and requests like /api/blogs.php/recent map to ['recent'].
$scriptName = basename($_SERVER['SCRIPT_NAME']);
$scriptIndex = array_search($scriptName, $pathParts, true);
if ($scriptIndex !== false) {
    $pathParts = array_values(array_slice($pathParts, $scriptIndex + 1));
}

// Helper function to send JSON response
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Helper function to generate slug from title
function generateSlug($title) {
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

// Helper: extract bearer token from Authorization header
function getBearerToken() {
    $headers = [];
    if (function_exists('getallheaders')) {
        $headers = getallheaders();
    }
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers['Authorization'] = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['Authorization'])) {
        $headers['Authorization'] = $_SERVER['Authorization'];
    }

    if (!isset($headers['Authorization'])) {
        return null;
    }

    if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
        return $matches[1];
    }

    return null;
}

// Require a valid admin token for write operations
function requireAdminAuth($conn) {
    $token = getBearerToken();
    if (!$token) {
        sendResponse(['success' => false, 'message' => 'Unauthorized'], 401);
    }

    try {
        $stmt = $conn->prepare("SELECT id FROM admin_users WHERE api_token = ? AND is_active = 1 LIMIT 1");
        $stmt->execute([$token]);
        $admin = $stmt->fetch();

        if (!$admin) {
            sendResponse(['success' => false, 'message' => 'Invalid or expired token'], 401);
        }

        return $admin;
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Auth check failed: ' . $e->getMessage()], 500);
    }
}

// Get all blogs (for admin) or active blogs only (for users)
// Path structure: /api/blogs.php or /api/blogs.php/
// If an `id` query parameter is supplied, treat it as a single-blog request
// and let the single-blog handler below handle it.
if ($method === 'GET' && !isset($_GET['id']) && count($pathParts) === 0) {
    $status = isset($_GET['status']) ? (int)$_GET['status'] : null;
    $admin = isset($_GET['admin']) && $_GET['admin'] === 'true';
    
    try {
        if ($admin || $status !== null) {
            // Admin view or filtered by status
            if ($status !== null) {
                $stmt = $conn->prepare("SELECT * FROM blogs WHERE status = ? ORDER BY created_at DESC");
                $stmt->execute([$status]);
            } else {
                $stmt = $conn->prepare("SELECT * FROM blogs ORDER BY created_at DESC");
                $stmt->execute();
            }
        } else {
            // User view - only active blogs
            $stmt = $conn->prepare("SELECT * FROM blogs WHERE status = 1 ORDER BY created_at DESC");
            $stmt->execute();
        }
        
        $blogs = $stmt->fetchAll();
        
        // Format dates
        foreach ($blogs as &$blog) {
            if (isset($blog['created_at'])) {
                $blog['created_at'] = date('Y-m-d H:i:s', strtotime($blog['created_at']));
            }
            if (isset($blog['updated_at'])) {
                $blog['updated_at'] = date('Y-m-d H:i:s', strtotime($blog['updated_at']));
            }
            if (isset($blog['published_at']) && $blog['published_at']) {
                $blog['published_at'] = date('Y-m-d H:i:s', strtotime($blog['published_at']));
            }
        }
        
        sendResponse(['success' => true, 'data' => $blogs]);
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Error fetching blogs: ' . $e->getMessage()], 500);
    }
}

// Get single blog by ID or slug
// Path structure: /api/blogs.php/{id} or /api/blogs.php/{slug}
// Support identifier being in $pathParts[0] (preferred) or $pathParts[1]
if ($method === 'GET') {
    $identifier = $pathParts[0] ?? $pathParts[1] ?? null;
    if ($identifier !== null && $identifier !== 'recent') {
    
        try {
        // Check if identifier is numeric (ID) or string (slug)
        if (is_numeric($identifier)) {
            $stmt = $conn->prepare("SELECT * FROM blogs WHERE id = ?");
            $stmt->execute([$identifier]);
        } else {
            $stmt = $conn->prepare("SELECT * FROM blogs WHERE slug = ?");
            $stmt->execute([$identifier]);
        }
        
        $blog = $stmt->fetch();
        
        if (!$blog) {
            sendResponse(['success' => false, 'message' => 'Blog not found'], 404);
        }
        
        // Format dates
        if (isset($blog['created_at'])) {
            $blog['created_at'] = date('Y-m-d H:i:s', strtotime($blog['created_at']));
        }
        if (isset($blog['updated_at'])) {
            $blog['updated_at'] = date('Y-m-d H:i:s', strtotime($blog['updated_at']));
        }
        if (isset($blog['published_at']) && $blog['published_at']) {
            $blog['published_at'] = date('Y-m-d H:i:s', strtotime($blog['published_at']));
        }
        
            sendResponse(['success' => true, 'data' => $blog]);
        } catch (PDOException $e) {
            sendResponse(['success' => false, 'message' => 'Error fetching blog: ' . $e->getMessage()], 500);
        }
        exit();
    }
}

// Get recent blogs (for sidebar)
// Path structure: /api/blogs.php/recent
if ($method === 'GET') {
    $segment = $pathParts[0] ?? $pathParts[1] ?? null;

    if ($segment === 'recent') {
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
        $excludeId = isset($_GET['exclude']) ? (int)$_GET['exclude'] : null;

        try {
            // MySQL LIMIT requires integer
            $limit = (int)$limit;

            if ($excludeId) {
                $stmt = $conn->prepare(
                    "SELECT id, title, slug, featured_image, created_at
                     FROM blogs
                     WHERE status = 1 AND id != ?
                     ORDER BY created_at DESC
                     LIMIT " . $limit
                );
                $stmt->execute([$excludeId]);
            } else {
                $stmt = $conn->prepare(
                    "SELECT id, title, slug, featured_image, created_at
                     FROM blogs
                     WHERE status = 1
                     ORDER BY created_at DESC
                     LIMIT " . $limit
                );
                $stmt->execute();
            }

            $blogs = $stmt->fetchAll();

            // Format dates
            foreach ($blogs as &$blog) {
                if (isset($blog['created_at'])) {
                    $blog['created_at'] = date('Y-m-d H:i:s', strtotime($blog['created_at']));
                }
            }

            sendResponse(['success' => true, 'data' => $blogs]);
        } catch (PDOException $e) {
            sendResponse(['success' => false, 'message' => 'Error fetching recent blogs: ' . $e->getMessage()], 500);
        }
    } 
} 


// Create new blog
// Only treat as create when there is no `action` query parameter
// (POST requests with an `action` are used for other operations like toggle-status)
if ($method === 'POST' && !isset($_GET['action'])) {
    requireAdminAuth($conn);
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['title']) || !isset($data['content'])) {
        sendResponse(['success' => false, 'message' => 'Title and content are required'], 400);
    }
    
    try {
        $title = $data['title'];
        $slug = isset($data['slug']) && !empty($data['slug']) ? $data['slug'] : generateSlug($title);
        $content = $data['content'];
        $excerpt = isset($data['excerpt']) ? $data['excerpt'] : null;
        // Accept raw FAQ script or JSON pasted by admin as a string
        $faq = isset($data['faq']) ? $data['faq'] : null;
        $featured_image = isset($data['featured_image']) ? $data['featured_image'] : null;
        $author = isset($data['author']) ? $data['author'] : 'Admin';
        $status = isset($data['status']) ? (int)$data['status'] : 1;
        $published_at = isset($data['published_at']) && $data['published_at'] ? $data['published_at'] : null;
        
        // Check if slug already exists
        $checkStmt = $conn->prepare("SELECT id FROM blogs WHERE slug = ?");
        $checkStmt->execute([$slug]);
        if ($checkStmt->fetch()) {
            $slug = $slug . '-' . time();
        }
        
        $stmt = $conn->prepare("INSERT INTO blogs (title, slug, content, excerpt, faq, featured_image, author, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$title, $slug, $content, $excerpt, $faq, $featured_image, $author, $status, $published_at]);
        
        $blogId = $conn->lastInsertId();
        
        // Fetch the created blog
        $stmt = $conn->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$blogId]);
        $blog = $stmt->fetch();
        
        sendResponse(['success' => true, 'message' => 'Blog created successfully', 'data' => $blog], 201);
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Error creating blog: ' . $e->getMessage()], 500);
    }
}

// Update blog
// Path structure: /api/blogs.php/{id}
if (($method === 'PUT' || $method === 'POST')) {
    $idCandidate = $_GET['id'] ?? ($pathParts[0] ?? $pathParts[1] ?? null);
    if ($idCandidate !== null && is_numeric($idCandidate)) {
        requireAdminAuth($conn);
        $id = (int)$idCandidate;
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$id) {
        sendResponse(['success' => false, 'message' => 'Invalid blog ID'], 400);
    }
    
    try {
        // Check if blog exists
        $checkStmt = $conn->prepare("SELECT id FROM blogs WHERE id = ?");
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            sendResponse(['success' => false, 'message' => 'Blog not found'], 404);
        }
        
        // Build update query dynamically
        $updateFields = [];
        $params = [];
        
        if (isset($data['title'])) {
            $updateFields[] = "title = ?";
            $params[] = $data['title'];
        }
        if (isset($data['slug'])) {
            $updateFields[] = "slug = ?";
            $params[] = $data['slug'];
        } elseif (isset($data['title'])) {
            // Auto-generate slug if title changed
            $slug = generateSlug($data['title']);
            // Check if slug exists (excluding current blog)
            $checkSlug = $conn->prepare("SELECT id FROM blogs WHERE slug = ? AND id != ?");
            $checkSlug->execute([$slug, $id]);
            if ($checkSlug->fetch()) {
                $slug = $slug . '-' . time();
            }
            $updateFields[] = "slug = ?";
            $params[] = $slug;
        }
        if (isset($data['content'])) {
            $updateFields[] = "content = ?";
            $params[] = $data['content'];
        }
        if (isset($data['excerpt'])) {
            $updateFields[] = "excerpt = ?";
            $params[] = $data['excerpt'];
        }
        if (isset($data['faq'])) {
            $updateFields[] = "faq = ?";
            $params[] = $data['faq'];
        }
        if (isset($data['featured_image'])) {
            $updateFields[] = "featured_image = ?";
            $params[] = $data['featured_image'];
        }
        if (isset($data['author'])) {
            $updateFields[] = "author = ?";
            $params[] = $data['author'];
        }
        if (isset($data['status'])) {
            $updateFields[] = "status = ?";
            $params[] = (int)$data['status'];
        }
        if (isset($data['published_at'])) {
            $updateFields[] = "published_at = ?";
            $params[] = $data['published_at'];
        }
        
        $updateFields[] = "updated_at = NOW()";
        $params[] = $id;
        
        $sql = "UPDATE blogs SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        
        // Fetch updated blog
        $stmt = $conn->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        $blog = $stmt->fetch();
        
        sendResponse(['success' => true, 'message' => 'Blog updated successfully', 'data' => $blog]);
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Error updating blog: ' . $e->getMessage()], 500);
    }
    }
}

// Delete blog
// Path structure: /api/blogs.php/{id}
if ($method === 'DELETE') {
    $idCandidate = $_GET['id'] ?? ($pathParts[0] ?? $pathParts[1] ?? null);
    if ($idCandidate !== null && is_numeric($idCandidate)) {
        requireAdminAuth($conn);
        $id = (int)$idCandidate;
    
    if (!$id) {
        sendResponse(['success' => false, 'message' => 'Invalid blog ID'], 400);
    }
    
    try {
        $stmt = $conn->prepare("DELETE FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            sendResponse(['success' => true, 'message' => 'Blog deleted successfully']);
        } else {
            sendResponse(['success' => false, 'message' => 'Blog not found'], 404);
        }
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Error deleting blog: ' . $e->getMessage()], 500);
    }
    }
}

// Toggle blog status (activate/deactivate)
// Path structure: /api/blogs.php/{id}/toggle-status
if ($method === 'PATCH' || ($method === 'POST' && isset($_GET['action']) && $_GET['action'] === 'toggle-status')) {
    $idCandidate = $_GET['id'] ?? ($pathParts[0] ?? $pathParts[1] ?? null);
    if ($idCandidate !== null && is_numeric($idCandidate)) {
        requireAdminAuth($conn);
        $id = (int)$idCandidate;
    
    if (!$id) {
        sendResponse(['success' => false, 'message' => 'Invalid blog ID'], 400);
    }
    
    try {
        // Get current status
        $stmt = $conn->prepare("SELECT status FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        $blog = $stmt->fetch();
        
        if (!$blog) {
            sendResponse(['success' => false, 'message' => 'Blog not found'], 404);
        }
        
        $newStatus = $blog['status'] == 1 ? 0 : 1;
        
        $stmt = $conn->prepare("UPDATE blogs SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([$newStatus, $id]);
        
        sendResponse(['success' => true, 'message' => 'Blog status updated', 'data' => ['status' => $newStatus]]);
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Error updating blog status: ' . $e->getMessage()], 500);
    }
    }
}

// Method not allowed
sendResponse(['success' => false, 'message' => 'Method not allowed'], 405);

?>

