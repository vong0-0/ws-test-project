import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: "/01_module_f", <--- uncomment when building
  build: {
    outDir: "01_module_f",
    assetsDir: "assets",
  },
});
