import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import cssnano from "cssnano";
import cssnext from "postcss-cssnext";
import postcssImport from "postcss-import";
import nested from "postcss-nested";
import simplevars from "postcss-simple-vars";
import postcss from "rollup-plugin-postcss";

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
    ],
  },
  {
    input: "src/css.js",
    output: {
      file: "css-bundle.js",
      format: "esm",
    },
    plugins: [
      postcss({
        plugins: [
          postcssImport(),
          simplevars(),
          nested(),
          cssnext({ warnForDuplicates: false }),
          cssnano(),
        ],
        extensions: [".css"],
        extract: "styles.css",
        sourceMap: false,
      }),
    ],
  },
];
