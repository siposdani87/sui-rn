import { StyleProp, ViewStyle } from 'react-native';
export type StylesType = {
    fontFamilyApp: string;
    fontFamilyHeadingRegular: string;
    fontFamilyHeadingMedium: string;
    fontFamilyHeadingBold: string;
    fontFamilyBodyRegular: string;
    fontFamilyBodyMedium: string;
    fontFamilyBodyBold: string;
    shadow: StyleProp<ViewStyle>;
    lightShadow: StyleProp<ViewStyle>;
    noShadow: StyleProp<ViewStyle>;
    activeOpacity: number;
    floatingButtonContainer: StyleProp<ViewStyle>;
    navigationIconButton: StyleProp<ViewStyle>;
    fieldIconButton: StyleProp<ViewStyle>;
    actionsContainer: StyleProp<ViewStyle>;
};
declare const styles: StylesType;
export interface ThemeStylesOptions {
    fontFamilyApp: string;
    fontFamilyHeadings: [string, string, string];
    fontFamilyBodies: [string, string, string];
}
export declare function setThemeStyles(options: ThemeStylesOptions): StylesType;
export default styles;
//# sourceMappingURL=Styles.d.ts.map