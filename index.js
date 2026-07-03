// @and3rn3t/eslint-config — shared ESLint 9 flat config for React + TS repos.
//
// Usage in a repo's eslint.config.js:
//
//   import and3rn3t from '@and3rn3t/eslint-config'
//   export default and3rn3t
//
// Or extend it:
//
//   import and3rn3t from '@and3rn3t/eslint-config'
//   export default [
//     ...and3rn3t,
//     { rules: { 'no-console': 'warn' } },
//   ]
//
// Flat config for ESLint 9. (ESLint 10 is held back until eslint-plugin-react
// ships a v10-compatible peer range; bump this package's deps + peer when it does.)

import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import tsEslint from 'typescript-eslint'

/** The shared React + TypeScript flat config (spread-ready array). */
export const react = tsEslint.config(
  { ignores: ['dist', 'build', 'node_modules', 'coverage'] },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  tsEslint.configs.recommended,
)

export default react
