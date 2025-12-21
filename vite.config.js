import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindscss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindscss(),
    VitePWA({
      registerType: 'autoUpdate',
      includesAssets: ['favicon.svg', 'robots.text'],
      workbox:{
        navigateFallback: '/index.html',
        globPatterns:['**/*.{js,css,html,ico,png,svg,jpg}']
      },
      manifest: ({
          name: 'BeeProductive App',
          short_name: 'Beeproductive',
          description: ' Productivity App',
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#f8ff',
          screenshots:[
            {
              src: '/screenshots/home.jpg',
              sizes: '1482x833',
              type: 'image/jpg',
              form_factor: 'wide'
            },
            {
              src: '/screenshots/folders.jpg',
              sizes: '1482x833',
              type: 'image/jpg',
              form_factor: 'wide'
            },
            {
              src: '/screenshots/login.jpg',
              sizes: '1482x833',
              type: 'image/jpg',
              form_factor: 'wide'
            },
            {
              src: '/screenshots/timer.jpg',
              sizes: '1482x833',
              type: 'image/jpg',
              form_factor: 'wide'
            },
            {
              src: '/screenshots/notes.jpg',
              sizes: '1482x833',
              type: 'image/jpg',
              form_factor: 'wide'
            },
            {
              src: '/screenshots/settings.jpg',
              sizes: '1482x833',
              type: 'image/jpg',
              form_factor: 'wide'
            },
          ],
          icons:[
            {
              src: '/icons/beeproductive_smbol.png',
              sizes: '400x400',
              type: 'image/png'
            }
          ]
        }
        )
      })
  ],
  base:'/BeeProductiveApp',
})

