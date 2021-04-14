import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Styles } from '../constants';
import IconButton from './IconButton';
import Text from './Text';

export default function DialogHeader(props: { title: string, imageSource?: ImageSourcePropType, onClose?: () => void }) {
  return (
    <View style={styles.container}>
      {!!props.imageSource && (
        <Image source={props.imageSource} style={[styles.image]} />
      )}
      <Text style={styles.titleText}>{props.title}</Text>
      {!!props.onClose && (
        <IconButton iconName='close' onPress={props.onClose} containerStyle={styles.closeButton} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  titleText: {
    fontFamily: Styles.fontFamilyHeadingRegular,
    fontWeight: '400',
    fontSize: 22,
    textTransform: 'uppercase',
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -20,
    zIndex: 1,
  },
});
