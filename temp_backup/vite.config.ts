import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@atoms': path.resolve(__dirname, 'src/atoms'),
      '@molecules': path.resolve(__dirname, 'src/molecules'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@service-urls': path.resolve(__dirname, 'src/service-urls'),
      '@context': path.resolve(__dirname, 'src/context'),
    },
  },
});
