import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const SPA_OUTPUT_DIR = path.resolve(
  __dirname,
  "../api/src/main/resources/static/spa",
);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "/spa/",
  server: {
    host: "::",
    port: 5173,
  },
  build: {
    outDir: SPA_OUTPUT_DIR,
    emptyOutDir: true,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
