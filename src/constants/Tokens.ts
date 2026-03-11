import { TextStyle } from 'react-native';

type FontWeight = TextStyle['fontWeight'];

export interface ThemeTokens {
    // Border radius
    borderRadiusInput: number;
    borderRadiusButton: number;
    borderRadiusColorDot: number;

    // Font sizes
    fontSizeBody: number;
    fontSizeError: number;
    fontSizeHeading: number;

    // Font weights
    fontWeightRegular: FontWeight;
    fontWeightMedium: FontWeight;

    // Icon sizes
    iconSizeDefault: number;
    iconSizeSmall: number;
    iconSizeAction: number;
    imageSizeSmall: number;

    // Spacing
    spacingXs: number;
    spacingSm: number;
    spacingMd: number;
    spacingLg: number;

    // Input dimensions
    inputHeight: number;
    inputBorderWidth: number;
    inputPaddingHorizontal: number;
    inputFocusBorderWidth: number;

    // Button dimensions
    buttonBorderWidth: number;
    buttonPadding: number;
    buttonPaddingHorizontal: number;
    buttonPaddingVertical: number;
    buttonMargin: number;

    // Error field
    errorFieldHeight: number;

    // Dialog
    dialogBorderRadius: number;
    dialogMargin: number;
    dialogMaxWidth: number;
    dialogScrimOpacity: number;
    dialogBodyPadding: number;
    dialogStatusBorderWidth: number;

    // Select
    selectListMaxHeight: number;

    // Color picker
    colorPickerHeight: number;

    // Line height multiplier (for TextArea/RichText height calculations)
    lineHeightMultiplier: number;
    textAreaPaddingVertical: number;

    // Action button offset (icon + padding + border)
    actionButtonWidth: number;
}

const tokens: ThemeTokens = {
    // Border radius
    borderRadiusInput: 3,
    borderRadiusButton: 20,
    borderRadiusColorDot: 15,

    // Font sizes
    fontSizeBody: 16,
    fontSizeError: 12,
    fontSizeHeading: 22,

    // Font weights
    fontWeightRegular: '400',
    fontWeightMedium: '500',

    // Icon sizes
    iconSizeDefault: 26,
    iconSizeSmall: 20,
    iconSizeAction: 24,
    imageSizeSmall: 22,

    // Spacing
    spacingXs: 3,
    spacingSm: 5,
    spacingMd: 10,
    spacingLg: 15,

    // Input dimensions
    inputHeight: 36,
    inputBorderWidth: 1,
    inputPaddingHorizontal: 10,
    inputFocusBorderWidth: 3,

    // Button dimensions
    buttonBorderWidth: 1,
    buttonPadding: 5,
    buttonPaddingHorizontal: 10,
    buttonPaddingVertical: 3,
    buttonMargin: 5,

    // Error field
    errorFieldHeight: 17,

    // Dialog
    dialogBorderRadius: 3,
    dialogMargin: 10,
    dialogMaxWidth: 520,
    dialogScrimOpacity: 0.8,
    dialogBodyPadding: 15,
    dialogStatusBorderWidth: 5,

    // Select
    selectListMaxHeight: 175,

    // Color picker
    colorPickerHeight: 300,

    // Line height multiplier (for TextArea/RichText height calculations)
    lineHeightMultiplier: 20,
    textAreaPaddingVertical: 16,

    // Action button offset (icon + padding + border)
    actionButtonWidth: 38,
};

export type ThemeTokensOptions = Partial<ThemeTokens>;

export function setThemeTokens(options: ThemeTokensOptions): ThemeTokens {
    Object.assign(tokens, options);
    return tokens;
}

export default tokens;
