# @siposdani87/sui-rn

[![Version](https://img.shields.io/npm/v/@siposdani87/sui-rn.svg?style=square)](https://www.npmjs.com/package/@siposdani87/sui-rn)
[![Download](https://img.shields.io/npm/dt/@siposdani87/sui-rn.svg?style=square)](https://www.npmjs.com/package/@siposdani87/sui-rn)
[![License](https://img.shields.io/npm/l/@siposdani87/sui-rn.svg?style=square)](./LICENSE)

<a href="https://www.buymeacoffee.com/siposdani87" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="width: 150px !important;" /></a>

This is a basic UI library. It is written in the TypeScript language. The codebase was ready to use with Expo and React Native. In this library there are a lot of predefined form field components.

## SDK Compatibility

| Library Version | Expo SDK | React Native | React  |
| --------------- | -------- | ------------ | ------ |
| 1.2.x           | 54       | 0.81         | 19.1   |
| 1.1.x           | 54       | 0.81         | 19.1   |
| 1.0.x           | 51       | 0.74         | 18.2   |

## Supported Platforms

| Component          | iOS | Android | Web |
| ------------------ | --- | ------- | --- |
| TextField          | Yes | Yes     | Yes |
| NumberField        | Yes | Yes     | Yes |
| EmailField         | Yes | Yes     | Yes |
| PasswordField      | Yes | Yes     | Yes |
| PhoneField         | Yes | Yes     | Yes |
| TextAreaField      | Yes | Yes     | Yes |
| RichTextAreaField   | Yes | Yes     | Yes |
| SearchField        | Yes | Yes     | Yes |
| SelectField        | Yes | Yes     | Yes |
| DateTimeField      | Yes | Yes     | No  |
| CheckboxField      | Yes | Yes     | Yes |
| RadioButtonField   | Yes | Yes     | Yes |
| SwitchField        | Yes | Yes     | Yes |
| SliderField        | Yes | Yes     | No  |
| ColorField         | Yes | Yes     | No  |
| FileField          | Yes | Yes     | No  |
| LocationField      | Yes | Yes     | No  |
| TagField           | Yes | Yes     | Yes |
| Button             | Yes | Yes     | Yes |
| IconButton         | Yes | Yes     | Yes |
| TextButton         | Yes | Yes     | Yes |
| Link               | Yes | Yes     | Yes |
| Label              | Yes | Yes     | Yes |
| Dialog             | Yes | Yes     | Yes |
| ErrorField         | Yes | Yes     | Yes |

## Getting Started

### Installing

```bash
npm install @siposdani87/sui-rn
```

### Theming

Customize colors and fonts at app startup:

```typescript
import { Colors, setThemeColors, setThemeStyles } from '@siposdani87/sui-rn';

setThemeColors({
    primaryBright: Colors.deepPurpleBright,
    primary: Colors.deepPurple,
    primaryDark: Colors.deepPurpleDark,
    primaryText: Colors.white,
    accentBright: Colors.cyanBright,
    accent: Colors.cyan,
    accentDark: Colors.cyanDark,
    accentText: Colors.white,
});

setThemeStyles({
    fontFamilyApp: 'Ubuntu_400Regular',
    fontFamilyHeadings: ['Oswald_400Regular', 'Oswald_500Medium', 'Oswald_700Bold'],
    fontFamilyBodies: ['Inter_400Regular', 'Inter_500Medium', 'Inter_700Bold'],
});
```

### Basic Usage

```typescript
import { TextField, Button, SelectField } from '@siposdani87/sui-rn';

function MyForm() {
    const [name, setName] = useState<string | null>(null);

    return (
        <>
            <TextField
                label="Name"
                value={name}
                onValueChange={setName}
                required
            />
            <Button title="Submit" onPress={() => {}} />
        </>
    );
}
```

Check the `example/` directory for more samples and options.

## Preview

![Overview](https://raw.githubusercontent.com/siposdani87/sui-rn/master/images/sui-rn.png)

## Migration Guide

### Upgrading from 1.1.x to 1.2.x

**Breaking changes:**

1. **`setThemeColors()` API changed** from positional arguments to an options object:
   ```typescript
   // Before (1.1.x)
   setThemeColors(bright, primary, dark, text, accentBright, accent, accentDark, accentText);

   // After (1.2.x)
   setThemeColors({
       primaryBright: bright,
       primary: primary,
       primaryDark: dark,
       primaryText: text,
       accentBright: accentBright,
       accent: accent,
       accentDark: accentDark,
       accentText: accentText,
   });
   ```

2. **`setThemeStyles()` API changed** from positional arguments to an options object:
   ```typescript
   // Before (1.1.x)
   setThemeStyles(appFont, [h1, h2, h3], [b1, b2, b3]);

   // After (1.2.x)
   setThemeStyles({
       fontFamilyApp: appFont,
       fontFamilyHeadings: [h1, h2, h3],
       fontFamilyBodies: [b1, b2, b3],
   });
   ```

3. **Value types are stricter** — `TextFieldValueType` changed from `any` to `string | null | undefined`, `NumberFieldValueType` to `number | null | undefined`, etc. Update your `onValueChange` handlers accordingly.

4. **`TouchableOpacity` replaced with `Pressable`** — visual press feedback may differ slightly.

5. **New `BaseFieldProps` interface** — all form fields now extend this shared type for common props (`label`, `error`, `required`, `disabled`, `desc`, `onPressDesc`, `containerStyle`, `style`).

## Development

```bash
npm install --legacy-peer-deps
npm run watch     # TypeScript watch mode
npm run build     # Full build (format → type-check → lint → tsc)
npm test          # Run tests
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full contribution guide.

## Bugs or Requests

If you encounter any problems feel free to open an [issue](https://github.com/siposdani87/sui-rn/issues/new?template=bug_report.md). If you feel the library is missing a feature, please raise a [ticket](https://github.com/siposdani87/sui-rn/issues/new?template=feature_request.md). Pull request are also welcome.

## Developer

[Dániel Sipos](https://siposdani87.com)

## Sponsors

This project is generously supported by [TrophyMap](https://trophymap.org), [I18Nature](https://i18nature.com), and several other amazing organizations.
