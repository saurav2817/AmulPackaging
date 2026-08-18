import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const phpPath = path.join(distDir, 'index.php');

if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found. Run npm run build first.');
    process.exit(1);
}

// Read the generic SPA index.html
let shellHtml = fs.readFileSync(indexPath, 'utf8');

// 1. Create a generic 404.html from the SPA shell for Apache ErrorDocument fallback
const notFoundHtml = shellHtml.replace(
    '</head>',
    '  <title>404 Not Found | Amul Packaging</title>\n  <meta name="description" content="The page you are looking for does not exist." />\n</head>'
);
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

// 2. Load the fully prerendered HTML strings from prerendered.json
const prerenderedPath = path.join(distDir, 'prerendered.json');
let prerendered = {};
if (fs.existsSync(prerenderedPath)) {
    prerendered = JSON.parse(fs.readFileSync(prerenderedPath, 'utf8'));
}

// 3. Generate static HTML files for every route
for (const [route, html] of Object.entries(prerendered)) {
    if (!html) continue;

    if (route === '/' || route === '') {
        // Overwrite the main index.html with the homepage prerendered HTML
        fs.writeFileSync(indexPath, html);
    } else {
        // Create subdirectories for nested routes
        const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
        const routeDir = path.join(distDir, cleanRoute);
        
        if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
        }
        
        // Write the static index.html for this route
        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    }
}

// 4. Generate .htaccess for real 301s, 404s, and SPA fallbacks
const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Permanent 301 Redirects for Old/Duplicate URLs
  Redirect 301 /products/7 /products/shaped-pouch
  Redirect 301 /products/7/shaped-pouch /products/shaped-pouch
  Redirect 301 /products/8/about /products/spout-pouch
  Redirect 301 /products/8/spout-pouch /products/spout-pouch
  Redirect 301 /products/11 /products/security-bags
  Redirect 301 /products/11/security-bags /products/security-bags
  Redirect 301 /products/10/poly-bags- /products/poly-bags
  Redirect 301 /products/1/standup-zipper-pouch /products/stand-up-zipper-pouch
  Redirect 301 /products/3/flat-bottom-pouch /products/flat-bottom-pouch
  Redirect 301 /products/6/vacuum-pouch /products/vacuum-pouch
  Redirect 301 /products/9/laminated-roll-stock /products/laminated-roll-stock
  Redirect 301 /IndustriesWeServe /industries-we-serve
  Redirect 301 /blogs /blog
  Redirect 301 /Blog /blog
  RedirectMatch 301 ^/admin/?$ /admin/blogs

  # Force trailing slash for directories (standard Apache behavior)
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^(.*[^/])$ /$1/ [R=301,L]

  # SPA Routing (only for the Admin dashboard which we don't pre-render)
  # This ensures /admin/* returns 200 and loads the React app.
  RewriteCond %{REQUEST_URI} ^/admin/ [NC]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ /index.html [L]

  # Real 404 for missing pages (returns HTTP 404 and serves React app to show NotFound UI)
  ErrorDocument 404 /404.html
</IfModule>
`;

fs.writeFileSync(path.join(distDir, '.htaccess'), htaccessContent);

// Remove the obsolete PHP file if it exists
if (fs.existsSync(phpPath)) {
    fs.unlinkSync(phpPath);
}

console.log('Successfully generated full Static Site (SSG) with correct SEO tags, 301s, and real 404s.');