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
- `react-hooks` + `react-refresh` (recommended), applied to `**/*.{ts,tsx}`
- `react-refresh/only-export-components` warn; `no-unused-vars` warn with the `^_` ignore pattern
- Ignores `dist`, `build`, `coverage`, `node_modules`

This is the **common base** across the React/TS repos. It intentionally omits
`eslint-plugin-react` (only flipper used it). Repos that need extra rules, plugins
(e.g. `jsx-a11y`), or file contexts extend it: `export default [...and3rn3t, …]`.

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

Adopted so far: **flipper, huggingface, jonah** (eslint 9 / react-hooks 5 — their
base matches this config exactly, so only their extra rules are layered on).

Deliberately **not** adopted:

- **homehub** — already on **eslint 10** (react-hooks 7). It's ahead of this
  config; fold it in when this package moves to eslint 10.
- **guess** — react-hooks 7 + `jsx-a11y` + multi-context Worker/script/ui overrides.
- **health** — type-aware (`projectService`, `no-floating-promises`) + `jsx-a11y`;
  its config is the sophisticated one others could learn from.
- **and3rn3t** — plain JS + Cloudflare Worker portfolio (no React/TS); uses
  `eslint-config-prettier`. This React/TS config doesn't apply.

**Next step to unify further:** when moving to eslint 10, bump this package's deps
(`@eslint/js`→10, `react-hooks`→7, `globals`→17) + peer, publish, and homehub +
the eslint-9 adopters all land on 10 together.
