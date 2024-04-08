import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": 0
    },
  },
  eslintConfigPrettier,
];
