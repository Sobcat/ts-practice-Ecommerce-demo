import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock' //vite-mock插件，搭配mockjs使用

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteMockServe({
      logger: true,
      mockPath: './mock/'
    })
  ],
  resolve: {
    // alias: [
    //   {
    //     find: /^@api\//,
    //     replacement: fileURLToPath(new URL('./src/request/api/', import.meta.url))
    //   },
    //   {
    //     find: /^@\//,
    //     replacement: fileURLToPath(new URL('./src/', import.meta.url))
    //   }
    // ]
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/request/api', import.meta.url))
    }
  },
  server: {
    port: 5174
  }
})
