import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/': 'https://api-meliorem-731d447a39bf.herokuapp.com',
    },
  },
});
