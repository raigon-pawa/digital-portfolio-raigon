import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Bundle lucide-react icons together
          if (id.includes('lucide-react')) {
            return 'lucide-icons';
          }
          // Bundle vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  esbuild: {
    target: 'es2015',
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  server: {
    // Only allow specific hosts for security
    host: process.env.NODE_ENV === 'development' ? 'localhost' : false,
    hmr: {
      overlay: true,
    },
    fs: {
      strict: true, // Enable strict file system access
      // Only allow accessing files from workspace root
    },
  },
});
