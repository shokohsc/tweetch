import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { fileURLToPath, URL } from "node:url";


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
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 8000,
    hmr: {
      clientPort: 443
    },
    allowedHosts: [
      "localhost",
      "dev.tweetch.home.arpa",
      "preview.tweetch.home.arpa",
      "tweetch.dev-tweetch"
    ]
  }
})
