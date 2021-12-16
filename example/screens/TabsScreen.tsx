import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Styles } from '@siposdani87/sui-rn/dist/constants';
import { useDarkTheme } from '@siposdani87/sui-rn/dist/hooks';
import { TabBar } from '@siposdani87/sui-rn/dist/components';

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
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={
                {
                    ...Styles.tabBarOptions,
                    ...(isDarkTheme
                        ? Styles.tabBarDarkOptions
                        : Styles.tabBarLightOptions),
                } as any
            }
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
