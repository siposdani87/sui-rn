import React from 'react';
import { Text, View } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Styles, useDarkTheme, TabBar } from '@siposdani87/sui-rn';

function HomeScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function TabsScreen() {
    const isDarkTheme = useDarkTheme();

    return (
        <Tab.Navigator
            tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
            screenOptions={
                {
                    ...Styles.tabBarOptions,
                    ...(isDarkTheme
                        ? Styles.tabBarDarkOptions
                        : Styles.tabBarLightOptions),
                }
            }
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
