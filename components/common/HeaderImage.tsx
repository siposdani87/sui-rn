import React from 'react';
import { Styles } from '../../constants';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HeaderImage(props) {
  return (
      <View style={styles.baseContainer}>
        <Image {...props} style={[props.style, styles.image]} />
        <Text style={styles.text}>{props.title}</Text>
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
  text: {
    fontFamily: Styles.fontFamilyHeading,
    fontSize: 24,
    fontWeight: '400',
  },
});
