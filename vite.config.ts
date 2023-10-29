import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/modal_vue/',
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: './src/utils/utils.js',
          dest: './utils/'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
