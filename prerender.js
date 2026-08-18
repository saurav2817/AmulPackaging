import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const port = 3000;
const app = express();

app.use(express.static(distDir));
// Fallback for SPA routing
app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
});

import { execSync } from 'child_process';

// Extract routes from dynamic PHP sitemap
async function getRoutesFromSitemap() {
    try {
        let xml = '';
        try {
            // Try fetching from the local PHP server that is currently running
            const res = await fetch('http://localhost:8000/sitemap.php');
            if (res.ok) {
                xml = await res.text();
            } else {
                throw new Error("HTTP " + res.status);
            }
        } catch (fetchErr) {
            // Fallback to calling the php executable directly using XAMPP path
            const sitemapPath = path.join(process.cwd(), 'api', 'sitemap.php');
            if (fs.existsSync(sitemapPath)) {
                xml = execSync(`D:\\xampp\\php\\php.exe "${sitemapPath}"`).toString();
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
        console.log(`Express serving dist on port ${port}`);
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
        
        // Wait an extra 1000ms to ensure react-helmet-async has injected tags into <head>
        await new Promise(r => setTimeout(r, 1000));
        
        // We need the FULL HTML so SEO tags in <head> are captured!
        const html = await page.content();
        prerendered[route] = html;
    }

    // Attempt to parse dynamic products if product_data.php or similar exists, but we can also rely on SEO tags for now,
    // or manually add dynamic product slugs if possible.
    // For now we do the main public routes.

    await browser.close();
    server.close();

    fs.writeFileSync(path.join(distDir, 'prerendered.json'), JSON.stringify(prerendered, null, 2));
    console.log('Saved dist/prerendered.json');
}

prerender().catch(console.error);
