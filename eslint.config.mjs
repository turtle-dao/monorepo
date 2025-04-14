import antfu from "@antfu/eslint-config";

export default antfu({
  type: "lib",

  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },

  typescript: true,
  react: true,

  rules: {
    "prefer-const": "off",
    "unused-imports/no-unused-imports": "off",
  }
});
