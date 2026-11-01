import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base path so it works on GitHub Pages (e.g. username.github.io/repo-name/)
  base: './',
  build: {
    outDir: 'dist'
  }
});
