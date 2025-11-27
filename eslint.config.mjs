import eslintJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig(
  {
    languageOptions: {
      globals: globals.browser,
      parser: typescriptEslint.parser,
    },
  },
  eslintJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
    },
  },
  { ignores: ['node_modules', 'dist/'] },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',
    },
  }
);
