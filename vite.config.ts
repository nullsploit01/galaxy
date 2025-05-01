import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  build: {
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
});
