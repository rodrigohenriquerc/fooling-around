const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const reactCompiler = require("eslint-plugin-react-compiler");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "react-compiler": reactCompiler,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react-compiler/react-compiler": "error",
    },
  },
]);
