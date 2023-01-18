import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy({ targets: ["es2015", "stage-0"] })],
  server: {
    port: 4000,
  },
  assetsInclude: ["src/assets/**/*"],
});
