import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const distDir = path.resolve('dist');
const port = 3000;
const app = express();

// In-memory cache for API GET responses to make pre-rendering fast and avoid redundant network calls
const apiCache = new Map();

// 1. Proxy API requests to the live production server so pre-rendering loads real blog data
app.use('/api', async (req, res) => {
    try {
        const targetUrl = `https://www.amulpackaging.in/api${req.url}`;
        
        if (req.method === 'GET' && apiCache.has(targetUrl)) {
            const cached = apiCache.get(targetUrl);
            res.status(200).set('Content-Type', cached.contentType).send(cached.body);
            return;
        }

        const apiRes = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                ...(req.headers['content-type'] ? { 'Content-Type': req.headers['content-type'] } : {})
            }
        });

        const contentType = apiRes.headers.get('content-type') || 'application/json';
        const data = await apiRes.arrayBuffer();
        const bodyBuf = Buffer.from(data);

        if (req.method === 'GET' && apiRes.status === 200) {
            apiCache.set(targetUrl, { contentType, body: bodyBuf });
        }

        res.status(apiRes.status).set('Content-Type', contentType).send(bodyBuf);
    } catch (err) {
        console.error(`Error proxying /api${req.url}:`, err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. Serve static files from dist
app.use(express.static(distDir));

// 3. Fallback for SPA routing
app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
});

// Extract routes from dynamic PHP sitemap
async function getRoutesFromSitemap() {
    try {
        let xml = '';
        try {
            // Try fetching from the LIVE server to get all dynamic routes (like new blogs)
            const res = await fetch('https://www.amulpackaging.in/api/sitemap.php');
            if (res.ok) {
                xml = await res.text();
            } else {
                throw new Error("HTTP " + res.status);
            }
        } catch (fetchErr) {
            try {
                // Try fetching from the local PHP server
                const res2 = await fetch('http://localhost:8000/sitemap.php');
                if (res2.ok) {
                    xml = await res2.text();
                } else {
                    throw new Error("HTTP " + res2.status);
                }
            } catch (err2) {
                // Fallback to calling the php executable directly using XAMPP path
                const sitemapPath = path.join(process.cwd(), 'api', 'sitemap.php');
                if (fs.existsSync(sitemapPath)) {
                    xml = execSync(`D:\\xampp\\php\\php.exe "${sitemapPath}"`).toString();
                }
            }
        }

        if (xml) {
            const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
            return urls
                .map(url => {
                    try {
                        const parsed = new URL(url);
                        return parsed.pathname;
                    } catch(e) {
                        return url;
                    }
                })
                .filter(pathname => pathname !== '/sitemap.xml' && pathname !== '/robots.txt');
        }
    } catch (e) {
        console.error("Could not fetch or execute php script for sitemap:", e.message);
    }
    return ['/']; // fallback
}

const routesPromise = getRoutesFromSitemap();

async function prerender() {
    const routes = await routesPromise;
    const server = app.listen(port, () => {
        console.log(`Express serving dist on port ${port} with live API proxy`);
    });

    const browser = await puppeteer.launch({ 
        headless: true,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });
    const page = await browser.newPage();
    const prerendered = {};

    for (const route of routes) {
        console.log(`Pre-rendering ${route}...`);
        await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'domcontentloaded' });
        try {
            await page.waitForSelector('#root > div', { timeout: 5000 });
        } catch (e) {
            console.log(`Timeout waiting for #root on ${route}, using what is there`);
        }

        // For blog listing, wait for articles to render
        if (route === '/blog') {
            try {
                await page.waitForSelector('article', { timeout: 10000 });
            } catch (e) {
                console.log(`Timeout waiting for blog articles on ${route}`);
            }
        } else if (route.startsWith('/blog/')) {
            // For single blog, wait until loading finishes
            try {
                await page.waitForFunction(() => {
                    const text = document.body ? document.body.innerText : '';
                    return !text.includes('Loading blog...');
                }, { timeout: 10000 });
            } catch (e) {
                console.log(`Timeout waiting for blog content on ${route}`);
            }
        }
        
        // Wait an extra 800ms to ensure react-helmet-async has injected tags into <head>
        await new Promise(r => setTimeout(r, 800));
        
        // We need the FULL HTML so SEO tags in <head> are captured!
        const html = await page.content();
        prerendered[route] = html;
    }

    await browser.close();
    server.close();

    fs.writeFileSync(path.join(distDir, 'prerendered.json'), JSON.stringify(prerendered, null, 2));
    console.log('Saved dist/prerendered.json');
}

prerender().catch(console.error);
