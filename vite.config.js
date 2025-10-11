import { defineConfig } from 'vite';
import { copyFileSync } from 'fs';

export default defineConfig({
  base: '/', // Für Custom Domain (dwidmer.dev)
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
  },
  plugins: [
    // Plugin to copy HTML files to dist
    {
      name: 'copy-html-files',
      writeBundle() {
        const htmlFiles = ['app.html', 'website.html', 'impressum.html', 'app-privacy.html'];
        htmlFiles.forEach(file => {
          try {
            copyFileSync(file, `dist/${file}`);
            console.log(`✓ Copied ${file} to dist/`);
          } catch (err) {
            console.warn(`⚠ Could not copy ${file}:`, err.message);
          }
        });
      }
    }
  ]
});

