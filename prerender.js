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

// Extract routes from sitemap.xml
function getRoutesFromSitemap() {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
        const xml = fs.readFileSync(sitemapPath, 'utf8');
        const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
        return urls
            .map(url => {
                const parsed = new URL(url);
                return parsed.pathname;
            })
            // Filter out files or unwanted paths if needed
            .filter(pathname => pathname !== '/sitemap.xml' && pathname !== '/robots.txt');
    }
    return ['/']; // fallback
}

const routes = getRoutesFromSitemap();

async function prerender() {
    const server = app.listen(port, () => {
        console.log(`Express serving dist on port ${port}`);
    });

    const browser = await puppeteer.launch({ headless: 'new' });
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
        const html = await page.$eval('#root', el => el.innerHTML);
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
