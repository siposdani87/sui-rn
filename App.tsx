import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from './Router';
import { ServiceContext, Services } from './ServiceContext';
import { Colors, setThemeColors, setThemeStyles } from './src/constants';
import { Confirm, Flash, Loader } from './src/containers';
import { useDarkTheme } from './src/hooks';
import { Base } from './src/utils';

const colors = setThemeColors(
    Colors.deepPurpleBright,
    Colors.deepPurple,
    Colors.deepPurpleDark,
    Colors.white,
    Colors.cyanBright,
    Colors.cyan,
    Colors.cyanDark,
    Colors.white,
);
setThemeStyles(
    colors,
    'Ubuntu_400Regular',
    ['Oswald_400Regular', 'Oswald_500Medium', 'Oswald_700Bold'],
    ['Inter_400Regular', 'Inter_500Medium', 'Inter_700Bold'],
);

const appLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        background: '#FFF',
    },
};

const appDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: Colors.primaryBright,
        background: '#000',
    },
};

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function App() {
    const isDarkTheme = useDarkTheme();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_700Bold,
        Ubuntu_400Regular,
    });
    const [isReady, setIsReady] = useState<boolean>(!__DEV__);
    const [initialState, setInitialState] = useState<any>();
    const [state, dispatch] = useReducer(Base.reducer, {});
    const services = useMemo(() => {
        return new Services(dispatch);
    }, []);

    useEffect(() => {
        console.log('reducerState:', state);
    }, [state]);

    useEffect(() => {
        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();
                if (Platform.OS !== 'web' && initialUrl === null) {
                    const savedStateString = await AsyncStorage.getItem(
                        PERSISTENCE_KEY,
                    );
                    const savedState = savedStateString
                        ? JSON.parse(savedStateString)
                        : undefined;

                    if (savedState !== undefined) {
                        setInitialState(savedState);
                    }
                }
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    if (!isReady && !fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ServiceContext.Provider value={services}>
            <SafeAreaProvider>
                <AppearanceProvider>
                    <Confirm confirmService={services.confirmService} />
                    <Flash flashService={services.flashService} />
                    <Loader
                        httpService={services.httpService}
                        color={Colors.accent}
                        backgroundColor={Colors.primary}
                    />
                    <NavigationContainer
                        theme={isDarkTheme ? appDarkTheme : appLightTheme}
                        initialState={initialState}
                        onStateChange={(navigationState) =>
                            AsyncStorage.setItem(
                                PERSISTENCE_KEY,
                                JSON.stringify(navigationState),
                            )
                        }
                    >
                        <Router />
                    </NavigationContainer>
                </AppearanceProvider>
            </SafeAreaProvider>
        </ServiceContext.Provider>
    );
}
