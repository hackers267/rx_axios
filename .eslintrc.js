module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "standard-with-typescript",
  overrides: [],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
