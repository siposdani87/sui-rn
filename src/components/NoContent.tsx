import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';
import Text from '../components/Text';

export default function NoContent(props: { text: string, imageSource: ImageSourcePropType }) {
    const isDarkTheme = useDarkTheme();

    return (
        <View style={styles.container}>
            <View style={[styles.imageContainer, isDarkTheme ? styles.imageContainerDark : styles.imageContainerLight]}>
                <Image style={styles.image} source={props.imageSource} />
            </View>
            <Text style={styles.text} muted={true}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    imageContainer: {
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: 'red',
        padding: 15,
        marginBottom: 5,
        borderRadius: 15,
    },
    image: {
        width: 150,
        height: 85,
        resizeMode: 'contain',
    },
    imageContainerLight: {
        borderColor: Colors.deepGreyBright,
    },
    imageContainerDark: {
        borderColor: Colors.blackBright,
    },
    text: {
        marginHorizontal: 20,
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
    },
});
