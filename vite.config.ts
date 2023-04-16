import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 8080,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@db': path.resolve(__dirname, './src/db'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@svgs': path.resolve(__dirname, './src/svgs'),
      '@styled': path.resolve(__dirname, './src/styled'),
      '@typings': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      // add this to cache all the imports
      workbox: {
        globPatterns: ['**/*'],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ['**/*'],
      manifest: {
        theme_color: '#f7f7f5',
        background_color: '#f7f7f5',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        name: 'Task Watch',
        short_name: 'Task Watch',
        description: 'Kanban Board App',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    {
      // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: 'build',
    },
    {
      // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],
})

// "baseUrl": ".",
// "paths": {
//   "@components/*": ["src/components/*"],
//   "@db/*": ["src/db/*"],
//   "@pages/*": ["src/pages/*"],
//   "@utils/*": ["src/utils/*"],
//   "@svgs/*": ["src/svgs/*"],
//   "@styled/*": ["src/styled/*"],
//   "@typings/*": ["src/typings/*"],
//   "@contexts/*": ["src/contexts/*"],
//   "@hooks/*": ["src/hooks/*"]
// }
