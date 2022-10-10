declare const styles: {
    floatingButtonContainer: {
        position: string;
        bottom: number;
        right: number;
        zIndex: number;
    };
    navigationIconButton: {
        marginLeft: number;
        marginRight: number;
    };
    navigationIconContainer: {
        flexDirection: string;
        justifyContent: string;
    };
    fieldIconButton: {
        margin: number;
    };
    actionsContainer: {
        position: string;
        right: number;
        flexDirection: string;
        zIndex: number;
    };
    blurRadius?: number | undefined;
    fontFamilyApp: string;
    fontFamilyHeadingRegular: string;
    fontFamilyHeadingMedium: string;
    fontFamilyHeadingBold: string;
    fontFamilyBodyRegular: string;
    fontFamilyBodyMedium: string;
    fontFamilyBodyBold: string;
    shadow: {};
    lightShadow: {};
    noShadow: {};
    activeOpacity: number;
};
export declare function setThemeStyles(fontFamilyApp: string, fontFamilyHeadings: string[], fontFamilyBodies: string[]): {
    floatingButtonContainer: {
        position: string;
        bottom: number;
        right: number;
        zIndex: number;
    };
    navigationIconButton: {
        marginLeft: number;
        marginRight: number;
    };
    navigationIconContainer: {
        flexDirection: string;
        justifyContent: string;
    };
    fieldIconButton: {
        margin: number;
    };
    actionsContainer: {
        position: string;
        right: number;
        flexDirection: string;
        zIndex: number;
    };
    blurRadius?: number | undefined;
    fontFamilyApp: string;
    fontFamilyHeadingRegular: string;
    fontFamilyHeadingMedium: string;
    fontFamilyHeadingBold: string;
    fontFamilyBodyRegular: string;
    fontFamilyBodyMedium: string;
    fontFamilyBodyBold: string;
    shadow: {};
    lightShadow: {};
    noShadow: {};
    activeOpacity: number;
};
export default styles;
