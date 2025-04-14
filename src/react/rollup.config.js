import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import tsconfigPaths from "rollup-plugin-tsconfig-paths";

const packageJson = require("./package.json");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  {
    external: [/node_modules/],
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      tsconfigPaths(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
        extensions,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        noEmit: true,
        declaration: false,
        outDir: "dist",
      }),
      terser(),
      vanillaExtractPlugin({
        identifiers: "short",
      }),
    ],
  },
];
