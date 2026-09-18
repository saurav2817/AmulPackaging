<?php
header("Content-Type: application/xml; charset=utf-8");

require_once 'db_connection.php';
$db = new DatabasePDO();
$conn = $db->getConnection();

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// Static Pages
$staticPages = [
    ['loc' => '', 'freq' => 'weekly', 'priority' => '1.0'],
    ['loc' => 'about', 'freq' => 'monthly', 'priority' => '0.8'],
    ['loc' => 'products', 'freq' => 'weekly', 'priority' => '0.9'],
    ['loc' => 'services', 'freq' => 'monthly', 'priority' => '0.8'],
    ['loc' => 'industries-we-serve', 'freq' => 'monthly', 'priority' => '0.7'],
    ['loc' => 'contact', 'freq' => 'monthly', 'priority' => '0.8'],
    ['loc' => 'blog', 'freq' => 'weekly', 'priority' => '0.8'],
    // Product Pages
    ['loc' => 'products/standup-zipper-pouch-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/3-side-seal-pouch-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/flat-bottom-pouch-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/centre-seal-pouch-manufacturer-in-mumbai-bhiwandi', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/quad-seal-pouch-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/vacuum-pouch-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/shaped-pouch-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/spout-pouch-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/laminated-roll-stock-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/poly-bag-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/security-bag-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    ['loc' => 'products/ziplock-poly-bag-manufacturer-in-bhiwandi-mumbai', 'freq' => 'monthly', 'priority' => '0.6'],
    // Service Pages
    ['loc' => 'services/stand-up-pouch-manufacturer-in-bhiwandi', 'freq' => 'monthly', 'priority' => '0.7'],
    ['loc' => 'services/flat-bottom-pouch-supplier-in-bhiwandi', 'freq' => 'monthly', 'priority' => '0.7'],
    ['loc' => 'services/spout-pouch-in-mumbai', 'freq' => 'monthly', 'priority' => '0.7'],
    ['loc' => 'services/vacuum-pouch-In-bhiwandi', 'freq' => 'monthly', 'priority' => '0.7'],
    ['loc' => 'services/laminated-roll-stock-in-mumbai', 'freq' => 'monthly', 'priority' => '0.7'],
    ['loc' => 'services/poly-bags-manufacturer-in-mumbai', 'freq' => 'monthly', 'priority' => '0.7'],
    ['loc' => 'services/pillow-pouch', 'freq' => 'monthly', 'priority' => '0.7'],
];

$baseUrl = "https://www.amulpackaging.in/";

foreach ($staticPages as $page) {
    echo "  <url>\n";
    echo "    <loc>" . $baseUrl . htmlspecialchars($page['loc']) . "</loc>\n";
    echo "    <changefreq>" . $page['freq'] . "</changefreq>\n";
    echo "    <priority>" . $page['priority'] . "</priority>\n";
    echo "  </url>\n";
}

// Fetch dynamic blog posts
try {
    $stmt = $conn->prepare("SELECT slug, updated_at, created_at FROM blogs WHERE status = 1 ORDER BY created_at DESC");
    $stmt->execute();
    $blogs = $stmt->fetchAll();

    foreach ($blogs as $blog) {
        // Use updated_at if available, else created_at
        $date = !empty($blog['updated_at']) ? $blog['updated_at'] : $blog['created_at'];
        $lastmod = date('Y-m-d', strtotime($date));
        
        echo "  <url>\n";
        echo "    <loc>" . $baseUrl . "blog/" . htmlspecialchars($blog['slug']) . "</loc>\n";
        echo "    <lastmod>" . $lastmod . "</lastmod>\n";
        echo "    <changefreq>monthly</changefreq>\n";
        echo "    <priority>0.6</priority>\n";
        echo "  </url>\n";
    }
} catch (PDOException $e) {
    // Silently ignore DB errors in sitemap to prevent XML structure breakage, 
    // or log them if a logging mechanism exists.
}

echo '</urlset>';
?>
