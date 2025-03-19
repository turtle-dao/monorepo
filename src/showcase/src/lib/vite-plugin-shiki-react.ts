import type { Plugin } from "vite";
import path from "node:path";
import { createHighlighter, type Highlighter } from "shiki";

interface Options {
  theme?: string;
  langs?: string[];
}

export function viteShikiReactPlugin(options: Options = {}): Plugin {
  const {
    theme = "github-dark",
    langs = ["javascript", "typescript", "jsx", "tsx", "html", "css", "json", "bash", "shell", "text"],
  } = options;

  let highlighter: Highlighter;

  return {
    name: "vite-plugin-shiki-react",

    async buildStart() {
      highlighter = await createHighlighter({
        themes: [theme],
        langs,
      });
    },

    async transform(code, id) {
      if (id.endsWith("?shiki")) {
        const realPath = id.replace(/\?shiki$/, "");
        const ext = path.extname(realPath).slice(1);
        const lang = ext || "text";

        const html = highlighter.codeToHtml(code, {
          lang,
          theme,
        });

        const preContent = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i)?.[1] || html;

        return `
          import React from "react";

          export function ShikiHighlightedCode({
            ref,
            className,
            ...props
          }: React.HTMLAttributes<HTMLPreElement> & { ref?: React.RefObject<HTMLPreElement> }): React.ReactElement {
            const { className, ...otherProps } = props;
            
            return (
              <pre 
                ref={ref}
                className={\`shiki \${className || ""}\`}
                data-language="${lang}"
                {...otherProps}
              >
                <code dangerouslySetInnerHTML={{ __html: \"${JSON.stringify(preContent)}\" }} />
              </pre>
            );
          }
        `;
      }
    },
  };
}
