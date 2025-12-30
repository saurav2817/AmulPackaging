# Running PHP API with React Development Server

This guide explains how to run your PHP API alongside your React development server.

## Method 1: Using Vite Proxy (Recommended)

This is the easiest method - Vite will automatically proxy API requests to your PHP server.

### Setup Steps:

1. **Start XAMPP Apache**
   - Open XAMPP Control Panel
   - Start Apache (and MySQL if not already running)

2. **Configure Your Project Structure**
   - Make sure your `api` folder is accessible via Apache
   - If your project is in `htdocs`, the API should be at: `http://localhost/api/`
   - If your project is elsewhere, you may need to create a symlink or copy the api folder to `htdocs`

3. **Update API Base URL** (Already done!)
   - The API base URL is set to `/api` which uses relative paths
   - Vite proxy will forward these requests to `http://localhost/api`

4. **Start React Dev Server**
   ```bash
   npm run dev
   ```

5. **Access Your App**
   - React app: `http://localhost:3000`
   - API calls will be automatically proxied to `http://localhost/api`

### How It Works:

- When React makes a request to `/api/blogs.php`, Vite intercepts it
- Vite forwards the request to `http://localhost/api/blogs.php`
- PHP processes the request and returns the response
- Vite passes the response back to React

## Method 2: Using Absolute URLs (Alternative)

If the proxy doesn't work, you can use absolute URLs:

1. **Update `src/api/blogs.jsx`**:
   ```javascript
   const API_BASE_URL = 'http://localhost/api'; // or http://localhost:8080/api if different port
   ```

2. **Make sure CORS is enabled** (already done in `.htaccess`)

## Troubleshooting

### Issue: API requests return 404

**Solution:**
1. Check if Apache is running in XAMPP
2. Verify API folder is accessible at `http://localhost/api/`
3. Check browser Network tab to see the actual request URL
4. If XAMPP is on a different port (e.g., 8080), update `vite.config.js`:
   ```javascript
   proxy: {
     '/api': {
       target: 'http://localhost:8080', // Your XAMPP port
       changeOrigin: true,
       secure: false,
     }
   }
   ```

### Issue: CORS errors

**Solution:**
- The `.htaccess` file already includes CORS headers
- Make sure Apache has `mod_headers` enabled
- Check if `.htaccess` is being read (some Apache configs ignore it)

### Issue: Proxy not working

**Solution:**
1. Restart the Vite dev server after changing `vite.config.js`
2. Check Vite console for proxy errors
3. Try using absolute URL method instead

## Project Structure

For the proxy to work, your project structure should be:

```
AmulPackaging/
├── api/              # PHP API files
│   ├── blogs.php
│   ├── config.php
│   └── ...
├── src/              # React source files
├── vite.config.js    # Vite config with proxy
└── package.json
```

## Quick Start Checklist

- [ ] XAMPP Apache is running
- [ ] MySQL is running (for database)
- [ ] API folder is accessible at `http://localhost/api/`
- [ ] Vite proxy is configured in `vite.config.js`
- [ ] API base URL is set to `/api` in `src/api/blogs.jsx`
- [ ] Run `npm run dev`
- [ ] Test API: Visit `http://localhost:3000/admin/blogs`

## Testing the Setup

1. **Test PHP API directly:**
   - Visit: `http://localhost/api/blogs.php`
   - Should see JSON response (or error if database not set up)

2. **Test through React:**
   - Start React: `npm run dev`
   - Visit: `http://localhost:3000/admin/blogs`
   - Should load blog management page

3. **Check Browser Console:**
   - Open DevTools → Network tab
   - Look for `/api/blogs.php` requests
   - Should show successful responses

## Notes

- The proxy only works in development mode (`npm run dev`)
- For production, you'll need to configure your web server (Apache/Nginx) to serve both React build and PHP API
- Make sure your `api` folder has proper permissions for Apache to read PHP files

