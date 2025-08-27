import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    https: false,
    proxy: {
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('error', (err, req) => {
            console.error('[proxy error]', req.url, err?.message);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('[proxy req]', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[proxy res]', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
})
