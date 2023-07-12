import { fileURLToPath, URL } from "node:url";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import XMLLoader from 'vite-plugin-xml-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodeResolve(), vue(),XMLLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
});
