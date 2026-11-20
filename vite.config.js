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
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://www.amulpackaging.in',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    port: 3000,
    open: true,
    historyApiFallback: true
  }
})
