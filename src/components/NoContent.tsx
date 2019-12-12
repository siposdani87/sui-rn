import React from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '../constants';

export default function NoContent(props: { text: string, imageSource: ImageSourcePropType }) {
    return (
        <View style={styles.noContentContainer}>
            <Image style={styles.noContentImage} source={props.imageSource} />
            <Text style={styles.noContentText}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    noContentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    noContentImage: {
        width: 150,
        height: 100,
        marginBottom: 15,
    },
    noContentText: {
        color: Colors.grey,
        fontSize: 18,
        marginHorizontal: 20,
    },
});
