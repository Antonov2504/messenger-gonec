import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@modules': resolve(__dirname, 'src/modules'),
      '@layout': resolve(__dirname, 'src/layout'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@helpers': resolve(__dirname, 'src/helpers'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
});
