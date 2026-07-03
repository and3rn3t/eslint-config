# @and3rn3t/eslint-config

Shared **ESLint 9** flat config for and3rn3t React + TypeScript repos. Adopting
this package versions the lint rules in one place instead of copy-pasting
`eslint.config.js` into every repo.

> **Why ESLint 9, not 10?** `eslint-plugin-react` doesn't support ESLint 10 yet
> (its peer range caps at eslint 9, and it errors under 10). This package stays on
> the eslint 9 line until that lands upstream — then a single dep bump here moves
> every consumer to 10 at once.

## Install

```sh
# in a consuming repo
npm i -D @and3rn3t/eslint-config eslint@^9
# (pnpm/yarn equivalents work too)
```

The React plugins, `@eslint/js`, `globals`, and `typescript-eslint` come in as
dependencies of this package, so you don't list them separately.

## Use

Replace the repo's `eslint.config.js` with:

```js
import and3rn3t from '@and3rn3t/eslint-config'
export default and3rn3t
```

Extend when a repo needs extra rules:

```js
import and3rn3t from '@and3rn3t/eslint-config'

export default [
  ...and3rn3t,
  { rules: { 'no-console': 'warn' } },
]
```

## Local (unpublished) linking via `file:`

Until this package is published to a registry, consumers reference it as
`"@and3rn3t/eslint-config": "file:../eslint-config"`. npm symlinks it, and because
of that symlink Node resolves the config's own imports (`@eslint/js`, the plugins)
from **this** folder — so run install here once so it has its own `node_modules`:

```sh
cd eslint-config && npm install
```

That pulls in the plugins plus `eslint`/`typescript` (transitive peers). Then the
consumer's `npm run lint` resolves everything. **Publishing to a registry removes
this step** — registry installs are copied (not symlinked) and resolve against the
consumer's `node_modules` normally.

## What's in it

- `@eslint/js` recommended + `typescript-eslint` recommended
- `eslint-plugin-react` (recommended + jsx-runtime), `react-hooks`, `react-refresh`
- `react/react-in-jsx-scope` and `react/prop-types` off (React 19 + TS)
- `no-unused-vars` as a warning with `^_` ignore pattern for intentional unused
- Ignores `dist`, `build`, `coverage`, `node_modules`

## Publishing (public npm)

Configured for the public npm registry (`publishConfig.access: public`).
`main`/`exports`/`files` ship only `index.js`. Provenance is added by the CI
workflow (it can't be generated from a local publish).

**First publish (manual, one time):**

1. Create/sign in to an npmjs.com account and make sure the **`@and3rn3t` scope**
   exists (create a free org named `and3rn3t` on npm, or use your username if it's
   `and3rn3t`).
2. Create the GitHub repo `and3rn3t/eslint-config` and push this folder to it
   (the `repository` field + provenance require the repo to exist), including the
   committed `package-lock.json`.
3. From this folder: `npm login`, then `npm publish`. (`--access public` is already
   in `publishConfig`, so a plain `npm publish` works.)

**Ongoing (automated):** `.github/workflows/publish.yml` publishes to npm on every
GitHub Release. Add an npm **automation token** as the repo secret `NPM_TOKEN`
once; after that, publishing = bump the version, push a `vX.Y.Z` tag, and cut a
Release. Renovate then opens bump PRs in consumer repos.

**After the first publish**, switch each consumer from the local link to the
registry version: replace `"@and3rn3t/eslint-config": "file:../eslint-config"` with
`"@and3rn3t/eslint-config": "^0.1.0"` and `npm install`.

## Rollout order

Adopt in the flat-config React/TS repos: **flipper, huggingface, and3rn3t, guess,
health, homehub, jonah**. Do one, confirm `npm run lint` is clean, then the rest.
When `eslint-plugin-react` ships ESLint 10 support, bump this package's deps +
peer to 10 once and every consumer moves together.
