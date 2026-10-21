// @and3rn3t/eslint-config — shared ESLint 10 flat config for React + TS repos.
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
// react-hooks v7's recommended set adds React Compiler checks (purity, refs,
// set-state-in-effect, …) as errors. Every adopting repo had to turn those off
// or down, so here they're warnings: visible, but not blocking adoption.
// The two classic rules keep their recommended severity. Tighten per repo with
// e.g. { rules: { 'react-hooks/purity': 'error' } }.

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

const CLASSIC_HOOK_RULES = new Set(['react-hooks/rules-of-hooks', 'react-hooks/exhaustive-deps'])
const hookRules = Object.fromEntries(
  Object.entries(reactHooks.configs.recommended.rules).map(([rule, level]) => [
    rule,
    CLASSIC_HOOK_RULES.has(rule) ? level : 'warn',
  ]),
)

/** The shared React + TypeScript flat config (spread-ready array). */
export const react = tseslint.config(
  { ignores: ['dist', 'build', 'coverage', 'node_modules', '.wrangler'] },
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
      ...hookRules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
)

export default react
