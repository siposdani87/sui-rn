import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, setThemeStyles, setThemeColors } from './src/constants';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Oswald_400Regular, Oswald_500Medium, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import { useFonts } from 'expo-font';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import Router from './Router';
import AsyncStorage from '@react-native-community/async-storage';
import { enableScreens } from 'react-native-screens';
import { Linking, Platform } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { Confirm, Flash, Loader } from './src/containers';
import { ServiceContext, Services } from './ServiceContext';
import { Base } from './src/utils';
import { useDarkTheme } from './src/hooks';

enableScreens();

setThemeStyles('Ubuntu_400Regular', ['Oswald_400Regular', 'Oswald_500Medium', 'Oswald_700Bold'], ['Inter_400Regular', 'Inter_500Medium', 'Inter_700Bold']);
setThemeColors(Colors.deepPurpleBright, Colors.deepPurple, Colors.deepPurpleDark, Colors.white, Colors.cyanBright, Colors.cyan, Colors.cyanDark, Colors.white);

const appLightTheme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
  },
};

const appDarkTheme = {
  ...DarkTheme,
  colors: {
      ...DarkTheme.colors,
      primary: Colors.primaryBright,
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
  const [isReady, setIsReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState();
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
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const savedState = savedStateString ? JSON.parse(savedStateString) : undefined;

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
          <Confirm services={services} />
          <Flash services={services} />
          <Loader services={services} color={Colors.accent} backgroundColor={Colors.primary} />
          <NavigationContainer theme={isDarkTheme ? appDarkTheme : appLightTheme} initialState={initialState}
            onStateChange={(navigationState) =>
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(navigationState))
            }>
            <Router />
          </NavigationContainer>
        </AppearanceProvider>
      </SafeAreaProvider>
    </ServiceContext.Provider>
  );
}
