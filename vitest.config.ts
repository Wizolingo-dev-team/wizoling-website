import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@src": path.resolve(__dirname, "./src"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  test: {
    environment: "jsdom",
    globals: false,
    css: false,
    setupFiles: ["./vitest.setup.ts"],
    pool: "forks",
    testTimeout: 15000,
    exclude: ["node_modules/**", "e2e/**", ".next/**"],
    env: {
      TZ: "UTC",
    },
  },
});

