<?php
/**
 * Blog API Endpoints (Simplified Version)
 * Uses query parameters for better compatibility
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

$db = new DatabasePDO();
$conn = $db->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

// Helper functions
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function generateSlug($title) {
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

// Get all blogs or single blog
if ($method === 'GET') {
    try {
        if ($action === 'recent') {
            // Get recent blogs
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
            $excludeId = isset($_GET['exclude']) ? (int)$_GET['exclude'] : null;
            
            // MySQL LIMIT requires integer, not placeholder in some cases
            $limit = (int)$limit; // Ensure it's an integer
            if ($excludeId) {
                $stmt = $conn->prepare("SELECT id, title, slug, featured_image, created_at FROM blogs WHERE status = 1 AND id != ? ORDER BY created_at DESC LIMIT " . $limit);
                $stmt->execute([$excludeId]);
            } else {
                $stmt = $conn->prepare("SELECT id, title, slug, featured_image, created_at FROM blogs WHERE status = 1 ORDER BY created_at DESC LIMIT " . $limit);
                $stmt->execute();
            }
            
            $blogs = $stmt->fetchAll();
            foreach ($blogs as &$blog) {
                if (isset($blog['created_at'])) {
                    $blog['created_at'] = date('Y-m-d H:i:s', strtotime($blog['created_at']));
                }
            }
            sendResponse(['success' => true, 'data' => $blogs]);
        } elseif ($id) {
            // Get single blog by ID
            $stmt = $conn->prepare("SELECT * FROM blogs WHERE id = ?");
            $stmt->execute([$id]);
            $blog = $stmt->fetch();
            
            if (!$blog) {
                // Try by slug
                $slug = $_GET['id'];
                $stmt = $conn->prepare("SELECT * FROM blogs WHERE slug = ?");
                $stmt->execute([$slug]);
                $blog = $stmt->fetch();
            }
            
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
        } else {
            // Get all blogs
            $status = isset($_GET['status']) ? (int)$_GET['status'] : null;
            $admin = isset($_GET['admin']) && $_GET['admin'] === 'true';
            
            if ($admin || $status !== null) {
                if ($status !== null) {
                    $stmt = $conn->prepare("SELECT * FROM blogs WHERE status = ? ORDER BY created_at DESC");
                    $stmt->execute([$status]);
                } else {
                    $stmt = $conn->prepare("SELECT * FROM blogs ORDER BY created_at DESC");
                    $stmt->execute();
                }
            } else {
                $stmt = $conn->prepare("SELECT * FROM blogs WHERE status = 1 ORDER BY created_at DESC");
                $stmt->execute();
            }
            
            $blogs = $stmt->fetchAll();
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
        }
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Error: ' . $e->getMessage()], 500);
    }
}

// Create blog
if ($method === 'POST' && !$id) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['title']) || !isset($data['content'])) {
        sendResponse(['success' => false, 'message' => 'Title and content are required'], 400);
    }
    
    try {
        $title = $data['title'];
        $slug = isset($data['slug']) && !empty($data['slug']) ? $data['slug'] : generateSlug($title);
        $content = $data['content'];
        $excerpt = isset($data['excerpt']) ? $data['excerpt'] : null;
        $featured_image = isset($data['featured_image']) ? $data['featured_image'] : null;
        $author = isset($data['author']) ? $data['author'] : 'Admin';
        $status = isset($data['status']) ? (int)$data['status'] : 1;
        $published_at = isset($data['published_at']) && $data['published_at'] ? $data['published_at'] : null;
        
        // Check if slug exists
        $checkStmt = $conn->prepare("SELECT id FROM blogs WHERE slug = ?");
        $checkStmt->execute([$slug]);
        if ($checkStmt->fetch()) {
            $slug = $slug . '-' . time();
        }
        
        $stmt = $conn->prepare("INSERT INTO blogs (title, slug, content, excerpt, featured_image, author, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$title, $slug, $content, $excerpt, $featured_image, $author, $status, $published_at]);
        
        $blogId = $conn->lastInsertId();
        
        $stmt = $conn->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$blogId]);
        $blog = $stmt->fetch();
        
        sendResponse(['success' => true, 'message' => 'Blog created successfully', 'data' => $blog], 201);
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Error creating blog: ' . $e->getMessage()], 500);
    }
}

// Update blog
if (($method === 'PUT' || $method === 'POST') && $id && $action !== 'toggle-status') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $checkStmt = $conn->prepare("SELECT id FROM blogs WHERE id = ?");
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            sendResponse(['success' => false, 'message' => 'Blog not found'], 404);
        }
        
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
            $slug = generateSlug($data['title']);
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
        
        $stmt = $conn->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        $blog = $stmt->fetch();
        
        sendResponse(['success' => true, 'message' => 'Blog updated successfully', 'data' => $blog]);
    } catch (PDOException $e) {
        sendResponse(['success' => false, 'message' => 'Error updating blog: ' . $e->getMessage()], 500);
    }
}

// Delete blog
if ($method === 'DELETE' && $id) {
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

// Toggle status
if (($method === 'PATCH' || ($method === 'POST' && $action === 'toggle-status')) && $id) {
    try {
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

sendResponse(['success' => false, 'message' => 'Method not allowed'], 405);
?>

