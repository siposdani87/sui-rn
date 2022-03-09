import React from 'react';
import { Platform, View } from 'react-native';
import Colors from './Colors';
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
                shadowColor: Colors.blackDark,
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
                shadowColor: Colors.blackDark,
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
    ...Platform.select({
        android: {
            blurRadius: 1,
        },
        ios: {
            blurRadius: 5,
        },
    }),
    tabBarOptions: {
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: '',
            fontWeight: '400',
            textTransform: 'uppercase',
        },
    },
    tabBarLightOptions: {
        tabBarActiveTintColor: Colors.primaryDark,
        tabBarInactiveTintColor: Colors.deepGreyBright,
        tabBarStyle: {
            backgroundColor: Colors.lightGreyBright,
        },
        indicatorStyle: {
            backgroundColor: Colors.accent,
        },
        tabBarItemStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 1,
            borderTopColor: Colors.lightGrey,
        },
    },
    tabBarDarkOptions: {
        tabBarActiveTintColor: Colors.primaryBright,
        tabBarInactiveTintColor: Colors.deepGreyBright,
        tabBarStyle: {
            backgroundColor: Colors.black,
        },
        indicatorStyle: {
            backgroundColor: Colors.accentBright,
        },
        tabBarItemStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 1,
            borderTopColor: Colors.blackBright,
        },
    },
    stackNavigatorOptions: {
        headerRight: () => <View />,
        headerBackTitleVisible: false,
        headerTintColor: Colors.primaryText,
        headerTitleAlign: 'left',
        headerTitleStyle: {
            fontFamily: '',
            fontWeight: '400',
            fontSize: 16,
            color: Colors.primaryText,
        },
        headerStyle: {
            backgroundColor: Colors.primaryDark,
            ...Platform.select({
                android: {
                    elevation: 0,
                },
                ios: {
                    shadowOpacity: 0,
                },
            }),
        },
    },
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
    navigationIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
export function setThemeStyles(colors, fontFamilyApp, fontFamilyHeadings, fontFamilyBodies) {
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
    styles.stackNavigatorOptions.headerTitleStyle.fontFamily =
        styles.fontFamilyHeadingRegular;
    styles.tabBarOptions.tabBarLabelStyle.fontFamily =
        styles.fontFamilyBodyRegular;
    styles.tabBarLightOptions.tabBarActiveTintColor = colors.primaryDark;
    styles.tabBarLightOptions.indicatorStyle.backgroundColor = colors.accent;
    styles.tabBarDarkOptions.tabBarActiveTintColor = colors.primaryBright;
    styles.tabBarDarkOptions.indicatorStyle.backgroundColor =
        colors.accentBright;
    styles.stackNavigatorOptions.headerTintColor = colors.primaryText;
    styles.stackNavigatorOptions.headerTitleStyle.color = colors.primaryText;
    styles.stackNavigatorOptions.headerStyle.backgroundColor =
        colors.primaryDark;
    return styles;
}
Platform.select({
    ios: () => setThemeStyles(Colors, 'Verdana', ['Helvetica', 'Helvetica', 'Helvetica'], ['Arial', 'Arial', 'Arial']),
    android: () => setThemeStyles(Colors, 'monospace', ['sans-serif', 'sans-serif', 'sans-serif'], ['Roboto', 'Roboto', 'Roboto']),
    default: () => setThemeStyles(Colors, 'Verdana', ['sans-serif', 'sans-serif', 'sans-serif'], ['Arial', 'Arial', 'Arial']),
})();
export default styles;
//# sourceMappingURL=Styles.js.map