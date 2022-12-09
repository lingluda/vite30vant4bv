import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [VantResolver()],
    }),],
     // 静态资源基础路径 base: './' || '',
     base: process.env.NODE_ENV === 'production' ? './' : '/',
     server: {
      proxy: {
        '/WeCom': {
          target: 'http://localhost:31792/PaperKB/WeCom',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/WeCom/, '')
        }
      }
   },
  
})
