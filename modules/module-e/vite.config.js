import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  //Build configuration
  base: "/01_module_e",
  build: {
    outDir: "01_module_e",
    assetsDir: "assets",
  },
});
