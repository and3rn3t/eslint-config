// @and3rn3t/eslint-config — shared ESLint 9 flat config for React + TS repos.
//
// Usage in a repo's eslint.config.js:
//
//   import and3rn3t from '@and3rn3t/eslint-config'
//   export default and3rn3t
//
// Extend with repo-specific rules / file contexts:
//
//   import and3rn3t from '@and3rn3t/eslint-config'
//   export default [
//     ...and3rn3t,
//     { rules: { '@typescript-eslint/no-explicit-any': 'warn' } },
//   ]
//
// This is the COMMON BASE shared across the React/TS repos: @eslint/js +
// typescript-eslint recommended, react-hooks, react-refresh, and the `^_`
// no-unused-vars convention. It intentionally does NOT include
// eslint-plugin-react (only flipper used it) — add it per-repo if needed.
//
// Flat config for ESLint 9. (ESLint 10 is held back until the plugin ecosystem
// catches up; bump this package's deps + peer when it does.)

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

/** The shared React + TypeScript flat config (spread-ready array). */
export const react = tseslint.config(
  { ignores: ['dist', 'build', 'coverage', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
)

export default react
