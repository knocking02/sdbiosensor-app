import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default ({ mode }) => {
   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
   return defineConfig({
      plugins: [
         vue({
            template: { transformAssetUrls },
         }),
         quasar(),
         VueI18nPlugin({
            include: resolve(dirname(fileURLToPath(import.meta.url)), './src/modules/i18n/locales/**'), // provide a path to the folder where you'll store translation data (see below)
         }),
      ],
      resolve: {
         alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
         },
      },
      server: {
         host: process.env.VITE_APP_HOST,
         port: process.env.VITE_APP_PORT,
         proxy: {
            // API 프록시 설정
            '/adm/': {
               target: process.env.VITE_REST_API_ADM,
               changeOrigin: true,
               logLevel: 'debug',
               //rewrite: (path) => path.replace(/^\/adm/, ''),
               secure: false,
            },
         },
         watch: {
            usePolling: true,
         },
      },
      build: {
         rollupOptions: {
            // external: ['vue-draggable-next'],
         },
      },
      esbuild: {
         drop: ['console', 'debugger'],
         supported: {
            'top-level-await': true, //browsers can handle top-level-await features
         },
      },
   })
}
