import React from 'react';
import { Platform, View } from 'react-native';
import Colors from './Colors';

const styles = {
    fontFamilyApp: '',
    fontFamilyHeading: '',
    fontFamilyBody: '',
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
        showIcon: false,
        showLabel: true,
        allowFontScaling: true,
        labelStyle: {
            fontSize: 14,
            fontFamily: '',
            fontWeight: '400',
            textTransform: 'uppercase',
        },
    },
    tabBarLightOptions: {
        activeTintColor: Colors.primaryDark,
        inactiveTintColor: Colors.grey,
        style: {
            backgroundColor: Colors.lightGreyBright,
        },
        indicatorStyle: {
            backgroundColor: Colors.accent,
        },
        tabStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 1,
            borderTopColor: Colors.lightGrey,
        },
    },
    tabBarDarkOptions: {
        activeTintColor: Colors.primaryBright,
        inactiveTintColor: Colors.grey,
        style: {
            backgroundColor: Colors.black,
        },
        indicatorStyle: {
            backgroundColor: Colors.accentBright,
        },
        tabStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 1,
            borderTopColor: Colors.blackBright,
        },
    },
    stackNavigatorOptions: {
        headerRight: () => (
            <View />
        ),
        headerBackTitle: null,
        headerBackTitleVisible: false,
        headerTintColor: Colors.primaryText,
        headerTitleAlign: 'left',
        headerTitleStyle: {
            fontFamily: '',
            fontWeight: '400',
            fontSize: 14,
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
        contentStyle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    drawerContentOptions: {
        activeTintColor: Colors.primaryDark,
        activeBackgroundColor: Colors.lightGrey,
        inactiveTintColor: Colors.primary,
        inactiveBackgroundColor: Colors.lightGrey,
        labelStyle: {
            fontWeight: '400',
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
};

export function setThemeStyles(fontFamilyApp, fontFamilyHeading, fontFamilyBody) {
    styles.fontFamilyApp = fontFamilyApp;
    styles.fontFamilyHeading = fontFamilyHeading;
    styles.fontFamilyBody = fontFamilyBody;

    styles.stackNavigatorOptions.headerTitleStyle.fontFamily = fontFamilyHeading;
    styles.tabBarOptions.labelStyle.fontFamily = fontFamilyBody;

    return styles;
}

Platform.select({
    ios: () => setThemeStyles('Verdana', 'Helvetica', 'Arial'),
    android: () => setThemeStyles('monospace', 'sans-serif', 'Roboto'),
})();

export default styles;
