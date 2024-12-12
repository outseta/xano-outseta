import { resolve } from "path";
import { defineConfig } from "vite";

const LIBRARY_NAME = "xano-outseta";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: LIBRARY_NAME,
      formats: ["iife"],
      fileName: () => `${LIBRARY_NAME}.js`,
    },
    rollupOptions: {
      // Ensure that Outseta is treated as external
      external: ["Outseta"],
      output: {
        extend: true,
        globals: {
          Outseta: "Outseta",
        },
      },
    },
  },
});
