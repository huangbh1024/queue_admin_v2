import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { vitePluginBuildFlow } from 'vite-plugin-build-flow';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      vue(),
      vueJsx({ transformOn: true, mergeProps: true, enableObjectSlots: true }),
      UnoCSS(),
      AutoImport({ imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'] }),
      vitePluginBuildFlow({ version: process.env.VITE_PROJECT_VERSION ?? '' }),
    ],
    base: './',
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            lodash: ['lodash-es'],
            naiveui: ['naive-ui'],
            vue: ['vue'],
          },
        },
      },
    },
  });
};
