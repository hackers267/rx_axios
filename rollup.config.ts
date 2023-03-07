import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      format: "cjs",
      file: "dist/index.js",
    },
    plugins: [typescript({})],
  },
  {
    input: "src/index.ts",
    output: {
      format: "es",
      file: "dist/index.esm.js",
    },
    external: ["axios", "rxjs"],
    plugins: [typescript({})],
  },
  {
    input: "src/index.ts",
    output: {
      format: "umd",
      file: "dist/index.aio.js",
      name: "rx_axios",
      globals: {
        axios: "axios",
        rxjs: "rxjs",
      },
      exports: "named",
    },
    external: ["axios", "rxjs"],
    plugins: [typescript()],
  },
]);
