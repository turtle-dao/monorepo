import path from "node:path";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import rehypePrettyCode from "rehype-pretty-code";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteShikiReactPlugin } from "./src/lib/vite-plugin-shiki-react";

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: "github-dark",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      rehypePlugins: [[
        rehypePrettyCode,
        prettyCodeOptions,
      ]],
    }),
    tailwindcss(),
    Icons({
      jsx: "react",
      compiler: "jsx",
    }),
    tsconfigPaths({
      projects: [
        path.resolve(__dirname, "../showcase"),
        path.resolve(__dirname, "../react"),
        path.resolve(__dirname, "../api"),
      ],
    }),
    react(),
    viteShikiReactPlugin(),
    vanillaExtractPlugin(),
  ],
});
