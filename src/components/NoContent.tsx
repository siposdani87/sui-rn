import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { Styles } from '../constants';
import Text from '../components/Text';

export default function NoContent(props: {
    text?: string;
    imageSource?: ImageSourcePropType;
    children?: any;
    containerStyle?: any;
}): JSX.Element {
    return (
        <View style={[styles.container, props.containerStyle]}>
            {!!props.imageSource && (
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={props.imageSource} />
                </View>
            )}
            {!!props.text && (
                <Text style={styles.text} muted={true}>
                    {props.text}
                </Text>
            )}
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 85,
        resizeMode: 'contain',
    },
    text: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
        marginHorizontal: 20,
        marginBottom: 10,
    },
});
