# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-11-05

### Added

- `@and3rn3t/eslint-config/prettier` — shared Prettier base (single quotes, `es5`
  trailing commas, 100 columns, LF). `semi` and `arrowParens` stay at Prettier's
  defaults; repos that differ override them.
- `@and3rn3t/eslint-config/prettier-tailwind` — the base plus
  `prettier-plugin-tailwindcss` (optional peer) with `cn`/`clsx`/`cva`.
- `@and3rn3t/eslint-config/tsconfig.json` — strict Vite + React app base to
  `extends` from. `paths`, `include` and `tsBuildInfoFile` stay in the repo.

## [0.3.0] - 2026-10-21

### Changed

- **Breaking:** requires `eslint@^10` (peer). Repos still on ESLint 9 should stay
  on `^0.2.0` and bump both together:
  `npm i -D @and3rn3t/eslint-config@^0.3.0 eslint@^10`.
- `@eslint/js` → 10, `eslint-plugin-react-hooks` → 7, `eslint-plugin-react-refresh`
  → 0.5, `globals` → 17, `typescript-eslint` → 8.72.
- react-hooks 7's React Compiler checks (`purity`, `refs`, `set-state-in-effect`, …)
  are set to **warn** so adopting the config never breaks a build;
  `rules-of-hooks` (error) and `exhaustive-deps` (warn) keep their usual severity.
- `@typescript-eslint/no-unused-vars` also ignores `^_` caught errors.

### Added

- `.wrangler` to the default ignores.

[Unreleased]: https://github.com/and3rn3t/eslint-config/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/and3rn3t/eslint-config/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/and3rn3t/eslint-config/releases/tag/v0.3.0
