import React from 'react';
import { Styles, Colors } from '../constants';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HeaderImage(props: { title: string, imageSource: ImageSourcePropType, onClose?: () => void }) {
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  return (
    <View style={styles.baseContainer}>
      <Image source={props.imageSource} style={[styles.image]} />
      <Text style={[styles.titleText, isDarkTheme ? styles.titleDarkText : styles.titleLightText]}>{props.title}</Text>
      {props.onClose && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onClose}>
            <MaterialIcons style={[styles.icon, isDarkTheme ? styles.titleDarkText : styles.titleLightText]} name='close' />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  icon: {
    fontSize: 26,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  titleText: {
    fontFamily: Styles.fontFamilyHeading,
    fontSize: 24,
    fontWeight: '400',
  },
  titleLightText: {
    color: Colors.black,
  },
  titleDarkText: {
    color: Colors.white,
  },
});
