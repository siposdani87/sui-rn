import React from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '../constants';
import { useColorScheme } from 'react-native-appearance';

export default function NoContent(props: { text: string, imageSource: ImageSourcePropType }) {
    const isDarkTheme = true; // = useColorScheme() === 'dark';

    return (
        <View style={styles.container}>
            <Image style={[styles.image, isDarkTheme ? styles.imageDark : styles.imageLight]} source={props.imageSource} />
            <Text style={[styles.text, isDarkTheme ? styles.textDark : styles.textLight]}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    image: {
        width: 150,
        height: 100,
        marginBottom: 15,
        tintColor: Colors.deepGreyBright,
    },
    imageLight: {
        tintColor: Colors.deepGreyBright,
    },
    imageDark: {
        tintColor: Colors.blackBright,
    },
    text: {
        fontSize: 18,
        marginHorizontal: 20,
    },
    textLight: {
        color: Colors.deepGreyBright,
    },
    textDark: {
        color: Colors.blackBright,
    },
});
