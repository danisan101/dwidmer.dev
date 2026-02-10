import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/', // Für Custom Domain (dwidmer.dev)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
        website: resolve(__dirname, 'website.html'),
        monodot: resolve(__dirname, 'monodot.html'),
        monodotPrivacy: resolve(__dirname, 'monodot-privacy.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        appPrivacy: resolve(__dirname, 'app-privacy.html'),
      },
      output: {
        manualChunks: {
          games: ['./src/js/modules/snake.js', './src/js/modules/tetris.js']
        }
      }
    },
    copyPublicDir: true
  },
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  }
});
