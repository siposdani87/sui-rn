# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@siposdani87/sui-rn` is a TypeScript UI component library for Expo/React Native with predefined form field components. The repo contains both the **library** (root) and an **example app** (`example/`).

## Build & Development Commands

```bash
# Library (root)
npm install --legacy-peer-deps    # Install deps (legacy-peer-deps required)
npm run build                     # Full build (runs clean → format → type-check → lint → tsc)
npm run watch                     # TypeScript watch mode for development
npm run type-check                # Type-check without emitting
npm run lint                      # ESLint check
npm run lint:fix                  # ESLint auto-fix
npm run format                    # Prettier format src/
npm run format:check              # Prettier check
npm test                          # Run Jest tests

# Example app
cd example
npm install --legacy-peer-deps
npx expo start -c                 # Start dev server (cache cleared)
npx expo run:ios                  # iOS native build
npx expo run:android              # Android native build
npx expo prebuild --clean         # Regenerate native projects
```

Both projects can be installed together: `npm run upgrade:packages`

## Architecture

### Library Structure (`src/`)

- **`components/`** — 29 React Native form/UI components (TextField, Button, Dialog, SelectField, etc.). Each component is a single `.tsx` file with a barrel `index.ts`.
- **`constants/`** — Design tokens and theming: `Colors.ts` (Material Design palette, light/dark themes via `setThemeColors()`), `Styles.tsx` (fonts, shadows via `setThemeStyles()`), `Tokens.ts` (35+ overridable design tokens via `setThemeTokens()`), `Layout.ts`, `Environment.ts`.
- **`hooks/`** — `useInputStyle`, `useErrorField`, `useDarkTheme`, `useActionColor`, `useModalState`, `usePressableStyle`.
- **`index.ts`** — Root barrel re-exporting all components, constants, and hooks.

### Theming Pattern

Consuming apps customize the library by calling `setThemeColors()`, `setThemeStyles()`, and `setThemeTokens()` at startup (see `example/App.tsx`). Components read from the shared `Colors`, `Styles`, and `Tokens` objects. The current pattern uses mutable singletons; a future migration to React Context/Provider is possible.

### Component Pattern

Form field components follow a consistent pattern: they accept value/onChange props, use `useInputStyle` and `useErrorField` hooks for styling/validation, and render with the library's design tokens.

### Example App (`example/`)

Expo app using React Navigation to demonstrate all library components across screen files in `example/screens/`. Uses `file:../` dependency to link the local library.

## Code Style

- **Prettier:** 4-space tabs, single quotes, trailing commas, semicolons (`.prettierrc.json`)
- **ESLint:** Flat config (`eslint.config.js`) with TypeScript, React, React Hooks, and React Native plugins
- **TypeScript:** Strict mode with all strict checks enabled. Target/module: ESNext, moduleResolution: Bundler, JSX: react-native
- **Unused variables:** Prefix with `_` (ESLint configured to allow this)
- **Commits:** Conventional commits enforced via `commitlint` (`feat:`, `fix:`, `chore:`, etc.)

## Testing

Jest with `jest-expo` preset. Tests live in `src/__tests__/` with unit tests for hooks and snapshot tests for key components.

## Build Output

TypeScript compiles `src/` → `dist/` with declaration files, declaration maps, and source maps. Only `dist/` and `src/` are published to npm.

## CI/CD

- **`.github/workflows/npm-publish.yml`** — auto-publishes to npm on push to `master`. Requires `NPM_TOKEN` secret.
- **`.github/workflows/ci.yml`** — runs type-check, lint, tests, and build on PRs.

## Developer Experience

- **Husky** — git hooks for pre-commit (lint-staged) and commit-msg (commitlint)
- **lint-staged** — runs Prettier and ESLint on staged `src/**/*.{ts,tsx}` files
- **conventional-changelog-cli** — generates `CHANGELOG.md` from conventional commits (`npm run changelog`)

## Peer Dependencies

The library expects consuming apps to provide: `react`, `react-native`, `@expo/vector-icons`, `@react-native-community/datetimepicker`, `@react-native-community/slider`, `date-fns`, `expo-document-picker`, `expo-file-system`, `expo-image-picker`, `react-native-maps`, `react-native-svg`, `react-native-wheel-color-picker`, and `@siposdani87/expo-rich-text-editor`.
