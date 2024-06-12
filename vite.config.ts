import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({ transformOn: true, mergeProps: true, enableObjectSlots: true }),
    UnoCSS(),
    AutoImport({ imports: ['vue'] }),
  ],
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
