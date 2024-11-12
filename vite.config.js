import { resolve } from "path";
import { defineConfig } from "vite";

const LIBRARY_NAME = "xano-outseta";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: LIBRARY_NAME,
      fileName: LIBRARY_NAME,
    },
    rollupOptions: {
      // Ensure that Outseta are treated as external
      external: ["Outseta"],
      output: {
        globals: {
          Outseta: "Outseta",
        },
      },
    },
  },
});
