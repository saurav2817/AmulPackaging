import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000, // Change this if needed
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        // Point to the PHP built-in server (see instructions)
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  preview: {
    port: 3000,
    open: true,
    historyApiFallback: true
  }
})
