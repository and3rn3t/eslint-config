// @and3rn3t/eslint-config/prettier-tailwind — the Prettier base plus Tailwind
// class sorting. Needs `prettier-plugin-tailwindcss` installed in the repo.

import base from './prettier.js'

export default {
  ...base,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'clsx', 'cva'],
}
