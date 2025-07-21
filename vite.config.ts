import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Chemin relatif pour éviter les problèmes d'hébergement
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['./src/components/SystemEngine/AutomationCore', './src/components/Performance/PerformanceEngine']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
