# Improvement Plan (Expo SDK 54)

Stay on Expo SDK 54 / React Native 0.81 / React 19.1. Focus on code quality, type safety, DX, CI/CD, and example app modernization.

---

## Pre-Release

- [x] Bump version to 1.3.0 in `package.json`
- [x] Update `@siposdani87/expo-rich-text-editor` to 1.2.1 in example `package.json`
- [x] Update `@siposdani87/expo-maps-polygon-editor` to 1.2.1 in example `package.json`

---

## Phase 1: Type Safety & Code Quality ✅

### 1.1 Eliminate `any` types in components ✅

| File                   | Current                          | Proposed                                                         |
| ---------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `TextField.tsx`        | `TextFieldValueType = any`       | `string \| null \| undefined`                                   |
| `IconToggleField.tsx`  | `IconToggleFieldValueType = any` | `boolean \| null \| undefined`                                  |
| `SwitchField.tsx`      | `SwitchFieldValueType = any`     | `boolean \| null \| undefined`                                  |
| `SelectField.tsx`      | `ValueType = any`                | Proper generics using `T[K]`                                    |
| `SelectField.tsx:108`  | `v as any` cast                  | Fix discriminated union to avoid cast                            |
| `Button.tsx`           | `iconName?: any`                 | `iconName?: ComponentProps<typeof MaterialIcons>['name'] \| ...` |
| `IconButton.tsx`       | `iconName?: any`                 | Same as Button                                                   |
| `FileField.tsx`        | `catch (e: any)` x3             | `catch (e: unknown)` with proper narrowing                       |
| `useData.ts` (example) | `K = any`, `key: string`        | `key: keyof T`, remove shadow generic `K`                        |

### 1.2 Strongly type the `Colors` and `Styles` modules ✅

- Replace `ColorsType = { [key: string]: string }` with a concrete interface listing all known color keys. This enables autocomplete and catches typos at compile time.
- `setThemeColors()` currently takes 8 positional string args — change to an options object: `setThemeColors({ primaryBright, primary, ... })`.
- Same for `setThemeStyles()` — change to an options object with named font family fields.

### 1.3 Export all public types ✅

