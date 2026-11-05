// @and3rn3t/eslint-config/prettier — shared Prettier base.
//
// Only the options every and3rn3t repo already agrees on. `semi` and
// `arrowParens` are split roughly half and half across repos, so they're left at
// Prettier's defaults (true / "always"); a repo that differs overrides them
// rather than reformatting its whole codebase:
//
//   // prettier.config.js
//   import base from '@and3rn3t/eslint-config/prettier'
//   export default { ...base, semi: false }
//
// No overrides? Use the string form in package.json instead:
//   "prettier": "@and3rn3t/eslint-config/prettier"

export default {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
}
