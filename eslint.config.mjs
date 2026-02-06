import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const eslintConfig = defineConfig([
  // Global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
    "**/*.test.ts",
  ]),

  // Base configuration for all TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Downgrade to warn for now
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },

  // Next.js specific rules for apps ONLY
  ...nextVitals.map((config) => ({
    ...config,
    files: ["apps/client-web/**/*.ts", "apps/client-web/**/*.tsx"],
  })),
  ...nextTs.map((config) => ({
    ...config,
    files: ["apps/client-web/**/*.ts", "apps/client-web/**/*.tsx"],
  })),
]);

export default eslintConfig;
