import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'bundle-analysis.html'
    }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
    }),
    compression({
      algorithms: ['brotliCompress'],
      exclude: [/^(.+)\.(br)$/, /-br\.(js|mjs|json|css|html)$/],
    }),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-intersection-observer'],
    exclude: ['lucide-react'],
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react', 'react-icons'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
});
