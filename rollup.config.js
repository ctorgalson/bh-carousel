import { createRequire } from "node:module";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");
const plugins = [nodeResolve(), typescript({ tsconfig: "./tsconfig.json" })];
const minifyPlugin = terser({
  format: {
    preamble: `/*! bh-carousel ${pkg.version} — © Christopher Torgalson */`,
  },
});
const umdCfg = {
  format: "umd",
  name: "BhCarousel",
  exports: "default",
};

export default {
  input: "src/bh-carousel.ts",
  plugins: plugins,
  output: [
    // UMD
    { file: "dist/js/bh-carousel.js", ...umdCfg },
    {
      file: "dist/js/bh-carousel.min.js",
      ...umdCfg,
      plugins: [minifyPlugin],
    },
    // ESM
    { file: "dist/js/bh-carousel.esm.js", format: "esm" },
    {
      file: "dist/js/bh-carousel.esm.min.js",
      format: "esm",
      plugins: [minifyPlugin],
    },
    // CJS
    { file: "dist/js/bh-carousel.cjs", format: "cjs" },
    {
      file: "dist/js/bh-carousel.min.cjs",
      format: "cjs",
      plugins: [minifyPlugin],
    },
  ],
  watch: {
		exclude: "node_modules/**",
	},
};
