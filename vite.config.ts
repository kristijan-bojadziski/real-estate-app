import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      api: path.resolve(__dirname, "./src/api"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      constants: path.resolve(__dirname, "./src/constants"),
      store: path.resolve(__dirname, "./src/store"),
    },
  },
});
