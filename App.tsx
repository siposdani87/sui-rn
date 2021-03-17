import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, setThemeStyles, setThemeColors } from './src/constants';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import Router from './Router';
import AsyncStorage from '@react-native-community/async-storage';
import { enableScreens } from 'react-native-screens';
import { Linking, Platform } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { Flash } from './src/containers';
import { ServiceContext, Services } from './ServiceContext';
import { Base } from './src/utils';
import { useDarkTheme } from './src/hooks';

enableScreens();

setThemeStyles('Inter_700Bold', ['Inter_400Regular', 'Inter_500Medium', 'Inter_700Bold'], ['Inter_400Regular', 'Inter_500Medium', 'Inter_700Bold']);
setThemeColors(Colors.greenBright, Colors.green, Colors.greenDark, Colors.white, Colors.amberBright, Colors.amber, Colors.amberDark, Colors.white);

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function App() {
  const isDarkTheme = useDarkTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  const [state, dispatch] = useReducer(Base.reducer, {});
  const services = useMemo(() => {
    return new Services(dispatch);
  }, []);

  const [isReady, setIsReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS !== 'web' && initialUrl === null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
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
          <Flash services={services}></Flash>
          <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme} initialState={initialState}
            onStateChange={(state) =>
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }>
            <Router />
          </NavigationContainer>
        </AppearanceProvider>
      </SafeAreaProvider>
    </ServiceContext.Provider>
  );
}
