import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { fileURLToPath, URL } from "node:url";
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
      org: process.env.SENTRY_ORG || "shokohsc",
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      url: "https://glitchtip.shokohsc.home",
      release: {
        name: process.env.POD_NAME || '0.1.0',
      }
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
