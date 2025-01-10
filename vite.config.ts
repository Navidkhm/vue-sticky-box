import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/components/StickyBox.vue',
      name: 'VueStickyBox',
      fileName: (format) => `index-${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue', // Global reference for Vue
        },
      },
    },
  },
});
