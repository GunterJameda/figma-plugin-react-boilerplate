import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./ui-src",
  plugins: [reactRefresh(), viteSingleFile(), svgr()],
  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false,
    outDir: "../dist",
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "assets/[name].[ext]",
        entryFileNames: "assets/[name].js",
        manualChunks: () => "everything.js",
      },
    },
  },
});
