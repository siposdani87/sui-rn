import React from 'react';
import { Styles, Colors } from '../constants';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useColorScheme } from 'react-native-appearance';

export default function HeaderImage(props: { title: string, imageSource: ImageSourcePropType }) {
  const isDarkTheme = true; // = useColorScheme() === 'dark';

  return (
    <View style={styles.baseContainer}>
      <Image source={props.imageSource} style={[styles.image]} />
      <Text style={[styles.titleText, isDarkTheme ? styles.titleDarkText : styles.titleLightText]}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
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
