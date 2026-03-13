# Expo SDK 55 Upgrade Plan

Upgrade from Expo SDK 54 → 55 for both the library and example app.

---

## Core Version Changes

| Dependency | SDK 54 | SDK 55 |
| --- | --- | --- |
| `expo` | ~54.0.33 | ~55.0.0 |
| `react-native` | 0.81.5 | 0.83.2 |
| `react` | 19.1.0 | 19.2.0 |
| `@types/react` | ~19.1.10 | ~19.2.10 |

---

## Phase 1: Library (`package.json`) ✅

### 1.1 Update devDependencies ✅

| Package | SDK 54 | SDK 55 |
| --- | --- | --- |
| `expo` | ~54.0.33 | ~55.0.0 |
| `react` | 19.1.0 | 19.2.0 |
| `react-native` | 0.81.5 | 0.83.2 |
| `@types/react` | ~19.1.10 | ~19.2.10 |
| `@react-native-community/datetimepicker` | 8.4.4 | 8.6.0 |
| `@react-native-community/slider` | 5.0.1 | 5.1.2 |
| `expo-document-picker` | ~14.0.8 | ~55.0.0 |
| `expo-file-system` | ~19.0.21 | ~55.0.0 |
| `expo-image-picker` | ~17.0.10 | ~55.0.0 |
| `react-native-maps` | 1.20.1 | 1.26.20 |
| `react-native-svg` | 15.12.1 | 15.15.3 |

Also removed unused `@testing-library/jest-native` (peer dep conflict with React 19.2).

### 1.2 Update peerDependencies ranges ✅

| Package | SDK 54 | SDK 55 |
| --- | --- | --- |
| `react` | >=18.2.0 | >=19.2.0 |
| `react-native` | >=0.74.0 | >=0.83.0 |
| `@react-native-community/datetimepicker` | >=8.0.0 | >=8.6.0 |
| `@react-native-community/slider` | >=4.5.0 | >=5.1.0 |
| `expo-document-picker` | >=12.0.0 | >=55.0.0 |
| `expo-file-system` | >=17.0.0 | >=55.0.0 |
| `expo-image-picker` | >=15.0.0 | >=55.0.0 |
| `react-native-maps` | >=1.14.0 | >=1.26.0 |
| `react-native-svg` | >=15.0.0 | >=15.15.0 |

### 1.3 Verify build ✅

- `npm run build` passes
- `npm test` passes (27 tests, 12 snapshots)
- `npm run lint` passes

---

## Phase 2: Example App (`example/package.json`) ✅

### 2.1 Update dependencies ✅

| Package | SDK 54 | SDK 55 |
| --- | --- | --- |
| `expo` | ~54.0.33 | ~55.0.0 |
| `react` | 19.1.0 | 19.2.0 |
| `react-native` | 0.81.5 | 0.83.2 |
| `expo-dev-client` | ~6.0.20 | ~55.0.0 |
| `expo-document-picker` | ~14.0.8 | ~55.0.0 |
| `expo-file-system` | ~19.0.21 | ~55.0.0 |
| `expo-font` | ~14.0.11 | ~55.0.0 |
| `expo-image-picker` | ~17.0.10 | ~55.0.0 |
| `expo-splash-screen` | ~31.0.13 | ~55.0.0 |
| `expo-status-bar` | ~3.0.9 | ~55.0.0 |
| `expo-system-ui` | ^6.0.9 | ~55.0.0 |
| `@react-native-community/datetimepicker` | 8.4.4 | 8.6.0 |
| `@react-native-community/slider` | 5.0.1 | 5.1.2 |
| `react-native-maps` | 1.20.1 | 1.26.20 |
| `react-native-reanimated` | ~4.1.1 | 4.2.1 |
| `react-native-screens` | ~4.16.0 | ~4.23.0 |
| `react-native-svg` | 15.12.1 | 15.15.3 |
| `react-native-webview` | ^13.16.1 | 13.16.0 |
| `react-native-worklets` | ^0.7.4 | 0.7.2 |
| `babel-preset-expo` | ~54.0.10 | ~55.0.0 |
| `@types/react` | ~19.1.10 | ~19.2.10 |

### 2.2 Update `app.json` ✅

- Removed `newArchEnabled` from `ios` and `android` sections (mandatory in SDK 55).

### 2.3 iOS build ✅

- `npx expo prebuild --clean` succeeded
- `npx expo run:ios` build succeeded, app running on simulator

---

## Phase 3: Remaining Verification

- [x] `npm run build` passes (library)
- [x] `npm test` passes (library)
- [x] `npm run lint` passes (library)
- [x] Example app builds on iOS simulator
- [x] Example app runs correctly on iOS
- [x] Example app builds on Android emulator
- [x] Dark mode works correctly
- [x] Run `npx expo-doctor@latest` — 2 warnings: duplicate native modules from `file:../` linking (harmless) and `@siposdani87/expo-rich-text-editor` pulling SDK 54 transitive deps (needs separate update)