Ensure all component prop types, value types, and hook return types are explicitly exported from the barrel `index.ts` for consumers. (Inspired by expo-rich-text-editor's "Export Missing Types" phase.)

### 1.4 Remove `.eslintrc.json` reference from `tsconfig.json` ✅

`tsconfig.json` includes `.eslintrc.json` in the `include` array, but the library uses flat config (`eslint.config.js`). Remove the stale reference.

### 1.5 Enable `@typescript-eslint/no-explicit-any` ✅

Currently set to `'off'`. After fixing all `any` types (1.1), enable it as `'warn'` to prevent regression.

---

## Phase 2: CI/CD Modernization ✅

### 2.1 Update GitHub Actions workflow ✅

Current issues in `.github/workflows/npm-publish.yml`:

- Uses `actions/checkout@v3` → update to `v4`
- Uses `actions/setup-node@v3` → update to `v4`
- Node 16 is EOL → update to Node 20
- No `--legacy-peer-deps` flag on `npm ci` (may fail)
- No type-check or lint step before publish

Proposed workflow:

```yaml
name: NPM publish
on:
  push:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci --legacy-peer-deps
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 2.2 Add PR validation workflow ✅

New workflow (`.github/workflows/validate.yml`) that runs on PRs to `master`:

- Install deps
- Type-check
- Lint
- Build

---

## Phase 3: Library Packaging Improvements ✅

### 3.1 Add `exports` field to `package.json` ✅

Modern bundlers (Metro, webpack) benefit from explicit exports:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "default": "./dist/index.js"
  }
}
```

### 3.2 Add `sideEffects` field ✅

Note: `Colors.ts` and `Styles.tsx` execute side effects at module level (calling `setThemeColors()` and `Platform.select()()` to set defaults). Use an array instead of `false`:

```json
"sideEffects": ["./dist/constants/Colors.js", "./dist/constants/Styles.js"]
```

### 3.3 Specify `peerDependencies` version ranges ✅

Currently most peer deps use `"*"`. Add minimum version ranges matching SDK 54 compatibility:

```json
"peerDependencies": {
  "react": ">=18.2",
  "react-native": ">=0.74",
  "@expo/vector-icons": ">=14.0.0",
  "@react-native-community/datetimepicker": ">=8.0.0"
}
```

### 3.4 Add `typesVersions` for older TypeScript consumers ✅

```json
"typesVersions": {
  "*": {
    "*": ["dist/index.d.ts"]
  }
}
```

### 3.5 Enable `declarationMap` in tsconfig ✅

Add `"declarationMap": true` to `compilerOptions` for better IDE "Go to Definition" navigation into library source.

### 3.6 Update `moduleResolution` to `"Bundler"` in tsconfig ✅

Currently `"moduleResolution": "Node"`. Change to `"Bundler"` — better aligns with Metro and modern RN tooling. (From expo-maps-polygon-editor.)

---

## Phase 4: Component Improvements ✅

### 4.1 Extract shared form field props into a common type ✅

Many components repeat the same prop definitions (`label`, `error`, `required`, `disabled`, `desc`, `onPressDesc`, `containerStyle`, `actionButtons`). Extract into a `BaseFieldProps` type.

### 4.2 Consistent value/onChange pattern ✅

Standardize to `value` + `onValueChange` across all fields. Ensure all value types are properly typed (not `any`).

### 4.3 Replace `TouchableOpacity` with `Pressable` ✅

`Pressable` is the recommended replacement in modern React Native. This is a non-breaking change since both support the same press semantics. Apply to all 9 files using `TouchableOpacity`: `Button`, `IconButton`, `TextButton`, `Link`, `Label`, `SelectField`, `TagField`, `IconToggleField`, and `ColorField`.

### 4.4 Memoize expensive computations ✅

Components like `SelectField` do list filtering and conversion on every render. Wrap with `useMemo` where appropriate.

### 4.5 Stabilize callback references with `useCallback` ✅

Many event handlers in components (e.g., `onValueChange`, `onPress` handlers in `SelectField`, `Button`) are recreated every render, causing unnecessary re-renders of child components. Wrap key handlers with `useCallback`. (From expo-maps-polygon-editor.)

---

## Phase 5: Example App Updates ✅

### 5.1 Migrate example ESLint to flat config ✅

Example app still uses legacy `.eslintrc.json` format. Migrate to `eslint.config.js` matching the library's setup.

### 5.2 Type-safe navigation ✅

`Router.tsx` defines `StackParamList` but doesn't use it with the navigator. Apply proper typing:

```tsx
const Stack = createNativeStackNavigator<StackParamList>();
```

### 5.3 Fix `useData` hook typing ✅

- Remove shadow generic `K` redeclaration inside `updateData`
- Type `key` parameter as `keyof T` instead of `string`
- Add `newValue` to `useCallback` dependency array

### 5.4 Modernize `app.json` ✅

- Remove deprecated `updates.fallbackToCacheTimeout` (deprecated in SDK 50+)
- Remove deprecated `assetBundlePatterns` (no longer used)
- Add `newArchEnabled: true` to both `ios` and `android` sections (SDK 54 enables it by default, but making it explicit is good for clarity)

### 5.5 Remove deprecated `eject` script ✅

`npx expo eject` was removed in SDK 46. Remove the script from example `package.json`.

### 5.6 Update example entry point ✅

`"main": "node_modules/expo/AppEntry.js"` is the legacy pattern. For SDK 54, the `main` field can be removed (Expo resolves it automatically), or use `"main": "expo-router/entry"` if migrating to Expo Router in the future.

---

## Phase 6: Developer Experience ✅

### 6.1 Add `type-check` to prebuild script ✅

Current `prebuild` runs: `clean → format → lint`. Add `type-check` before `lint`:

```bash
"prebuild": "npm run clean && npm run format && npm run type-check && npm run lint"
```

### 6.2 Add pre-commit hooks (husky + lint-staged) ✅

Enforce code quality on every commit:

- `husky` for git hooks
- `lint-staged` to run Prettier and ESLint on staged files only

### 6.3 Add `.nvmrc` ✅

Pin Node 20 LTS for consistent development environment across contributors.

### 6.4 Add `engines` field ✅

```json
"engines": {
  "node": ">=18"
}
```

### 6.5 Set up commitlint with conventional commits ✅

Enforce consistent commit message format (`feat:`, `fix:`, `chore:`, etc.) via `@commitlint/config-conventional` + husky hook.

---

## Phase 7: GitHub & Community (new) ✅

### 7.1 GitHub issue and PR templates ✅

- Add `.github/ISSUE_TEMPLATE/bug_report.md`
- Add `.github/ISSUE_TEMPLATE/feature_request.md`
- Add `.github/PULL_REQUEST_TEMPLATE.md`

### 7.2 Community docs ✅

- `CONTRIBUTING.md` — contribution workflow, dev setup, PR process
- `CODE_OF_CONDUCT.md` — Contributor Covenant
- `SECURITY.md` — vulnerability reporting policy

### 7.3 CODEOWNERS ✅

Add `.github/CODEOWNERS` to auto-assign reviewers.

---

## Phase 8: Testing (new) ✅

### 8.1 Set up Jest ✅

Add Jest with `jest-expo` preset for unit testing.

### 8.2 Unit tests for hooks ✅

Test `useErrorField`, `useInputStyle`, `useActionColor`, `useModalState`, `useDarkTheme` — these are pure logic and easy to test.

### 8.3 Snapshot tests for key components ✅

Add snapshot tests for `Button`, `TextField`, `Dialog`, `SelectField`, `Label`, `ErrorField` to catch unintended rendering changes.

### 8.4 Add test step to CI ✅

Run `npm test` in both the validate and publish workflows.

---

## Phase 9: README Enhancements (new) ✅

### 9.1 SDK compatibility table ✅

Add a table showing supported Expo SDK, React Native, and React versions.

### 9.2 Supported platforms matrix ✅

Document iOS/Android/Web support status for each component (some like `LocationField` with `react-native-maps` may not support web).

### 9.3 Migration guide ✅

Add a migration guide section for users upgrading from older library versions (especially if `setThemeColors`/`setThemeStyles` API changes in Phase 1.2).

### 9.4 Expand API documentation ✅

- Document all exported components with their props
- Add advanced usage examples (custom theming, form validation patterns)
- Add "Development" section for contributors

---

## Phase 10: Automated Changelog & Releases (new) ✅

### 10.1 Adopt conventional changelog generation ✅

Use `standard-version` or `release-please` to auto-generate `CHANGELOG.md` from conventional commits (depends on Phase 6.5 commitlint being in place). (From expo-maps-polygon-editor.)

### 10.2 Add `release` npm script ✅

`npm run release` should bump version, update CHANGELOG, and create a git tag.

---

## Execution Order

1. **Phase 1** (Type Safety) — foundation for everything else
2. **Phase 4.1** (BaseFieldProps) — reduces duplication before other component changes
3. **Phase 4** remainder (Component Improvements, callbacks, memoization)
4. **Phase 3** (Packaging) — non-breaking, can be done anytime
5. **Phase 8** (Testing) — add tests before making further changes
6. **Phase 5** (Example App) — update in parallel with library changes
7. **Phase 6** (DX) — husky, commitlint, .nvmrc
8. **Phase 10** (Changelog & Releases) — after commitlint is in place
9. **Phase 2** (CI/CD) — ship after tests exist so CI runs them
10. **Phase 7** (GitHub & Community) — anytime, independent
11. **Phase 9** (README) — last, after all changes are settled

## Version Strategy

- Phase 1–4: bump to **1.3.0** (minor — backward-compatible improvements; `setThemeColors` object API is a breaking change for consumers so consider **2.0.0** if you change it, or keep both signatures)
- Phase 5–9: no version bump (example app / DX / docs only)
