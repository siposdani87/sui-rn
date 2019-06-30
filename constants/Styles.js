import React from 'react';
import { Platform, View } from 'react-native';
import Colors from './Colors';

let styles = {
    fontFamilyApp: 'ChangelingNeo',
    fontFamilyHeading: 'Quicksand',
    fontFamilyBody: 'Muli',
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
        activeTintColor: Colors.brownDark,
        inactiveTintColor: Colors.brown,
        activeBackgroundColor: Colors.lightGrey,
        labelStyle: {
            fontWeight: '400',
            color: Colors.brown,
        },
        activeLabelStyle: {
            fontWeight: '500',
            color: Colors.brownDark,
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
        fontFamily: 'Quicksand',
        fontSize: 24,
        color: Colors.primary,
        marginBottom: 10,
    },
    sectionContent: {
        color: Colors.greyDark,
    },
};

export default styles;
