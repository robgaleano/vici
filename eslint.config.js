const { defineConfig } = require('eslint/config');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  prettierConfig,
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      '.agents/**',
      '.github/**',
      'apps/*/node_modules/**',
      'packages/*/node_modules/**',
    ],
  },
]);
