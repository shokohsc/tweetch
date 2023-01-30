import { fileURLToPath, URL } from "node:url"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { sentryVitePlugin } from "@sentry/vite-plugin"


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
  plugins: [
    vue(),
    VitePluginFonts({
      custom: {
        families: [{
          name: 'Code New Roman',
          local: 'Code New Roman',
          src: './src/assets/fonts/Code_New_Roman.woff',
        }],
        display: 'auto',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend'
      },
    }),
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      org: process.env.ORGANISATION || 'dev',
      project: process.env.PROJECT || 'dev',

      // Specify the directory containing build artifacts
      include: "./dist",

      // Optionally uncomment the line below to override automatic release name detection
      release: process.env.RELEASE || 'dev',
     }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 80,
    hmr: {
      clientPort: 443
    }
  }
})
