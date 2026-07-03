# AGENTS.md — @and3rn3t/eslint-config

Shared ESLint 9 flat config package for and3rn3t React + TypeScript repos.

## What this is

A publishable npm package (`@and3rn3t/eslint-config`) exporting a flat-config
array from `index.js`. Consumers import it as their whole `eslint.config.js`.

## Conventions

- Single source file: `index.js` (ESM). Keep it dependency-light.
- The React plugins + `typescript-eslint` are `dependencies`; `eslint` and
  `typescript` are `peerDependencies`.
- Target ESLint 9 (flat config only; ESLint 10 pending eslint-plugin-react support). Do not reintroduce eslintrc.
- Version bumps use conventional commits so Renovate can propagate to consumers.

## Editing rules

When changing rules, run `npm run lint` here, then verify against at least one
consumer repo (flipper) before publishing a new version.
