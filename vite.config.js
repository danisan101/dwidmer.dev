import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative Pfade für GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          games: ['./src/js/modules/snake.js', './src/js/modules/tetris.js']
        }
      }
    },
    // Copy CNAME file to dist
    copyPublicDir: true
  },
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  }
});

