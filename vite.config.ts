import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/Portfolio/",
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(root, "src/app"),
      shared: path.resolve(root, "src/shared"),
      widgets: path.resolve(root, "src/widgets"),
    },
  },
  build: {
    outDir: "dist",
  },
});
