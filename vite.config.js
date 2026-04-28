import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  // GitHub Pages project site is served under /<repo-name>/
  base: '/project-1-workshop-start-to-code-milanaveronique/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        game: resolve(__dirname, 'pages/game.html'),
        tutorial: resolve(__dirname, 'pages/tutorial.html'),
      },
    },
  },
});
