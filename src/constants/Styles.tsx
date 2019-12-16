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
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowContainer: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    columnContainer: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    pageContainer: {
        padding: 20,
        backgroundColor: Colors.white,
    },
    dialogContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 30,
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
                shadowColor: Colors.black,
                shadowOffset: {
                    width: 0,
                    height: 8,
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
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
                    height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 2,
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
        activeTintColor: Colors.primaryDark,
        inactiveTintColor: Colors.primary,
        showIcon: false,
        showLabel: true,
        allowFontScaling: true,
        style: {
            backgroundColor: Colors.primaryText,
        },
        labelStyle: {
            fontSize: 12,
        },
        tabStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        indicatorStyle: {
            backgroundColor: Colors.accent,
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
    contentOptions: {
        activeTintColor: Colors.primaryDark,
        activeBackgroundColor: Colors.lightGrey,
        inactiveTintColor: Colors.primary,
        inactiveBackgroundColor: Colors.lightGrey,
        labelStyle: {
            fontWeight: '400',
        },
    },
    floatingButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        zIndex: 1,
    },
    sectionContainer: {
        marginVertical: 10,
    },
    sectionHeader: {
        fontFamily: '',
        fontSize: 24,
        color: Colors.primary,
        marginBottom: 10,
    },
    sectionContent: {
        color: Colors.greyDark,
    },
};

export function setThemeStyles(fontFamilyApp, fontFamilyHeading, fontFamilyBody, colors) {
    styles.fontFamilyApp = fontFamilyApp;
    styles.fontFamilyHeading = fontFamilyHeading;
    styles.fontFamilyBody = fontFamilyBody;

    styles.fullscreenContainer.backgroundColor = colors.primary;

    styles.tabBarOptions.activeTintColor = colors.primaryDark;
    styles.tabBarOptions.inactiveTintColor = colors.primary;
    styles.tabBarOptions.indicatorStyle.backgroundColor = colors.accent;

    styles.stackNavigatorOptions.headerTintColor = colors.primaryText;
    styles.stackNavigatorOptions.headerTitleStyle.fontFamily = fontFamilyHeading;
    styles.stackNavigatorOptions.headerTitleStyle.color = colors.primaryText;
    styles.stackNavigatorOptions.headerStyle.backgroundColor = colors.primaryDark;

    styles.contentOptions.activeTintColor = colors.primaryDark;
    styles.contentOptions.inactiveTintColor = colors.primary;

    styles.sectionHeader.fontFamily = fontFamilyHeading;
    styles.sectionHeader.color = colors.primary;

    return styles;
}

setThemeStyles('Verdana', 'Helvetica', 'Arial', Colors);

export default styles;
