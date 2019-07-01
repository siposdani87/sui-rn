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
        backgroundColor: Colors.white,
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
            backgroundColor: Colors.white,
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
    navigationOptions: {
        headerRight: <View />,
        headerBackTitle: null,
        headerTintColor: Colors.white,
        headerTitleStyle: {
            fontSize: 16,
            fontWeight: '400',
            color: Colors.white,
            textAlign: 'center',
            flex: 1,
        },
        headerStyle: {
            backgroundColor: Colors.primaryDark,
        },
        headerForceInset: { top: 'never', bottom: 'never' },
    },
    contentOptions: {
        activeTintColor: Colors.primaryDark,
        inactiveTintColor: Colors.primary,
        activeBackgroundColor: Colors.lightGrey,
        labelStyle: {
            fontWeight: '400',
            color: Colors.primary,
        },
        activeLabelStyle: {
            fontWeight: '500',
            color: Colors.primaryDark,
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

    styles.navigationOptions.headerStyle.backgroundColor = colors.primaryDark;

    styles.contentOptions.activeTintColor = colors.primaryDark;
    styles.contentOptions.inactiveTintColor = colors.primary;
    styles.contentOptions.labelStyle.color = colors.primary;
    styles.contentOptions.activeLabelStyle.color = colors.primaryDark;

    styles.sectionHeader.fontFamily = fontFamilyHeading;
    styles.sectionHeader.color = colors.primary;
}

setThemeStyles('Verdana', 'Helvetica', 'Arial', Colors);

export default styles;
