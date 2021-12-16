/// <reference types="react" />
declare const styles: {
    tabBarOptions: {
        headerShown: boolean;
        tabBarShowLabel: boolean;
        tabBarLabelStyle: {
            fontSize: number;
            fontFamily: string;
            fontWeight: string;
            textTransform: string;
        };
    };
    tabBarLightOptions: {
        tabBarActiveTintColor: string;
        tabBarInactiveTintColor: string;
        tabBarStyle: {
            backgroundColor: string;
        };
        indicatorStyle: {
            backgroundColor: string;
        };
        tabBarItemStyle: {
            alignItems: string;
            justifyContent: string;
            borderTopWidth: number;
            borderTopColor: string;
        };
    };
    tabBarDarkOptions: {
        tabBarActiveTintColor: string;
        tabBarInactiveTintColor: string;
        tabBarStyle: {
            backgroundColor: string;
        };
        indicatorStyle: {
            backgroundColor: string;
        };
        tabBarItemStyle: {
            alignItems: string;
            justifyContent: string;
            borderTopWidth: number;
            borderTopColor: string;
        };
    };
    stackNavigatorOptions: {
        headerRight: () => JSX.Element;
        headerBackTitle: null;
        headerBackTitleVisible: boolean;
        headerTintColor: string;
        headerTitleAlign: string;
        headerTitleStyle: {
            fontFamily: string;
            fontWeight: string;
            fontSize: number;
            color: string;
        };
        headerStyle: {
            backgroundColor: string;
        } | {
            elevation: number;
            shadowOpacity?: undefined;
            backgroundColor: string;
        } | {
            shadowOpacity: number;
            elevation?: undefined;
            backgroundColor: string;
        };
    };
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
export declare function setThemeStyles(colors: any, fontFamilyApp: string, fontFamilyHeadings: string[], fontFamilyBodies: string[]): {
    tabBarOptions: {
        headerShown: boolean;
        tabBarShowLabel: boolean;
        tabBarLabelStyle: {
            fontSize: number;
            fontFamily: string;
            fontWeight: string;
            textTransform: string;
        };
    };
    tabBarLightOptions: {
        tabBarActiveTintColor: string;
        tabBarInactiveTintColor: string;
        tabBarStyle: {
            backgroundColor: string;
        };
        indicatorStyle: {
            backgroundColor: string;
        };
        tabBarItemStyle: {
            alignItems: string;
            justifyContent: string;
            borderTopWidth: number;
            borderTopColor: string;
        };
    };
    tabBarDarkOptions: {
        tabBarActiveTintColor: string;
        tabBarInactiveTintColor: string;
        tabBarStyle: {
            backgroundColor: string;
        };
        indicatorStyle: {
            backgroundColor: string;
        };
        tabBarItemStyle: {
            alignItems: string;
            justifyContent: string;
            borderTopWidth: number;
            borderTopColor: string;
        };
    };
    stackNavigatorOptions: {
        headerRight: () => JSX.Element;
        headerBackTitle: null;
        headerBackTitleVisible: boolean;
        headerTintColor: string;
        headerTitleAlign: string;
        headerTitleStyle: {
            fontFamily: string;
            fontWeight: string;
            fontSize: number;
            color: string;
        };
        headerStyle: {
            backgroundColor: string;
        } | {
            elevation: number;
            shadowOpacity?: undefined;
            backgroundColor: string;
        } | {
            shadowOpacity: number;
            elevation?: undefined;
            backgroundColor: string;
        };
    };
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
