import React from 'react';
import { Platform, View } from 'react-native';
import Colors from './Colors';

const styles = {
    fontFamilyApp: '',
    fontFamilyHeading: '',
    fontFamilyBody: '',
    fullscreenContainer: {
        flex: 1,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    dialogContainer: {
        margin: 10,
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        borderRadius: 3,
    },
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
            flex: 1,
            flexDirection: 'row',
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
            flex: 1,
            flexDirection: 'row',
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
        headerTitleStyle: {
            fontFamily: '',
            fontSize: 14,
            color: Colors.primaryText,
        },
        headerStyle: {
            backgroundColor: Colors.primaryDark,
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
        minHeight: 20,
        padding: 1,
    },
};

export function setThemeStyles(fontFamilyApp, fontFamilyHeading, fontFamilyBody) {
    styles.fontFamilyApp = fontFamilyApp;
    styles.fontFamilyHeading = fontFamilyHeading;
    styles.fontFamilyBody = fontFamilyBody;

    styles.stackNavigatorOptions.headerTitleStyle.fontFamily = fontFamilyHeading;

    return styles;
}

setThemeStyles('Verdana', 'Helvetica', 'Arial');

export default styles;
