export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "autoprefixer": {},
    "postcss-prefix-selector": {
      prefix: "#turtle-widget.widget",
      transform: (prefix, selector) => {
        // Ignore prefix for global selectors
        if (selector.startsWith("html") || selector.startsWith("body") || selector.startsWith("*") || selector.startsWith(":")) {
          return selector;
        }

        // For other files add a prefix
        return `${prefix} ${selector}`;
      },
    },
  },
};
