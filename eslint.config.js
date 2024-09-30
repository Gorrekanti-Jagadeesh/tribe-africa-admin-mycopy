import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react'; // Importing eslint-plugin-react

export default [
  {
    ignores: ['dist'],
  },
  {
    // Using the base configuration from ESLint
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react, // Adding react plugin
    },
    rules: {
      semi: ['warn', 'always'],
      'no-duplicate-imports': 'error',
      'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
      'react/jsx-fragments': ['error', 'element'],
      'react/self-closing-comp': 'error',
      'react/no-array-index-key': 'error',
      'react/no-unused-state': 'error',
      'react/no-unused-prop-types': 'error',
    },
  },
  {
    // TypeScript configuration
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    // React Hooks and React Refresh Plugin
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // Prettier configuration (you can add it here)
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
