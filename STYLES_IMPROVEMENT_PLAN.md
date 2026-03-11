# Styles, Theme & Design Improvement Plan

Stay on Expo SDK 54 / React Native 0.81 / React 19.1. Focus on design token system, dark mode completeness, visual feedback, and reducing hardcoded values.

---

## Current State

The theming system uses **mutable singletons** (`Colors`, `Styles`) set at app startup via `setThemeColors()` and `setThemeStyles()`. It works but has significant limitations: no runtime theme switching, hardcoded magic numbers everywhere, incomplete dark mode, and no spacing/typography/radius token system.

**Future direction:** The current mutable singleton pattern prevents runtime theme switching. The token structure in this plan should be designed with a potential future migration to a React Context/Provider pattern in mind, even though that migration is out of scope here.

---

## Phase 1: Design Token System

**Problem:** ~30 magic numbers repeated across 20+ files (font sizes, border radii, spacing, heights).

**Solution:** Add a `Tokens.ts` to `src/constants/`:

| Token category | Examples | Current state |
| --- | --- | --- |
| Border radius | `input: 3`, `button: 20`, `colorDot: 15` | Hardcoded in 10+ files |
| Font size | `body: 16`, `error: 12`, `heading: 22` | Hardcoded in 9+ files |
| Spacing | `inputHeight: 36`, `errorHeight: 17`, `labelMargin: 3` | Hardcoded per-component |
| Icon size | `default: 26` | Hardcoded in 3 files |
| Shadow | `elevation`, `opacity`, `height` | Hardcoded in `Styles.tsx` |

Make these overridable via `setThemeTokens()` following the existing `setThemeColors()` / `setThemeStyles()` pattern.

### Implementation steps

1. Create `Tokens.ts` with all token definitions and `setThemeTokens()` API
2. Export from `src/constants/index.ts`
3. Migrate components file-by-file to use token references (one commit per component or group)

---

## Phase 2: Pressable Feedback

**Problem:** All components migrated from `TouchableOpacity` to `Pressable` but have **no visual feedback** on press. The old `activeOpacity: 0.6` in `Styles.tsx` is defined but unused.

**Solution:** Add a shared `usePressableStyle` hook or utility that provides:

- iOS: opacity feedback on press (style function returning `{ opacity }` based on pressed state)
- Android: `android_ripple` config using theme colors

Apply to: `Button`, `IconButton`, `TextButton`, `Link`, `Label` (when pressable), `SelectField` rows, `TagField` tags, `IconToggleField`, `ColorField`.

**Cleanup:** Remove the unused `activeOpacity` export from `Styles.tsx`.

---

## Phase 3: Dark Mode Fixes

5 concrete bugs to fix:

1. **`Text.tsx`** — `mutedText` uses `Colors.deepGreyBright` in both modes (barely visible on dark backgrounds)
2. **`ColorField.tsx`** — dot border always `Colors.black` (invisible on dark backgrounds)
3. **`Dialog.tsx`** — overlay scrim always 80% black (too heavy for light mode)
4. **`FileField.tsx`** — SVG template has hardcoded colors (`'blue'`, `'green'`, `'red'`, `'black'`, `'grey'`), zero dark mode awareness
5. **`SwitchField.tsx`** — `ErrorField` missing `disabled` prop pass-through (wrong error color when disabled)

Additional dark mode inconsistencies:

- `SelectField` list panel uses raw `rgba(255,255,255,.03)` / `rgba(0,0,0,.03)` — not tokenized
- Dialog overlay should use different scrim opacity for light vs dark mode

---

## Phase 4: Stabilize Layout Calculations

| Issue | Fix |
| --- | --- |
| `ActionButtons` uses platform magic offsets (`top: 26/21`) | Derive from token: label fontSize + margin |
| `TextField` hardcodes `38px` per action button | Derive from `iconSize + padding + border` tokens |
| `RichTextAreaField` height `20 * lines + 16` | Derive from `fontSize.body` + `lineHeight` tokens |
| `Layout.ts` is a static snapshot of `Dimensions` | Use `useWindowDimensions()` in `Dialog` instead (priority: breaks in landscape/foldables) |

---

## Phase 5: Reduce Component Duplication

**`Button` / `IconButton` / `TextButton`** share nearly identical `StyleSheet` bodies (borderRadius, borderWidth, padding, container layout) but are 3 independent implementations.

**Approach:** Make `IconButton` and `TextButton` thin wrappers around `Button` — less code, single source of truth for button behavior and styling.

**Breaking change risk:** Consumers using `style` prop overrides that target internal layout structure may be affected. The external API (props) stays the same, but internal element hierarchy may change. Ensure `containerStyle` and `style` escape hatches continue to work identically.

---

## Phase 6: Extended Theme Customization

Currently `setThemeColors()` only accepts 8 values (primary + accent ramps). Consumers **cannot** customize:

- Error / success / warning / info colors
- Label / input / content semantic colors
- Shadow values
- Spacing scale

**Solution:** Expand `ThemeColorsOptions` to accept optional overrides for all semantic tokens, with current values as defaults. Example:

```typescript
setThemeColors({
    primary: Colors.deepPurple,
    // ...existing required fields...
    error: Colors.red,           // optional, defaults to current
    success: Colors.green,       // optional
    labelLight: '#333333',       // optional
    labelDark: '#CCCCCC',        // optional
});
```

---

## Cleanup (across all phases)

- Remove unused `activeOpacity` export from `Styles.tsx` (Phase 2)
- Remove or document `useModalState` — not used by any library component, exported as consumer utility

---

## Execution Order

1. **Phase 1** (Tokens) — foundation, biggest impact, enables everything else
2. **Phase 2** (Pressable feedback) — most user-visible improvement, low effort
3. **Phase 3** (Dark mode fixes) — bug fixes, quick wins
4. **Phase 4** (Layout stabilization) — removes fragile magic numbers, fixes landscape/foldable bugs
5. **Phase 5** (Button dedup) — code quality, potential breaking change risk
6. **Phase 6** (Extended theming) — API expansion, do last

## Version Strategy

- Phase 1-3: **1.3.0** minor release (backward-compatible improvements)
- Phase 4: **1.4.0** minor release (layout fixes, no API change)
- Phase 5: **1.5.0** minor release (internal refactor — test thoroughly for style override regressions)
- Phase 6: **1.6.0** minor release (additive API — new optional fields in existing options objects)
