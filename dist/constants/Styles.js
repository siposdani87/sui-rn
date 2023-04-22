import { Platform } from 'react-native';
const styles = {
    fontFamilyApp: '',
    fontFamilyHeadingRegular: '',
    fontFamilyHeadingMedium: '',
    fontFamilyHeadingBold: '',
    fontFamilyBodyRegular: '',
    fontFamilyBodyMedium: '',
    fontFamilyBodyBold: '',
    shadow: {
        ...Platform.select({
            android: {
                elevation: 10,
            },
            ios: {
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
            },
        }),
    },
    lightShadow: {
        ...Platform.select({
            android: {
                elevation: 3,
            },
            ios: {
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
            },
        }),
    },
    noShadow: {
        ...Platform.select({
            android: {
                elevation: 0,
            },
            ios: {
                shadowOpacity: 0,
            },
        }),
    },
    activeOpacity: 0.6,
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        zIndex: 1,
    },
    navigationIconButton: {
        marginLeft: 0,
        marginRight: 10,
    },
    fieldIconButton: {
        margin: 0,
    },
    actionsContainer: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        zIndex: 1,
    },
};
export function setThemeStyles(fontFamilyApp, fontFamilyHeadings, fontFamilyBodies) {
    styles.fontFamilyApp = fontFamilyApp;
    [
        styles.fontFamilyHeadingRegular,
        styles.fontFamilyHeadingMedium,
        styles.fontFamilyHeadingBold,
    ] = fontFamilyHeadings;
    [
        styles.fontFamilyBodyRegular,
        styles.fontFamilyBodyMedium,
        styles.fontFamilyBodyBold,
    ] = fontFamilyBodies;
    return styles;
}
Platform.select({
    ios: () => setThemeStyles('Verdana', ['Helvetica', 'Helvetica', 'Helvetica'], ['Arial', 'Arial', 'Arial']),
    android: () => setThemeStyles('monospace', ['sans-serif', 'sans-serif', 'sans-serif'], ['Roboto', 'Roboto', 'Roboto']),
    default: () => setThemeStyles('Verdana', ['sans-serif', 'sans-serif', 'sans-serif'], ['Arial', 'Arial', 'Arial']),
})();
export default styles;
//# sourceMappingURL=Styles.js.map