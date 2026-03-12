# Styles, Theme & Design Improvement Plan

Expo SDK 54 / React Native 0.81 / React 19.1. All phases completed in **v1.3.0**.

**Future direction:** The current mutable singleton pattern (`Colors`, `Styles`, `Tokens`) prevents runtime theme switching. The token structure is designed with a potential future migration to a React Context/Provider pattern in mind.

---

## Phase 1: Design Token System ✅

Created `src/constants/Tokens.ts` with 35+ overridable design tokens and `setThemeTokens()` API. Migrated all components to use token references instead of hardcoded magic numbers.

| Token category | Examples |
| --- | --- |
| Border radius | `borderRadiusInput: 3`, `borderRadiusButton: 20`, `borderRadiusColorDot: 15` |
| Font size | `fontSizeBody: 16`, `fontSizeError: 12`, `fontSizeHeading: 22` |
| Spacing | `spacingXs: 3`, `spacingSm: 5`, `spacingMd: 10`, `spacingLg: 15` |
| Input dimensions | `inputHeight: 36`, `inputBorderWidth: 1`, `inputPaddingHorizontal: 10` |
| Icon sizes | `iconSizeDefault: 26`, `iconSizeSmall: 20`, `iconSizeAction: 24` |
| Dialog | `dialogBorderRadius: 3`, `dialogScrimOpacity: 0.8`, `dialogMaxWidth: 520` |

---

## Phase 2: Pressable Feedback ✅

Created `src/hooks/usePressableStyle.ts` hook providing cross-platform press feedback:

- **iOS:** opacity feedback (default 0.6) on press via style function
- **Android:** `android_ripple` config using theme primary color

Applied to: `Button`, `IconButton`, `TextButton`, `Link`, `Label`, `IconToggleField`, `ColorField`.

Removed unused `activeOpacity` from `Styles.tsx`.

**Not migrated** (future candidates): `SelectField` list rows, `TagField` tags.

---

## Phase 3: Dark Mode Fixes ✅

6 fixes applied:

1. **`Text.tsx`** — separate `mutedLightText` / `mutedDarkText` styles (`deepGreyBright` → `lightGreyDark` for dark mode)
2. **`ColorField.tsx`** — dot border adapts to theme (white on dark, black on light)
3. **`Dialog.tsx`** — separate scrim opacity per theme (dark mode gets +0.15 stronger scrim)
4. **`FileField.tsx`** — theme-aware SVG file icon colors using Material Design hex values instead of named colors
5. **`SwitchField.tsx`** — `ErrorField` now receives `disabled` prop for correct error color
6. **`SelectField.tsx`** — replaced raw `rgba()` values with tokenized `Colors.inputDefaultDark` / `Colors.inputDisabledLight` etc.

---

## Phase 4: Stabilize Layout Calculations ✅

| Component | Change |
| --- | --- |
| `ActionButtons` | Offsets derived from `Tokens.fontSizeBody + Tokens.spacingXs + platformAdjust` |
| `TextField` | Action button padding derived from `Tokens.actionButtonWidth` (done in Phase 1) |
| `RichTextAreaField` | Height derived from `Tokens.lineHeightMultiplier` + `Tokens.textAreaPaddingVertical` (done in Phase 1) |
| `Dialog` | Replaced static `Layout.window.width` with `useWindowDimensions()` for responsive landscape/foldable support |

---

## Phase 5: Reduce Component Duplication ✅

`IconButton` and `TextButton` are now thin wrappers around `Button`:

- **IconButton** — delegates to `Button` with transparent background and theme-aware icon color defaults
- **TextButton** — delegates to `Button` with transparent background and theme-aware text color defaults

External API (props) unchanged. Internal duplication reduced from ~320 lines to ~80 lines across the two wrappers.

---

## Phase 6: Extended Theme Customization ✅

Expanded `ThemeColorsOptions` with 36 optional semantic color overrides. Consumers can now customize:

- Status colors: `success`, `info`, `warning`, `error` (+ bright/dark/text variants)
- Semantic UI colors: `labelDefaultLight`, `inputDefaultDark`, `contentDisabledLight`, etc.
- Checkbox colors: `checkboxDefaultLight`, `checkboxDisabledDark`, etc.
- Error state colors: `errorDefaultLight`, `errorDisabledDark`, etc.

```typescript
setThemeColors({
    primary: Colors.deepPurple,
    // ...existing required fields...
    error: '#D32F2F',                // optional, defaults to current
    success: '#388E3C',              // optional
    labelDefaultLight: '#333333',    // optional
    labelDefaultDark: '#CCCCCC',     // optional
});
```

---

## Remaining cleanup

- `useModalState` — not used by any library component, exported as consumer utility. Consider documenting or removing.
