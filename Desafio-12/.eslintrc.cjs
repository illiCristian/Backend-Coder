module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    javascript: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
  },
};
